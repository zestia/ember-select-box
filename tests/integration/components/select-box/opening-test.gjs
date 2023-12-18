import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import {
  render,
  rerender,
  click,
  focus,
  find,
  triggerEvent,
  triggerKeyEvent
} from '@ember/test-helpers';
import { on } from '@ember/modifier';
import { array } from '@ember/helper';
import { tracked } from '@glimmer/tracking';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (opening)', function (hooks) {
  setupRenderingTest(hooks);

  test('opening with api', async function (assert) {
    assert.expect(7);

    let api;

    const handleReady = (sb) => (api = sb);
    const handleOpen = () => assert.step('open');

    await render(<template>
      <SelectBox @onReady={{handleReady}} @onOpen={{handleOpen}} as |sb|>
        <button type="button" {{on "click" sb.open}}></button>
        <sb.Trigger />
        <sb.Input />
      </SelectBox>
    </template>);

    assert.false(api.isOpen);

    await click('button');
    await click('button');

    assert.true(api.isOpen);

    assert.verifySteps(['open']);

    assert.dom('.select-box').hasAttribute('data-open', 'true');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'true');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'true');
  });

  test('can set initial open state', async function (assert) {
    assert.expect(6);

    await render(<template>
      <SelectBox @open={{true}} as |sb|>
        <sb.Trigger />
        <sb.Input />
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

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

  test('initial open state of combobox without a trigger (custom behaviour!)', async function (assert) {
    assert.expect(5);

    // The addon can't know if the combobox is one where the options are already visible,
    // or one where they will be shown by interacting with the input element. If the developer
    // had used a Trigger element, we make the assumption that it will control the expanded state.

    await render(<template>
      <SelectBox as |sb|>
        <sb.Input />
        <sb.Options />
      </SelectBox>
    </template>);

    assert
      .dom('.select-box')
      .doesNotHaveAttribute(
        'data-open',
        'technically invalid, ought to have expanded attr'
      );

    // ...therefore, because the developer has opted out of having a Trigger button,
    // they must manually set its initial expanded state and configure a way to
    // control that expanded state, in order to be valid aria. Example:

    await render(<template>
      <SelectBox @open={{false}} as |sb|>
        <sb.Input {{on "focus" sb.open}} />
        <sb.Options />
      </SelectBox>
    </template>);

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');

    await focus('.select-box__input');

    assert.dom('.select-box').hasAttribute('data-open', 'true');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'true');
  });

  test('cannot manually open listbox', async function (assert) {
    assert.expect(2);

    const handleOpen = () => assert.step('open');

    await render(<template>
      <SelectBox @open={{true}} @onOpen={{handleOpen}} as |sb|>
        <sb.Options />
      </SelectBox>
    </template>);

    assert.dom('.select-box').doesNotHaveAttribute('data-open');
    assert.verifySteps([]);
  });

  test('cannot open combobox manually with argument', async function (assert) {
    assert.expect(3);

    const state = new (class {
      @tracked isOpen;
    })();

    await render(<template>
      <SelectBox @open={{state.isOpen}} as |sb|>
        <sb.Trigger />
        <sb.Input />
      </SelectBox>
    </template>);

    state.isOpen = true;

    await rerender();

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
  });

  test('activates first option (undefined === undefined)', async function (assert) {
    assert.expect(3);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option />
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

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

    await render(<template>
      <SelectBox @value={{2}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value={{1}} />
          <sb.Option @value={{2}} />
          <sb.Option @value={{3}} />
        </sb.Options>
      </SelectBox>
    </template>);

    await click('.select-box__trigger');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');
  });

  test('activating option (multiple)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox @multiple={{true}} @value={{array 4 3 2}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value={{1}} />
          <sb.Option @value={{2}} />
          <sb.Option @value={{3}} />
          <sb.Option @value={{4}} />
        </sb.Options>
      </SelectBox>
    </template>);

    await click('.select-box__trigger');

    assert
      .dom('.select-box__option[aria-current="true"]')
      .doesNotExist(
        'does not attempt to activate any of the options for the given value'
      );
  });

  test('activates option for value after they are rendered', async function (assert) {
    assert.expect(1);

    await render(<template>
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
    </template>);

    await click('.select-box__trigger');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');
  });

  test('opening via the trigger does not lose focus', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
      </SelectBox>
    </template>);

    await click('.select-box__trigger');

    assert.dom('.select-box__trigger').isFocused();
  });

  test('opening via the trigger advances focus to the input (mouse)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Input />
      </SelectBox>
    </template>);

    await click('.select-box__trigger');

    assert.dom('.select-box__input').isFocused();
  });

  test('opening via the trigger advances focus to the input (keyboard)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Input />
      </SelectBox>
    </template>);

    await focus('.select-box__trigger');
    await triggerKeyEvent('.select-box__trigger', 'keydown', 'Enter');

    assert.dom('.select-box__input').isFocused();
  });

  test('opening via the api advances focus to the input', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger {{on "mouseenter" sb.open}} />
        <sb.Input />
      </SelectBox>
    </template>);

    await triggerEvent('.select-box__trigger', 'mouseenter');

    assert.dom('.select-box__input').isFocused();
  });

  test('opening listbox', async function (assert) {
    assert.expect(1);

    const handleOpen = () => assert.step('open');

    await render(<template>
      <SelectBox @onOpen={{handleOpen}} as |sb|>
        <button type="button" {{on "click" sb.open}}></button>
        <sb.Options />
      </SelectBox>
    </template>);

    await click('button');

    assert.verifySteps([], 'listboxes cannot be opened');
  });

  test('opening combo box with arg (trigger)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox @open={{true}} as |sb|>
        <sb.Trigger />
      </SelectBox>
    </template>);

    assert.dom('.select-box__trigger').isNotFocused('does not steal focus');
  });

  test('opening combo box with arg (input)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox @open={{true}} as |sb|>
        <sb.Input />
      </SelectBox>
    </template>);

    assert.dom('.select-box__input').isNotFocused('does not steal focus');
  });

  test('opening combobox with input only', async function (assert) {
    assert.expect(4);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Input {{on "click" sb.open}} />
        <sb.Options>
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

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

    await render(<template>
      {{! template-lint-disable no-forbidden-elements }}
      <style>
        .select-box__options { height: 1em; overflow: auto; }
        .select-box__option { line-height: 1; }
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
    </template>);

    await click('.select-box__trigger');

    const expectedTop = find('.select-box__option:nth-child(3)').offsetTop;

    assert.ok(expectedTop > 0);
    assert.strictEqual(find('.select-box__options').scrollTop, expectedTop);
  });

  test('opening forgets previous active option', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option />
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    await click('.select-box__trigger');

    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    await click('.select-box__trigger');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();
  });
});
