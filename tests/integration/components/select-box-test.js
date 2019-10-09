import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberArray, { A as emberA } from '@ember/array';
const { isFrozen, isSealed } = Object;

module('select-box', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox />`);

    assert
      .dom('div.select-box')
      .exists({ count: 1 }, 'renders with correct class name and tag');
  });

  test('class prefix attr', async function(assert) {
    assert.expect(9);

    await render(hbs`
      <SelectBox @classNamePrefix="foo" as |sb|>
        <sb.Input />
        <sb.SelectedOptions>
          <sb.SelectedOption />
        </sb.SelectedOptions>
        <sb.Options>
          <sb.Group>
            <sb.Option />
          </sb.Group>
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.foo').exists({ count: 1 });
    assert.dom('.foo__input').exists({ count: 1 });
    assert.dom('.foo__options').exists({ count: 1 });
    assert.dom('.foo__selected-options').exists({ count: 1 });
    assert.dom('.foo__group').exists({ count: 1 });
    assert.dom('.foo__group-label').exists({ count: 1 });
    assert.dom('.foo__group-options').exists({ count: 1 });
    assert.dom('.foo__option').exists({ count: 1 });
    assert.dom('.foo__selected-option').exists({ count: 1 });
  });

  test('role', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox />`);

    assert
      .dom('.select-box')
      .doesNotHaveAttribute('role', 'select box has no aria role');
  });

  test('multiple class', async function(assert) {
    assert.expect(2);

    await render(hbs`<SelectBox />`);

    assert.ok(
      !find('.select-box').classList.contains('select-box--multiple'),
      'no multiple class'
    );

    await render(hbs`<SelectBox @multiple={{true}} />`);

    assert
      .dom('.select-box')
      .hasClass('select-box--multiple', 'has multiple class');
  });

  test('insert element action', async function(assert) {
    assert.expect(1);

    let el;

    this.set('inserted', sb => {
      el = sb.element;
    });

    await render(hbs`<SelectBox @onInsertElement={{this.inserted}} />`);

    assert.deepEqual(
      el,
      find('.select-box'),
      'sends the element out when inserted into the dom'
    );
  });

  test('initial update action', async function(assert) {
    assert.expect(2);

    let called = 0;

    this.set('updated', sb => {
      called++;

      assert.strictEqual(
        sb.value,
        undefined,
        'fires an initial update action with the selected value'
      );
    });

    await render(hbs`<SelectBox @onUpdate={{this.updated}} />`);

    assert.equal(called, 1, 'only fires once');
  });

  test('subsequent update actions', async function(assert) {
    assert.expect(1);

    let count = 0;

    this.set('selectedValue', 'foo');

    this.set('updated', sb => {
      count++;

      if (count === 2) {
        assert.strictEqual(
          sb.value,
          'bar',
          'fires an update action when the value changes'
        );
      }
    });

    await render(hbs`
      <SelectBox
        @value={{this.selectedValue}}
        @onUpdate={{this.updated}} />
    `);

    this.set('selectedValue', 'bar');
  });

  test('update action', async function(assert) {
    assert.expect(1);

    let count = 0;

    this.set('updated', () => {
      count++;
    });

    await render(hbs`
      <SelectBox
        @disabled={{this.isDisabled}}
        @onUpdate={{this.updated}} />
    `);

    this.set('isDisabled', true);

    assert.equal(
      count,
      1,
      'updating arguments other than the `value` should not fire update action'
    );
  });

  test('no update action', async function(assert) {
    assert.expect(1);

    await render(
      hbs`<SelectBox @onUpdate={{@onUpdate}} @value={{this.value}} />`
    );

    this.set('value', 'foo');

    assert.ok(
      true,
      'does not blow up when no update action is specified (useful pattern for composing)'
    );
  });

  test('init action', async function(assert) {
    assert.expect(3);

    let api;

    this.set('initialised', sb => (api = sb));

    await render(hbs`<SelectBox @onInit={{this.initialised}} />`);

    assert.ok(
      !find('.select-box').classList.contains('select-box--open'),
      'precondition, not open'
    );

    api.open();

    await settled();

    assert.strictEqual(api.value, undefined, 'has expected value');

    assert
      .dom('.select-box')
      .hasClass('select-box--open', 'action is called with the api');
  });

  test('api value', async function(assert) {
    assert.expect(10);

    const value1 = emberA(['foo']);
    const value2 = emberA(['bar']);
    const apis = [];

    this.set('value', value1);

    this.set('checkAPI', sb => {
      apis.push(sb);

      if (apis.length === 1) {
        assert.strictEqual(sb.value, null, 'value still being resolved');
      } else if (apis.length === 2) {
        assert.deepEqual(sb.value, ['foo']);
      } else if (apis.length === 3) {
        assert.deepEqual(sb.value, ['bar']);
      }
    });

    await render(hbs`
      <SelectBox
        @value={{this.value}}
        @multiple={{true}}
        @onInit={{this.checkAPI}}
        @onUpdate={{this.checkAPI}} />
    `);

    assert.ok(isSealed(apis[0]), 'api is sealed');

    assert.ok(
      !isFrozen(this.value),
      'api does not accidentally freeze original value'
    );

    assert.deepEqual(
      apis[0].value,
      ['foo'],
      "yielded api's are always up to date"
    );

    assert.strictEqual(
      EmberArray.detect(apis[0].value),
      false,
      'the yielded api value is not the original array (or an ember array)'
    );

    assert.throws(() => {
      apis[0].foo = 'bar';
    }, 'cannot alter the api');

    this.set('value', value2);

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

  test('does not blow up if destroyed', async function(assert) {
    assert.expect(0);

    this.set('show', true);

    this.set('hide', () => {
      this.set('show', false);
    });

    await render(hbs`
      {{#if this.show}}
        <SelectBox @onSelect={{this.hide}} as |sb|>
          <sb.Option @value={{1}} />
        </SelectBox>
      {{/if}}
    `);

    await click('.select-box__option');
  });
});
