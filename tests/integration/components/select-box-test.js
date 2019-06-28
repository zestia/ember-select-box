import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, settled, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import SelectBox from '@zestia/ember-select-box/components/select-box';
import EmberArray, { A as emberA } from '@ember/array';
import { htmlSafe } from '@ember/template';
const { isFrozen } = Object;

module('select-box', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox />`);

    assert.dom('div.select-box').exists({ count: 1 }, 'renders with correct class name and tag');
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
    assert.dom('.foo-input').exists({ count: 1 });
    assert.dom('.foo-options').exists({ count: 1 });
    assert.dom('.foo-selected-options').exists({ count: 1 });
    assert.dom('.foo-group').exists({ count: 1 });
    assert.dom('.foo-group-label').exists({ count: 1 });
    assert.dom('.foo-group-options').exists({ count: 1 });
    assert.dom('.foo-option').exists({ count: 1 });
    assert.dom('.foo-selected-option').exists({ count: 1 });
  });

  test('classic: style', async function(assert) {
    assert.expect(1);

    this.set('style', htmlSafe('color: red'));

    await render(hbs`{{select-box style=this.style}}`);

    assert.dom('.select-box').hasAttribute('style', 'color: red', 'can bind style to classic comp');
  });

  test('extending with class prefix', async function(assert) {
    assert.expect(1);

    const FooSelectBox = SelectBox.extend({
      classNamePrefix: 'foo'
    });

    this.owner.register('component:select-box/foo', FooSelectBox);

    await render(hbs`<SelectBox::foo />`);

    assert.ok(
      findAll('.foo').length,
      1,
      'can set the class name prefix to create custom select boxes'
    );
  });

  test('role', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox />`);

    assert.dom('.select-box').doesNotHaveAttribute('role', 'select box has no aria role');
  });

  test('multiple class', async function(assert) {
    assert.expect(2);

    await render(hbs`<SelectBox />`);

    assert.ok(!find('.select-box').classList.contains('is-multiple'), 'no multiple class');

    await render(hbs`<SelectBox @multiple={{true}} />`);

    assert.dom('.select-box').hasClass('is-multiple', 'has multiple class');
  });

  test('initial update action', async function(assert) {
    assert.expect(2);

    let called = 0;

    this.set('updated', value => {
      called++;

      assert.strictEqual(
        value,
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

    this.set('updated', value => {
      count++;

      if (count === 2) {
        assert.strictEqual(value, 'bar', 'fires an update action when the value changes');
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
      'updating attributes other than the `value` should not fire update action'
    );
  });

  test('no update action', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox @onUpdate={{@onUpdate}} @value={{this.value}} />`);

    this.set('value', 'foo');

    assert.ok(
      true,
      'does not blow up when no update action is specified (useful pattern for composing)'
    );
  });

  test('init action', async function(assert) {
    assert.expect(2);

    let api;

    this.set('initialised', sb => (api = sb));

    await render(hbs`<SelectBox @onInit={{this.initialised}} />`);

    assert.ok(!find('.select-box').classList.contains('is-open'), 'precondition, not open');

    api.open();

    await settled();

    assert.dom('.select-box').hasClass('is-open', 'action is called with the api');
  });

  test('api value', async function(assert) {
    assert.expect(8);

    let firstApi;
    let secondApi;

    this.set('value', emberA(['foo']));
    this.set('initialised', sb => (firstApi = sb));
    this.set('updated', (value, sb) => (secondApi = sb));

    await render(hbs`
      <SelectBox
        @value={{this.value}}
        @multiple={{true}}
        @onInit={{this.initialised}}
        @onUpdate={{this.updated}} />
    `);

    assert.ok(!isFrozen(this.value), 'api does not accidentally freeze original value');

    assert.deepEqual(firstApi.value, ['foo'], 'yielded api on init has initial value');

    assert.deepEqual(secondApi.value, ['foo'], 'the initial update action yields the value');

    assert.strictEqual(
      EmberArray.detect(firstApi.value),
      false,
      'the yielded api value is not the original array (or an ember array)'
    );

    assert.ok(isFrozen(secondApi.value), 'is frozen when in multiple mode');

    assert.throws(() => {
      secondApi.foo = 'bar';
    }, 'cannot alter the api');

    this.set('value', emberA(['bar']));

    assert.deepEqual(
      secondApi.value,
      ['bar'],
      'the yielded api reflects any changes to the value attribute'
    );

    await render(hbs`
      <SelectBox
        @value={{this.value}}
        @multiple={{false}}
        @onUpdate={{this.updated}} />
    `);

    this.set('value', { foo: 'bar' });

    assert.ok(!isFrozen(secondApi.value), 'is not frozen when in single mode');
  });

  test('regression test: does not blow up if destroyed', async function(assert) {
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

    await click('.select-box-option');
  });
});
