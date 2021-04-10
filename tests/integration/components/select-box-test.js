import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberArray, { A as emberA } from '@ember/array';
const { isFrozen, isSealed, keys } = Object;

module('select-box', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox />`);

    assert
      .dom('.select-box')
      .hasTagName('div', 'renders with correct class name and tag');
  });

  test('role', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox />`);

    assert
      .dom('.select-box')
      .hasAttribute(
        'role',
        'listbox',
        'assumes a list box, until an input is present'
      );
  });

  test('id', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox id="foo" />`);

    assert
      .dom('.select-box')
      .hasAttribute(
        'id',
        'foo',
        'can manually set an ID. ' +
          '(this is required so that the select box can be hooked up to a label with for=)'
      );
  });

  test('multiple arg', async function (assert) {
    assert.expect(2);

    await render(hbs`<SelectBox />`);

    assert
      .dom('.select-box')
      .hasAttribute(
        'aria-multiselectable',
        'false',
        'single select by default'
      );

    await render(hbs`<SelectBox @multiple={{true}} />`);

    assert.dom('.select-box').hasAttribute('aria-multiselectable', 'true');
  });

  test('initial update action', async function (assert) {
    assert.expect(2);

    this.handleUpdate = (sb) => {
      assert.step(`updated with ${sb.value}`);
    };

    await render(hbs`<SelectBox @onUpdate={{this.handleUpdate}} />`);

    assert.verifySteps(
      ['updated with undefined'],
      'fires an initial update action with the current value'
    );
  });

  test('subsequent update actions', async function (assert) {
    assert.expect(3);

    this.myValue = 'foo';

    this.handleUpdate = (sb) => {
      assert.step(`updated with ${sb.value}`);
    };

    await render(hbs`
      <SelectBox
        @value={{this.myValue}}
        @onUpdate={{this.handleUpdate}}
      />
    `);

    this.set('myValue', 'bar');

    assert.verifySteps(
      ['updated with foo', 'updated with bar'],
      'fires an update action when the value changes'
    );
  });

  test('update action', async function (assert) {
    assert.expect(2);

    this.handleUpdate = () => assert.step('update');

    await render(hbs`
      <SelectBox
        @disabled={{this.isDisabled}}
        @onUpdate={{this.handleUpdate}}
      />
    `);

    this.set('isDisabled', true);

    assert.verifySteps(
      ['update'],
      'updating arguments other than the `value` should not fire update action'
    );
  });

  test('no update action', async function (assert) {
    assert.expect(1);

    await render(
      hbs`<SelectBox @onUpdate={{@onUpdate}} @value={{this.myValue}} />`
    );

    this.set('myValue', 'foo');

    assert.ok(
      true,
      'does not blow up when no update action is specified (useful pattern for composing)'
    );
  });

  test('ready action', async function (assert) {
    assert.expect(3);

    let api;

    this.handleReady = (sb) => (api = sb);

    await render(hbs`<SelectBox @onReady={{this.handleReady}} />`);

    assert
      .dom('.select-box')
      .hasAttribute('aria-expanded', 'false', 'precondition, not open');

    await settled();

    assert.strictEqual(api.value, undefined, 'has expected value');

    assert.deepEqual(
      api.element,
      find('.select-box'),
      'action is called with the api'
    );
  });

  test('api value', async function (assert) {
    assert.expect(6);

    const value1 = emberA(['foo']);
    const value2 = emberA(['bar']);
    const apis = [];

    this.myValue = value1;

    this.checkAPI = (sb) => apis.push(sb);

    await render(hbs`
      <SelectBox
        @value={{this.myValue}}
        @multiple={{true}}
        @onReady={{this.checkAPI}}
        @onUpdate={{this.checkAPI}}
      />
    `);

    assert.ok(isSealed(apis[0]), 'api is sealed');

    assert.false(
      isFrozen(this.myValue),
      'api does not accidentally freeze original value'
    );

    assert.deepEqual(
      apis[0].value,
      ['foo'],
      "yielded api's are always up to date"
    );

    assert.false(
      EmberArray.detect(apis[0].value),
      'the yielded api value is not the original array (or an ember array)'
    );

    this.set('myValue', value2);

    assert.deepEqual(
      apis[1].value,
      ['bar'],
      'update action fired due to value change, api value correct'
    );

    assert.deepEqual(
      apis[0].value,
      ['bar'],
      "yielded api's are always up to date"
    );
  });

  test('api writing', async function (assert) {
    assert.expect(1);

    let api;

    this.handleReady = (sb) => (api = sb);

    await render(hbs`
      <SelectBox @onReady={{this.handleReady}} />
    `);

    assert.throws(
      () => {
        api.foo = 'bar';
      },
      /Cannot add property foo/,
      'cannot alter the api'
    );
  });

  test('api deleting', async function (assert) {
    assert.expect(1);

    let api;

    this.handleReady = (sb) => (api = sb);

    await render(hbs`
      <SelectBox @value="foo" @onReady={{this.handleReady}} />
    `);

    assert.throws(
      () => {
        delete api.value;
      },
      /Cannot delete property 'value'/,
      'cannot alter the api'
    );
  });

  test('api reading', async function (assert) {
    assert.expect(2);

    let api;

    this.handleReady = (sb) => (api = sb);

    await render(hbs`
      <SelectBox @onReady={{this.handleReady}} />
    `);

    assert.strictEqual(
      api.options,
      undefined,
      'cannot access private properties'
    );

    assert.deepEqual(
      keys(api),
      [
        // Components
        'Group',
        'Input',
        'Option',
        'Options',
        'SelectedOption',
        'SelectedOptions',
        // Properties
        'element',
        'isBusy',
        'isDisabled',
        'isFulfilled',
        'isMultiple',
        'isOpen',
        'isPending',
        'isRejected',
        'isSearching',
        'isSettled',
        'isSlowSearch',
        'value',
        // Actions
        'activateNextOption',
        'activateOptionAtIndex',
        'activateOptionForKeyCode',
        'activateOptionForValue',
        'activatePreviousOption',
        'blurInput',
        'cancelSearch',
        'close',
        'deactivateOptions',
        'focusInput',
        'open',
        'search',
        'select',
        'selectActiveOption',
        'setInputValue',
        'toggle',
        'update'
      ],
      'only these keys are publicly available'
    );
  });
});
