import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

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
      'setting no value does not result in the first option being selected');
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
    assert.expect(2);

    this.set('selected', value => {
      this.set('selectedValue', value);
    });

    await render(hbs`
      {{#select-box on-select=(action selected) multiple=true as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
      {{/select-box}}
    `);

    const $one = this.$('.select-box-option:eq(0)');
    const $two = this.$('.select-box-option:eq(1)');

    $one.trigger('click');

    assert.deepEqual(this.get('selectedValue'), ['foo'],
      'selecting a single option coerces the value to an array');

    $two.trigger('click');

    assert.deepEqual(this.get('selectedValue'), ['bar'],
      'selecting another single option does not add to the existing selection' +
      'behaviour is undefined, developers to customise?');
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
    assert.expect(1);

    this.set('selected', value => {
      assert.equal(value, 'foo',
        'the select box acknowledges the selection');
    });

    this.set('selectedFoo', () => {
      assert.ok(true,
        'the selected option does not fire a on-select action');
    });

    await render(hbs`
      {{#select-box on-select=(action selected) as |sb|}}
        {{sb.option value="foo" on-select=(action selectedFoo)}}
        <button onclick={{action sb.select "foo"}}>
          Select foo
        </button>
      {{/select-box}}
    `);

    this.$('button').trigger('click');
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
});
