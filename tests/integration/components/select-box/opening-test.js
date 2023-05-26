import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  click,
  focus,
  find,
  settled,
  triggerEvent,
  triggerKeyEvent
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (opening)', function (hooks) {
  setupRenderingTest(hooks);

  test('opening with api', async function (assert) {
    assert.expect(7);

    this.handleReady = (sb) => (this.api = sb);
    this.handleOpen = () => assert.step('open');

    await render(hbs`
      <SelectBox
        @onReady={{this.handleReady}}
        @onOpen={{this.handleOpen}}
        as |sb|
      >
        <button
          type="button"
          {{on "click" sb.open}}
        ></button>
        <sb.Trigger />
        <sb.Input />
      </SelectBox>
    `);

    assert.false(this.api.isOpen);

    await click('button');
    await click('button');

    assert.true(this.api.isOpen);

    assert.verifySteps(['open']);

    assert.dom('.select-box').hasAttribute('data-open', 'true');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'true');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'true');
  });

  test('can set initial open state', async function (assert) {
    assert.expect(6);

    await render(hbs`
      <SelectBox @open={{true}} as |sb|>
        <sb.Trigger />
        <sb.Input />
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.select-box').hasAttribute('data-open', 'true');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'true');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'true');
    assert.dom('.select-box__trigger').isNotFocused();
    assert.dom('.select-box__input').isNotFocused();

    assert.dom('.select-box__option').hasAttribute(
      'aria-current',
      'false',
      `because open happens at construction, not after render, no options are
       set to be current, since there are none at this point.`
    );
  });

  test('cannot manually open listbox', async function (assert) {
    assert.expect(1);

    this.handleOpen = () => assert.step('open');

    await render(hbs`
      <SelectBox @open={{true}} as |sb|>
        <sb.Options />
      </SelectBox>
    `);

    assert.dom('.select-box').doesNotHaveAttribute('data-open');
  });

  test('cannot open combobox manually with argument', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox @open={{this.isOpen}} as |sb|>
        <sb.Trigger />
        <sb.Input />
      </SelectBox>
    `);

    this.set('isOpen', true);

    await settled();

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
  });

  test('activates first option (undefined === undefined)', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option />
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    await click('.select-box__trigger');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'false');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'false');
  });

  test('activates option for value (single)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox @value={{2}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value={{1}} />
          <sb.Option @value={{2}} />
          <sb.Option @value={{3}} />
        </sb.Options>
      </SelectBox>
    `);

    await click('.select-box__trigger');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');
  });

  test('activating option (multiple)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox @multiple={{true}} @value={{array 4 3 2}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value={{1}} />
          <sb.Option @value={{2}} />
          <sb.Option @value={{3}} />
          <sb.Option @value={{4}} />
        </sb.Options>
      </SelectBox>
    `);

    await click('.select-box__trigger');

    assert
      .dom('.select-box__option[aria-current="true"]')
      .doesNotExist(
        'does not attempt to activate any of the options for the given value'
      );
  });

  test('activates option for value after they are rendered', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox @value={{2}} as |sb|>
        <sb.Trigger />
        {{#if sb.isOpen}}
          <sb.Options>
            <sb.Option @value={{1}} />
            <sb.Option @value={{2}} />
            <sb.Option @value={{3}} />
          </sb.Options>
        {{/if}}
      </SelectBox>
    `);

    await click('.select-box__trigger');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');
  });

  test('opening via the trigger does not lose focus', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Trigger />
      </SelectBox>
    `);

    await click('.select-box__trigger');

    assert.dom('.select-box__trigger').isFocused();
  });

  test('opening via the trigger advances focus to the input (mouse)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Input />
      </SelectBox>
    `);

    await click('.select-box__trigger');

    assert.dom('.select-box__input').isFocused();
  });

  test('opening via the trigger advances focus to the input (keyboard)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Input />
      </SelectBox>
    `);

    await focus('.select-box__trigger');
    await triggerKeyEvent('.select-box__trigger', 'keydown', 'Enter');

    assert.dom('.select-box__input').isFocused();
  });

  test('opening via the api advances focus to the input', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Trigger {{on "mouseenter" sb.open}} />
        <sb.Input />
      </SelectBox>
    `);

    await triggerEvent('.select-box__trigger', 'mouseenter');

    assert.dom('.select-box__input').isFocused();
  });

  test('opening listbox', async function (assert) {
    assert.expect(1);

    this.handleOpen = () => assert.step('open');

    await render(hbs`
      <SelectBox @onOpen={{this.handleOpen}} as |sb|>
        <button
          type="button"
          {{on "click" sb.open}}
        ></button>
        <sb.Options />
      </SelectBox>
    `);

    await click('button');

    assert.verifySteps([], 'listboxes cannot be opened');
  });

  test('opening combo box with arg (trigger)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox @open={{true}} as |sb|>
        <sb.Trigger />
      </SelectBox>
    `);

    assert.dom('.select-box__trigger').isNotFocused('does not steal focus');
  });

  test('opening combo box with arg (input)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox @open={{true}} as |sb|>
        <sb.Input />
      </SelectBox>
    `);

    assert.dom('.select-box__input').isNotFocused('does not steal focus');
  });

  test('opening combobox with input only', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Input {{on "click" sb.open}} />
        <sb.Options>
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.select-box[aria-current="true"]').doesNotExist();

    await click('.select-box__input');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');

    assert.dom('.select-box').hasAttribute('data-open', 'true');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'true');
  });

  test('opening with a selected value scrolls it into view', async function (assert) {
    assert.expect(2);

    await render(hbs`
      {{! template-lint-disable no-forbidden-elements }}
      <style>
      .select-box__options {
        height: 1em;
        overflow: auto;
      }
      .select-box__option {
        line-height: 1;
      }
      </style>

      <SelectBox @value={{3}} as |sb|>
        <sb.Trigger />
        {{#if sb.isOpen}}
          <sb.Options>
            <sb.Option @value={{1}}>One</sb.Option>
            <sb.Option @value={{2}}>Two</sb.Option>
            <sb.Option @value={{3}}>Three</sb.Option>
          </sb.Options>
        {{/if}}
      </SelectBox>
    `);

    await click('.select-box__trigger');

    const expectedTop = find('.select-box__option:nth-child(3)').offsetTop;

    assert.ok(expectedTop > 0);
    assert.strictEqual(find('.select-box__options').scrollTop, expectedTop);
  });

  test('opening forgets previous active option', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option />
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    await click('.select-box__trigger');

    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    await click('.select-box__trigger');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();
  });
});
