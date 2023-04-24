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
import hbs from 'htmlbars-inline-precompile';

module('select-box (closing)', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (assert) {
    this.handleReady = (sb) => (this.api = sb);
    this.handleClose = () => assert.step('close');
  });

  test('closing with api', async function (assert) {
    assert.expect(6);

    await render(hbs`
      <SelectBox
        @open={{true}}
        @onReady={{this.handleReady}}
        @onClose={{this.handleClose}}
        as |sb|
      >
        <button
          type="button"
          {{on "click" sb.close}}
        ></button>
        <sb.Trigger />
        <sb.Input />
      </SelectBox>
    `);

    assert.true(this.api.isOpen);

    await click('button');
    await click('button');

    assert.verifySteps(['close']);

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
  });

  test('closes when trigger loses focus', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox @open={{true}} as |sb|>
        <sb.Trigger />
        <sb.Input />
      </SelectBox>
    `);

    await focus('.select-box__trigger');
    await blur('.select-box__trigger');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
  });

  test('closes when input loses focus', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox @open={{true}} as |sb|>
        <sb.Trigger />
        <sb.Input />
      </SelectBox>
    `);

    await focus('.select-box__input');
    await blur('.select-box__input');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
  });

  test('closing listbox', async function (assert) {
    assert.expect(1);

    this.handleClose = () => assert.step('close');

    await render(hbs`
      <SelectBox @open={{true}} @onClose={{this.handleClose}} as |sb|>
        <button
          type="button"
          {{on "click" sb.close}}
        ></button>
        <sb.Options />
      </SelectBox>
    `);

    await click('button');

    assert.verifySteps([], 'listboxes cannot be closed');
  });

  test('closing does not steal focus', async function (assert) {
    assert.expect(2);

    this.handleChange = (value) => this.set('value', value);

    await render(hbs`
      <SelectBox @onChange={{this.handleChange}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value="foo" />
        </sb.Options>
      </SelectBox>

      {{#if this.value}}
        <input
          class="outside"
          value={{this.value}}
          aria-label="Example"
          {{auto-focus}}
        />
      {{/if}}
    `);

    await click('.select-box__trigger');
    await click('.select-box__option');

    assert.dom('.outside').hasValue('foo').isFocused();
  });

  test('closing due to loss of focus', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox @onClose={{this.handleClose}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    await click('.select-box__trigger');
    await blur('.select-box__trigger');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.verifySteps(['close']);
  });

  test('closing due mousing up outside', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox @onClose={{this.handleClose}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>

      <div class="outside"></div>
    `);

    await triggerEvent('.select-box__trigger', 'mousedown');
    await triggerEvent('.outside', 'mouseup');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.verifySteps(['close']);
  });

  test('mousing up outside must have moused down first', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <button type="button"></button>

      <SelectBox
        @open={{true}}
        @onlClose={{this.handleClose}}
        as |sb|
      >
        <sb.Trigger />
      </SelectBox>
    `);

    await click('button');

    assert.verifySteps([]);
  });

  test('closing due to pressing escape', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox @onClose={{this.handleClose}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    await click('.select-box__trigger');
    await triggerKeyEvent('.select-box__trigger', 'keydown', 'Escape');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.verifySteps(['close']);
  });

  test('close only fires once', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <SelectBox @onClose={{this.handleClose}} as |sb|>
        <sb.Trigger />
      </SelectBox>
      <div class="outside"></div>
    `);

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

    this.handleSelect = () => false;

    await render(hbs`
      <SelectBox
        @onSelect={{this.handleSelect}}
        @onClose={{this.handleClose}} as |sb|
      >
        <sb.Trigger />
        <button type="button" {{on "click" sb.close}}></button>
      </SelectBox>
    `);

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

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Trigger />
        {{#if sb.isOpen}}
          <sb.Options>
            <button type="button" {{on "click" sb.close}}></button>
          </sb.Options>
        {{/if}}
      </SelectBox>
    `);

    await click('.select-box__trigger');
    await click('button');

    assert.ok(true, 'does not cause infinite revalidation bug');
  });
});
