import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll, fillIn } from '@ember/test-helpers';
import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';
import {
  getNativeMultipleSelectBoxValue,
  selectNativeOptionsByValue,
  selectNativeOptionsByLabel
} from '@zestia/ember-select-box/utils/select-box/test-helpers';

module('native-select-box', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`{{native-select-box}}`);

    assert.dom('select.select-box').exists({ count: 1 }, 'renders with correct class name and tag');
  });

  test('class prefix', async function(assert) {
    assert.expect(2);

    await render(hbs`{{native-select-box classNamePrefix="foo"}}`);

    assert.dom('.foo').exists({ count: 1 }, 'can override the class prefix');

    await render(hbs`
      {{#native-select-box classNamePrefix="foo" as |sb|}}
        {{#sb.group}}
          {{sb.option}}
        {{/sb.group}}
      {{/native-select-box}}
    `);

    assert.ok(
      findAll('.foo-group').length === 1 && findAll('.foo-option').length === 1,
      'class prefix trickles down to children'
    );
  });

  test('name', async function(assert) {
    assert.expect(1);

    await render(hbs`{{native-select-box name="foo"}}`);

    assert.dom('.select-box').hasAttribute('name', 'foo', 'can set a name attribute');
  });

  test('title', async function(assert) {
    assert.expect(1);

    await render(hbs`{{native-select-box title="foo"}}`);

    assert.dom('.select-box').hasAttribute('title', 'foo', 'can set a title attribute');
  });

  test('aria label', async function(assert) {
    assert.expect(1);

    await render(hbs`{{native-select-box aria-label="Something"}}`);

    assert
      .dom('.select-box')
      .hasAttribute('aria-label', 'Something', 'setting the aria label works');
  });

  test('autofocus', async function(assert) {
    assert.expect(1);

    await render(hbs`{{native-select-box autofocus=true}}`);

    assert.ok(find('.select-box').hasAttribute('autofocus'), 'can autofocus a native select box');
  });

  test('required', async function(assert) {
    assert.expect(1);

    await render(hbs`{{native-select-box required=true}}`);

    assert.ok(find('.select-box').hasAttribute('required'), 'can set the required attribute');
  });

  test('disabling', async function(assert) {
    assert.expect(3);

    await render(hbs`{{native-select-box}}`);

    assert.ok(!find('.select-box').hasAttribute('disabled'), 'enabled by default');

    this.set('isDisabled', true);

    await render(hbs`{{native-select-box disabled=this.isDisabled}}`);

    assert.ok(find('.select-box').hasAttribute('disabled'), 'can be disabled');

    this.set('isDisabled', false);

    assert.ok(!find('.select-box').hasAttribute('disabled'), 'can be re-enabled');
  });

  test('tabindex', async function(assert) {
    assert.expect(2);

    await render(hbs`{{native-select-box}}`);

    assert.strictEqual(find('.select-box').getAttribute('tabindex'), null, 'default tabindex');

    await render(hbs`{{native-select-box tabindex=5}}`);

    assert.strictEqual(
      find('.select-box').getAttribute('tabindex'),
      '5',
      'can specify a tabindex attribute'
    );
  });

  test('size', async function(assert) {
    assert.expect(2);

    await render(hbs`{{native-select-box}}`);

    assert.strictEqual(find('.select-box').getAttribute('size'), null, 'default size');

    await render(hbs`{{native-select-box size=2}}`);

    assert.strictEqual(
      find('.select-box').getAttribute('size'),
      '2',
      'can specify a size attribute'
    );
  });

  test('changing the selected value', async function(assert) {
    assert.expect(3);

    this.set('selectedValue', 'foo');

    await render(hbs`
      {{#native-select-box value=this.selectedValue as |sb|}}
        {{#sb.option value="foo"}}Foo{{/sb.option}}
        {{#sb.option value="bar"}}Bar{{/sb.option}}
      {{/native-select-box}}
    `);

    const foo = find('.select-box-option[value="foo"]');
    const bar = find('.select-box-option[value="bar"]');

    assert.ok(
      foo.selected && !bar.selected,
      'the option with the matching value is selected initially'
    );

    this.set('selectedValue', 'bar');

    assert.ok(
      !foo.selected && bar.selected,
      'changing the value causes the options to re-compute which is selected'
    );

    this.set('selectedValue', null);

    assert.ok(
      foo.selected && !bar.selected,
      'setting no value results in the first option being selected'
    );
  });

  test('change event selects an option', async function(assert) {
    assert.expect(3);

    this.set('initialSelectedValue', null);
    this.set('selectedValue', null);

    this.set('selected', value => {
      this.set('selectedValue', value);
    });

    await render(hbs`
      {{#native-select-box
        value=this.initialSelectedValue
        onSelect=this.selected as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
        {{sb.option value="baz"}}
      {{/native-select-box}}
    `);

    await fillIn('.select-box', 'bar');

    assert.strictEqual(
      this.initialSelectedValue,
      null,
      'does not mutate the initial selected value'
    );

    assert.equal(this.selectedValue, 'bar', 'sends an action with the selected value');

    assert.ok(findAll('.select-box-option')[1].selected, 'renders the correct selected option');
  });

  test('usage with mut helper', async function(assert) {
    assert.expect(1);

    this.set('selectedValue', 'bar');

    await render(hbs`
      {{#native-select-box
        value=this.selectedValue
        onSelect=(action (mut this.selectedValue)) as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
        {{sb.option value="baz"}}
      {{/native-select-box}}
    `);

    await fillIn('.select-box', 'foo');

    assert.equal(this.selectedValue, 'foo', 'can be used with the mut helper');
  });

  test('usage with unbound helper', async function(assert) {
    assert.expect(1);

    this.set('selectedValue', 'foo');

    await render(hbs`
      {{! template-lint-disable no-unbound }}
      {{#native-select-box value=(unbound this.selectedValue) as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
        {{sb.option value="baz"}}
      {{/native-select-box}}
    `);

    this.set('selectedValue', 'bar');

    assert.dom('.select-box').hasValue('foo', 'value should not change');
  });

  test('selecting non primitives', async function(assert) {
    assert.expect(1);

    this.set('foo', ['foo']);
    this.set('bar', { bar: 'baz' });

    this.set('selected', value => {
      assert.deepEqual(
        value,
        [['foo'], { bar: 'baz' }],
        'can select options with non primitive values'
      );
    });

    await render(hbs`
      {{#native-select-box multiple=true onSelect=this.selected as |sb|}}
        {{#sb.option value=this.foo}}Foo{{/sb.option}}
        {{#sb.option value=this.bar}}Bar{{/sb.option}}
      {{/native-select-box}}
    `);

    await selectNativeOptionsByLabel('.select-box', ['Foo', 'Bar']);
  });

  test('manual selection (initial value)', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#native-select-box value="baz" as |sb|}}
        {{sb.option value="foo" selected=false}}
        {{sb.option value="bar" selected=true}}
        {{sb.option value="baz" selected=false}}
      {{/native-select-box}}
    `);

    assert
      .dom('.select-box')
      .hasValue('bar', 'manually selected values take priority over the initial value');
  });

  test('manual selection (multiple values)', async function(assert) {
    assert.expect(2);

    this.set('barSelected', true);

    await render(hbs`
      {{#native-select-box multiple=true as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar" selected=this.barSelected}}
        {{sb.option value="baz" selected=this.bazSelected}}
      {{/native-select-box}}
    `);

    assert.deepEqual(
      getNativeMultipleSelectBoxValue('.select-box'),
      ['bar'],
      'can manually specify a selected value'
    );

    this.set('bazSelected', true);

    assert.deepEqual(
      getNativeMultipleSelectBoxValue('.select-box'),
      ['bar', 'baz'],
      'can manually select multiple values'
    );
  });

  test('non-component options (single)', async function(assert) {
    assert.expect(2);

    this.set('nonPrimitive', { id: 456 });
    this.set('primitive', 123);

    this.set('selected', value => {
      assert.strictEqual(value, '123', 'can select primitive values');
    });

    await render(hbs`
      {{#native-select-box onSelect=this.selected}}
        <option value={{this.nonPrimitive}}>Primitive</option>
        <option value={{this.primitive}}>Primitive</option>
      {{/native-select-box}}
    `);

    assert.equal(
      findAll('option')[0].getAttribute('value'),
      '[object Object]',
      'non primitive values are stringified'
    );

    await fillIn('.select-box', '123');
  });

  test('non-component options (multiple)', async function(assert) {
    assert.expect(1);

    this.set('selected', values => {
      assert.deepEqual(
        values,
        ['Hello', 'World'],
        'can select multiple values from non-component options'
      );
    });

    await render(hbs`
      {{#native-select-box multiple=true onSelect=this.selected}}
        <option value="Hello"></option>
        <option value="World"></option>
      {{/native-select-box}}
    `);

    await selectNativeOptionsByValue('.select-box', ['Hello', 'World']);
  });

  test('non-component options (mixed)', async function(assert) {
    assert.expect(1);

    this.set('selected', values => {
      assert.deepEqual(
        values,
        ['foo'],
        'non-component options are ignored if option components are registered'
      );
    });

    await render(hbs`
      {{#native-select-box multiple=true onSelect=this.selected as |sb|}}
        {{sb.option value="foo"}}
        <option value="bar"></option>
      {{/native-select-box}}
    `);

    await selectNativeOptionsByValue('.select-box', ['foo', 'bar']);
  });

  test('initial update action', async function(assert) {
    assert.expect(1);

    const layout = hbs`
      <div class="foo-select-display-label">
        {{~this.displayLabel~}}
      </div>
      {{#native-select-box
        value=@value
        onUpdate=(action "updateDisplayLabel") as |sb|}}
        {{yield sb}}
      {{/native-select-box}}
    `;

    const FooSelectBox = Component.extend({
      layout,
      actions: {
        updateDisplayLabel() {
          const label = this.element.querySelector('option:checked').textContent.trim();

          this.set('displayLabel', label);
        }
      }
    });

    this.owner.register('component:select-box/foo', FooSelectBox);

    await render(hbs`
      {{#select-box/foo value="bar" as |sb|}}
        {{#sb.option value="foo"}}Foo{{/sb.option}}
        {{#sb.option value="bar"}}Bar{{/sb.option}}
        {{#sb.option value="baz"}}Baz{{/sb.option}}
      {{/select-box/foo}}
    `);

    assert
      .dom('.foo-select-display-label')
      .hasText(
        'Bar',
        'regression test: the update action is fired after all options have rendered'
      );
  });

  test('customising selection', async function(assert) {
    assert.expect(1);

    let count = 0;

    this.set('buildSelection', () => count++);

    await render(hbs`
      {{#native-select-box onBuildSelection=this.buildSelection as |sb|}}
        {{sb.option value="foo"}}
      {{/native-select-box}}
    `);

    await fillIn('.select-box', 'foo');

    assert.equal(count, 0, 'onBuildSelection does not fire on native select components');
  });

  test('no values', async function(assert) {
    assert.expect(2);

    let selectedValue;

    this.set('selected', value => (selectedValue = value));

    await render(hbs`
      {{#native-select-box onSelect=this.selected as |sb|}}
        {{#sb.option}}foo{{/sb.option}}
      {{/native-select-box}}
    `);

    await fillIn('.select-box', 'foo');

    assert.strictEqual(
      selectedValue,
      undefined,
      "'label' is not considered the option's value with component option"
    );

    await render(hbs`
      {{#native-select-box onSelect=this.selected}}
        <option>foo</option>
      {{/native-select-box}}
    `);

    await fillIn('.select-box', 'foo');

    assert.strictEqual(
      selectedValue,
      'foo',
      "'label' is considered the option's value with native element"
    );
  });

  test('default values', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#native-select-box as |sb|}}
        {{sb.option}}
        {{sb.option}}
        {{sb.option}}
      {{/native-select-box}}
    `);

    assert.ok(
      !findAll('.select-box-option')[0].selected &&
        !findAll('.select-box-option')[1].selected &&
        findAll('.select-box-option')[2].selected,
      'single value native select considers the last option as the selected one'
    );
  });
});
