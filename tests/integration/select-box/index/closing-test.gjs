import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
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

  let handleClose;

  hooks.beforeEach(function (assert) {
    handleClose = (reason) => assert.step(`close ${reason?.description}`);
  });

  test('closing with api', async function (assert) {
    assert.expect(8);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown @onClose={{handleClose}} as |dd|>
            <sb.Content>
              <button
                type="button"
                class="close"
                {{on "click" dd.close}}
              ></button>
            </sb.Content>
            <sb.Trigger />
            <sb.Input />
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.dropdown__trigger');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'true');
    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute('aria-expanded', 'true');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'true');

    // Intentionally twice
    await click('.close');
    await click('.close');

    assert.verifySteps(['close undefined']);

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');
    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
  });

  test('closes when trigger loses focus', async function (assert) {
    assert.expect(6);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown>
            <sb.Trigger />
            <sb.Input />
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'true');
    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute('aria-expanded', 'true');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'true');

    await focus('.select-box .dropdown__trigger');
    await blur('.select-box .dropdown__trigger');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');
    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
  });

  test('closes when input loses focus', async function (assert) {
    assert.expect(4);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown>
            <sb.Trigger />
            <sb.Input />
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');

    assert.dom('.select-box__input').isFocused();

    await blur('.select-box__input');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');
    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
  });

  test('closing does not steal focus', async function (assert) {
    assert.expect(2);

    const state = new (class {
      @tracked value;
    })();

    const handleChange = (value) => (state.value = value);

    await render(
      <template>
        <SelectBox @onChange={{handleChange}} as |sb|>
          <sb.Dropdown>
            <sb.Trigger />
            <sb.Content>
              <sb.Options>
                <sb.Option @value="foo" />
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>

        {{#if state.value}}
          <input
            class="outside"
            value={{state.value}}
            aria-label="Example"
            {{autoFocus}}
          />
        {{/if}}
      </template>
    );

    await click('.select-box .dropdown__trigger');
    await click('.select-box__option');

    assert.dom('.outside').hasValue('foo').isFocused();
  });

  test('closing due to mousing up outside', async function (assert) {
    assert.expect(3);

    // This is a 'click abort'. When the user mouses down on the
    // select box, drags their cursor over an option, but then
    // decides no, and drags their cursor outside the select box
    // and releases.

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown @onClose={{handleClose}}>
            <sb.Trigger />
            <sb.Content>
              <sb.Options>
                <sb.Option />
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>

        <div class="outside"></div>
      </template>
    );

    await triggerEvent('.select-box .dropdown__trigger', 'mousedown');
    await triggerEvent('.outside', 'mouseup');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');
    assert.verifySteps(['close CLICK_OUTSIDE']);
  });

  test('mousing up outside will close a manually opened dropdown', async function (assert) {
    assert.expect(4);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown @open={{true}} @onClose={{handleClose}}>
            <sb.Trigger />
          </sb.Dropdown>
        </SelectBox>

        <div class="outside"></div>
      </template>
    );

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'true');

    await click('.outside');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');
    assert.verifySteps(['close CLICK_OUTSIDE']);
  });

  test('closing due to pressing escape', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown @onClose={{handleClose}}>
            <sb.Trigger />
            <sb.Content>
              <sb.Options>
                <sb.Option />
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');
    await triggerKeyEvent(
      '.select-box .dropdown__trigger',
      'keydown',
      'Escape'
    );

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');
    assert.verifySteps(['close ESCAPE']);
  });

  test('programmatically closing', async function (assert) {
    assert.expect(3);

    const handleSelect = () => false;

    await render(
      <template>
        <SelectBox @onSelect={{handleSelect}} as |sb|>
          <sb.Dropdown @onClose={{handleClose}} as |dd|>
            <sb.Trigger />
            <sb.Content>
              <button type="button" {{on "click" dd.close}}></button>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');

    assert.verifySteps(
      [],
      `the return value of onSelect controls whether or not the
       select box will close after making the selection`
    );

    await click('button');

    assert.verifySteps(['close undefined']);
  });

  test('clicking to programmatically close', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown as |dd|>
            <sb.Trigger />
            {{#if dd.isOpen}}
              <sb.Content>
                <sb.Options>
                  <sb.Option />
                </sb.Options>
                <button
                  type="button"
                  class="close"
                  {{on "click" dd.close}}
                ></button>
              </sb.Content>
            {{/if}}
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'true');

    await click('.close');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');

    assert.ok(true, 'does not cause infinite revalidation bug');
  });

  test('closing forgets previous active option', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown>
            <sb.Trigger />
            <sb.Content>
              <sb.Options>
                <sb.Option @value={{1}} />
                <sb.Option @value={{2}} />
                <sb.Option @value={{3}} />
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');
    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    await click('.select-box .dropdown__trigger');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();
  });

  test('closing due to clicking an option (trigger)', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown @onClose={{handleClose}}>
            <sb.Trigger />
            <sb.Content>
              <sb.Options>
                <sb.Option />
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');
    await click('.select-box__option');

    assert.verifySteps(['close SELECTED']);
  });

  test('closing due to clicking an option (input)', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown @open={{true}} @onClose={{handleClose}}>
            <sb.Input />
            <sb.Content>
              <sb.Options>
                <sb.Option />
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box__option');

    assert.verifySteps(
      [],
      `does not make the assumption to close after making
       a selection without the presence of a trigger`
    );
  });
});
