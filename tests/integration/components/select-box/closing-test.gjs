import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import {
  render,
  click,
  blur,
  focus,
  triggerEvent,
  triggerKeyEvent
} from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import autoFocus from '@zestia/ember-auto-focus/modifiers/auto-focus';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (closing)', function (hooks) {
  setupRenderingTest(hooks);

  let api;
  let handleClose;

  const handleReady = (sb) => (api = sb);

  hooks.beforeEach(function (assert) {
    handleClose = () => assert.step('close');
  });

  test('closing with api', async function (assert) {
    assert.expect(6);

    await render(<template>
      <SelectBox
        @open={{true}}
        @onReady={{handleReady}}
        @onClose={{handleClose}}
        as |sb|
      >
        <button type="button" {{on "click" sb.close}}></button>
        <sb.Trigger />
        <sb.Input />
      </SelectBox>
    </template>);

    assert.true(api.isOpen);

    await click('button');
    await click('button');

    assert.verifySteps(['close']);

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
  });

  test('closes when trigger loses focus', async function (assert) {
    assert.expect(3);

    await render(<template>
      <SelectBox @open={{true}} as |sb|>
        <sb.Trigger />
        <sb.Input />
      </SelectBox>
    </template>);

    await focus('.select-box__trigger');
    await blur('.select-box__trigger');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
  });

  test('closes when input loses focus', async function (assert) {
    assert.expect(3);

    await render(<template>
      <SelectBox @open={{true}} as |sb|>
        <sb.Trigger />
        <sb.Input />
      </SelectBox>
    </template>);

    await focus('.select-box__input');
    await blur('.select-box__input');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
  });

  test('closing listbox', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox @open={{true}} @onClose={{handleClose}} as |sb|>
        <button type="button" {{on "click" sb.close}}></button>
        <sb.Options />
      </SelectBox>
    </template>);

    await click('button');

    assert.verifySteps([], 'listboxes cannot be closed');
  });

  test('closing does not steal focus', async function (assert) {
    assert.expect(2);

    const state = new (class {
      @tracked value;
    })();

    const handleChange = (value) => (state.value = value);

    await render(<template>
      <SelectBox @onChange={{handleChange}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value="foo" />
        </sb.Options>
      </SelectBox>

      {{#if state.value}}
        <input
          class="outside"
          value={{state.value}}
          aria-label="Example"
          {{autoFocus}}
        />
      {{/if}}
    </template>);

    await click('.select-box__trigger');
    await click('.select-box__option');

    assert.dom('.outside').hasValue('foo').isFocused();
  });

  test('closing due to loss of focus', async function (assert) {
    assert.expect(3);

    await render(<template>
      <SelectBox @onClose={{handleClose}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    await click('.select-box__trigger');
    await blur('.select-box__trigger');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.verifySteps(['close']);
  });

  test('closing due to mousing up outside', async function (assert) {
    assert.expect(3);

    await render(<template>
      <SelectBox @onClose={{handleClose}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>

      <div class="outside"></div>
    </template>);

    await triggerEvent('.select-box__trigger', 'mousedown');
    await triggerEvent('.outside', 'mouseup');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.verifySteps(['close']);
  });

  test('mousing up outside must have moused down first', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox @open={{true}} @onClose={{handleClose}} as |sb|>
        <sb.Trigger />
      </SelectBox>

      <div class="outside"></div>
    </template>);

    await click('.outside');

    assert.dom('.select-box').hasAttribute('data-open', 'true');
    assert.verifySteps([]);
  });

  test('closing due to touching outside', async function (assert) {
    assert.expect(3);

    await render(<template>
      <SelectBox @open={{true}} @onClose={{handleClose}} as |sb|>
        <sb.Trigger />
      </SelectBox>

      <div class="outside"></div>
    </template>);

    await triggerEvent('.select-box', 'mousedown');
    await triggerEvent('.outside', 'touchstart');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.verifySteps(['close']);
  });

  test('closing due to pressing escape', async function (assert) {
    assert.expect(3);

    await render(<template>
      <SelectBox @onClose={{handleClose}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    await click('.select-box__trigger');
    await triggerKeyEvent('.select-box__trigger', 'keydown', 'Escape');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.verifySteps(['close']);
  });

  test('close only fires once', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox @onClose={{handleClose}} as |sb|>
        <sb.Trigger />
      </SelectBox>

      <div class="outside"></div>
    </template>);

    await click('.select-box__trigger');
    await blur('.select-box__trigger');
    await triggerEvent('.outside', 'mouseup');

    assert.verifySteps(
      ['close'],
      `a select box may close on focus leave and mousing up outside,
       if focus is lost _because_ of the mousing up outside, then
       the onClose action only fires once, not twice`
    );
  });

  test('programmatically closing', async function (assert) {
    assert.expect(3);

    const handleSelect = () => false;

    await render(<template>
      <SelectBox @onSelect={{handleSelect}} @onClose={{handleClose}} as |sb|>
        <sb.Trigger />
        <button type="button" {{on "click" sb.close}}></button>
      </SelectBox>
    </template>);

    await click('.select-box__trigger');

    assert.verifySteps(
      [],
      `the return value of onSelect controls whether or not the
       select box will close after making the selection`
    );

    await click('button');

    assert.verifySteps(['close']);
  });

  test('clicking to programmatically close', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
        {{#if sb.isOpen}}
          <sb.Options>
            <button type="button" {{on "click" sb.close}}></button>
          </sb.Options>
        {{/if}}
      </SelectBox>
    </template>);

    await click('.select-box__trigger');
    await click('button');

    assert.ok(true, 'does not cause infinite revalidation bug');
  });
});
