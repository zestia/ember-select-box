import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberArray, { A as emberA } from '@ember/array';
const { isFrozen } = Object;

module('select-box (selecting)', function(hooks) {
  setupRenderingTest(hooks);

  test('changing the value attribute', async function(assert) {
    assert.expect(3);

    this.set('selectedValue', 'Foo');

    this.set('selected', () => {
      assert.ok(true,
        'changing the selected value does not trigger a selection');
    });

    await render(hbs`
      {{#select-box on-select=(action selected) value=selectedValue as |sb|}}
        {{sb.option value="Foo"}}
        {{sb.option value="Bar"}}
      {{/select-box}}
    `);

    const $foo = this.$(".select-box-option:contains('Foo')");
    const $bar = this.$(".select-box-option:contains('Bar')");

    assert.ok($foo.hasClass('is-selected') && !$bar.hasClass('is-selected'),
      'the option with the matching value is marked selected');

    this.set('selectedValue', 'Bar');

    assert.ok(!$foo.hasClass('is-selected') && $bar.hasClass('is-selected'),
      'changing the value causes the options to re-compute which is selected');

    this.set('selectedValue', null);

    assert.ok(!$foo.hasClass('is-selected') && !$bar.hasClass('is-selected'),
      'clearing selected value results in no selected options, ' +
      '(and does not result in the first "default" option being selected)');
  });

  test('changing the value attribute to nothing (common misconception)', async function(assert) {
    assert.expect(3);

    this.set('selectedValue', null);

    await render(hbs`
      {{#select-box value=selectedValue as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
      {{/select-box}}
    `);

    assert.equal(this.$('.select-box-option.is-selected').length, 0,
      'precondition: no selected options');

    this.$(".select-box-option:contains('bar')").trigger('click');

    assert.equal(this.$('.select-box-option.is-selected').text(), 'bar',
      'precondition: user has selected an option');

    this.set('selectedValue', null);

    assert.equal(this.$('.select-box-option.is-selected').text(), 'bar',
      'selecting null does not clear the selected option, because technically nothing has ' +
      'changed, so `didReceiveAttrs` will not fire');
  });

  test('click to select option', async function(assert) {
    assert.expect(4);

    let selectedValue;

    this.set('initialSelectedValue', null);

    this.set('selected', value => {
      selectedValue = value;
    });

    await render(hbs`
      {{#select-box
        value=initialSelectedValue
        on-select=(action selected) as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
      {{/select-box}}
    `);

    const $foo = this.$('.select-box-option:eq(0)');
    const $bar = this.$('.select-box-option:eq(1)');

    $foo.trigger('click');

    assert.strictEqual(this.get('initialSelectedValue'), null,
      'does not mutate the initial selected value');

    assert.equal(selectedValue, 'foo',
      'sends an action with the selected value');

    assert.ok($foo.hasClass('is-selected'),
      'the option clicked is marked as selected');

    $bar.trigger('click');

    assert.ok(!$foo.hasClass('is-selected') && $bar.hasClass('is-selected'),
      'clicking another option selects it instead');
  });

  test('selecting the same option more than once', async function(assert) {
    assert.expect(2);

    let selected = 0;
    let updated = 0;
    this.set('selected', () => selected++);
    this.set('updated', () => updated++);

    await render(hbs`
      {{#select-box on-select=(action selected) on-update=(action updated) as |sb|}}
        {{sb.option value="foo"}}
      {{/select-box}}
    `);

    this.$('.select-box-option').trigger('click');
    this.$('.select-box-option').trigger('click');

    assert.equal(selected, 2,
      "sends select action even if selected value hasn't changed");

    assert.equal(updated, 1,
      'sends update action only when value has changed');
  });

  test('selecting more than 1 of the same value', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#select-box as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
        {{sb.option value="bar"}}
      {{/select-box}}
    `);

    const $one = this.$('.select-box-option:eq(1)');
    const $two = this.$('.select-box-option:eq(2)');

    $one.trigger('click');

    assert.ok($one.hasClass('is-selected') && $two.hasClass('is-selected'),
      'all options with matching values are selected, ' +
      'even on a non-multiple select'
    );
  });

  test('selecting multiple options', async function(assert) {
    assert.expect(5);

    const values = ['foo', 'baz'];

    let selectedValues;

    this.set('values', values);
    this.set('selected', values => selectedValues = values);

    await render(hbs`
      {{#select-box on-select=(action selected) multiple=true value=values as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
        {{sb.option value="baz"}}
      {{/select-box}}
    `);

    const $foo = this.$('.select-box-option:eq(0)');
    const $bar = this.$('.select-box-option:eq(1)');

    $bar.trigger('click');

    assert.deepEqual(selectedValues, ['foo', 'baz', 'bar'],
      'selecting a single option adds it to the existing selection');

    assert.strictEqual(EmberArray.detect(selectedValues), false,
      'the values sent out of the component are not an ember array');

    $foo.trigger('click');

    assert.deepEqual(selectedValues, ['baz', 'bar'],
      'selecting an already selected option removes it from the existing selection');

    assert.deepEqual(this.get('values'), ['foo', 'baz'],
      'does not mutate the original array');

    assert.ok(isFrozen(selectedValues),
      'the selected values sent out of the component are frozen');
  });

  test('multiple but with a single value', async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{#select-box multiple=true value="bar" as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
      {{/select-box}}
    `);

    assert.ok(!this.$('.select-box-option:eq(0)').hasClass('is-selected'),
      'not selected');

    assert.ok(this.$('.select-box-option:eq(1)').hasClass('is-selected'),
      'value is coerced to an array and correct option is selected');
  });

  test('press enter to select active option', async function(assert) {
    assert.expect(2);

    this.set('selected', value => {
      assert.equal(value, 'bar',
        'the select box acknowledges the selection');
    });

    this.set('selectedBar', value => {
      assert.equal(value, 'bar',
        'the selected option acknowledges the selection');
    });

    await render(hbs`
      {{#select-box on-select=(action selected) as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar" on-select=(action selectedBar)}}
      {{/select-box}}
    `);

    this.$('.select-box-option:eq(1)').trigger('mouseover');
    await triggerKeyEvent('.select-box', 'keydown', 13);
  });

  test('options with no label', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#select-box as |sb|}}
        {{#sb.option value="foo" as |o|}}
          {{~o.label~}}
        {{/sb.option}}
      {{/select-box}}
    `);

    assert.equal(this.$('.select-box-option:eq(0)').text(), 'foo',
      "a select box option's label defaults to it's value");
  });

  test('selecting via the api', async function(assert) {
    assert.expect(4);

    let selected;
    let selectedFoo;
    let updated;

    this.set('selected', value => selected = value);
    this.set('selectedFoo', value => selectedFoo = value);
    this.set('updated', value => updated = value);

    await render(hbs`
      {{#select-box on-select=(action selected) on-update=(action updated) as |sb|}}
        {{sb.option value="foo" on-select=(action selectedFoo)}}
        <button onclick={{action sb.select "foo"}}>Select foo</button>
      {{/select-box}}
    `);

    this.$('button').trigger('click');

    assert.strictEqual(selected, 'foo',
      'the select box acknowledges the selection and sends an action');

    assert.strictEqual(selectedFoo, undefined,
      'the option does not fire its on-select action');

    assert.strictEqual(updated, undefined,
      'has not updated yet');

    await settled();

    assert.strictEqual(updated, 'foo',
      'fires the on update action after the selection has been made');
  });

  test('updating via the api', async function(assert) {
    assert.expect(5);

    let updated;
    let selected;

    this.set('updated', value => updated = value);
    this.set('selected', value => selected = value);

    await render(hbs`
      {{#select-box on-update=(action updated) on-select=(action selected) as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
        <button onclick={{action sb.update "foo"}}>Select foo</button>
        <button onclick={{action sb.update "bar"}}>Select bar</button>
      {{/select-box}}
    `);

    this.$('button:eq(1)').trigger('click');

    assert.strictEqual(updated, undefined,
      'has not fired an updated action');

    assert.strictEqual(selected, undefined,
      'has not fired a selected action');

    assert.equal(this.$('.select-box-option.is-selected').text(), 'bar',
      "select box's internal value is updated with the value");

    await settled();

    assert.strictEqual(updated, 'bar',
      'fires the on-update action after the value has been updated');

    assert.strictEqual(selected, undefined,
      'does not fire the select action');
  });

  test('manual selection', async function(assert) {
    assert.expect(3);

    await render(hbs`
      {{#select-box value="baz" as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar" selected=true}}
        {{sb.option value="baz" selected=false}}
      {{/select-box}}
    `);

    const $bar = this.$(".select-box-option:contains('bar')");
    const $baz = this.$(".select-box-option:contains('baz')");

    assert.ok($bar.hasClass('is-selected'),
      'manually selected options are selected');

    assert.ok(!$baz.hasClass('is-selected'),
      'initially selected options are not selected if manually overridden');

    this.set('barSelected', true);

    await render(hbs`
      {{#select-box as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar" selected=barSelected}}
        {{sb.option value="baz"}}
      {{/select-box}}
    `);

    this.set('barSelected', false);

    assert.equal(this.$('.select-box-option.is-selected').length, 0,
      'can manually deselect an option');
  });

  test('usage with mut helper', async function(assert) {
    assert.expect(2);

    this.set('external', null);

    await render(hbs`
      external: {{external}}
      {{#select-box on-select=(action (mut external)) as |sb|}}
        internal: {{sb.value}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
      {{/select-box}}
    `);

    this.$('.select-box-option:contains("bar")').trigger('click');

    assert.ok(this.$().text().match('external: bar'),
      'mut helper updates the external value');

    assert.ok(this.$('.select-box').text().match('internal: bar'),
      'internal value is updated (regression test)');
  });

  test('with disabled options', async function(assert) {
    assert.expect(2);

    let selected = 0;

    this.set('selected', () => {
      selected++;
    });

    await render(hbs`
      {{#select-box value="foo" on-select=(action selected) as |sb|}}
        {{sb.option value="foo" disabled=true}}
        {{sb.option value="bar"}}
      {{/select-box}}
    `);

    this.$('.select-box-option.is-disabled').trigger('click');

    assert.ok(this.$('.select-box-option.is-disabled').hasClass('is-selected'),
      'still computes whether or not the option is selected based on the value');

    assert.equal(selected, 0,
      'does not fire select action if option is disabled');
  });

  test('changing attributes other than value', async function(assert) {
    assert.expect(1);

    let updated = 0;

    this.set('updated', () => {
      updated++;
    });

    await render(hbs`
      {{#select-box value="foo" aria-label=ariaLabel on-update=(action updated) as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
      {{/select-box}}
    `);

    this.set('ariaLabel', 'Choice');

    await settled();

    assert.equal(updated, 1,
      "does not fire update action when the value hasn't actually updated");
  });

  test('a single value with a multiple choice select box', async function(assert) {
    assert.expect(2);

    this.set('value', 'bar');

    await render(hbs`
      {{#select-box value=value multiple=true as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
      {{/select-box}}
    `);

    assert.equal(this.$('.select-box-option.is-selected').text(), 'bar',
      'works as expected');

    this.set('value', 'foo');

    assert.equal(this.$('.select-box-option.is-selected').text(), 'foo',
      'updating the value works');
  });

  test('multiple values with a single choice select box', async function(assert) {
    assert.expect(1);

    this.set('values', ['bar', 'baz']);

    await render(hbs`
      {{#select-box value=values as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
        {{sb.option value="baz"}}
      {{/select-box}}
    `);

    assert.equal(this.$('.select-box-option.is-selected').length, 0,
      'works as expected');
  });

  test('adding and removing items to a multiple select box', async function(assert) {
    assert.expect(1);

    this.set('values', emberA(['bar']));

    await render(hbs`
      {{#select-box value=values multiple=true as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
        {{sb.option value="baz"}}
      {{/select-box}}
    `);

    this.get('values').addObject('baz');

    assert.equal(this.$('.select-box-option.is-selected').length, 1,
      'changes to the multiple choice values does not update the select box ' +
      'the entire array must be replaced (the value should be considered a _new_ value)');
  });

  test('yielded selected value', async function(assert) {
    assert.expect(3);

    let yieldedValue;

    this.set('value', emberA(['foo', 'bar']));

    this.set('inspect', value => yieldedValue = value);

    await render(hbs`
      {{#select-box multiple=true value=value as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
        <button onclick={{action inspect sb.value}}>inspect</button>
      {{/select-box}}
    `);

    this.$('button').trigger('click');

    assert.throws(() => yieldedValue.push('baz'));

    assert.ok(isFrozen(yieldedValue),
      'yields frozen value in template');

    assert.strictEqual(EmberArray.detect(yieldedValue), false,
      'the yielded api value is not the original array (or an ember array)');
  });

  test('customising selection', async function(assert) {
    assert.expect(9);

    let sb;
    let arg1;
    let arg2;
    let calledBuild = 0;

    this.set('value', ['foo', 'bar']);

    this.set('buildSelection', (value1, value2) => {
      calledBuild++;

      arg1 = value1;
      arg2 = value2;

      return ['baz'];
    });

    this.set('register', api => {
      sb = api;
    });

    await render(hbs`
      {{#select-box
        multiple=true
        value=value
        on-build-selection=(action buildSelection)
        on-init=(action register) as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
        {{sb.option value="baz"}}
        {{sb.option value="qux"}}
      {{/select-box}}
    `);

    this.$('.select-box-option:eq(0)').trigger('click');

    assert.equal(this.$('.select-box-option.is-selected').text(), 'baz',
      'selection used is the selection returned from on-build-selection');

    await settled();

    assert.deepEqual(sb.value, ['baz'],
      'value is correct');

    assert.strictEqual(arg1, 'foo',
      'first argument is the value selected');

    assert.deepEqual(arg2, ['foo', 'bar'],
      'second argument is the currently selected value');

    sb.update(['bar']);

    await settled();

    assert.equal(calledBuild, 1,
      'updating the selected value via the api does not trigger build selection');

    assert.equal(this.$('.select-box-option.is-selected').text(), 'bar',
      'update still works');

    sb.select(['qux']);

    await settled();

    assert.equal(calledBuild, 1,
      'selecting a selected value via the api does not trigger build selection');

    assert.equal(this.$('.select-box-option.is-selected').text(), 'qux',
      'select still works');

    assert.deepEqual(sb.value, ['qux'],
      'value is correct');
  });
});
