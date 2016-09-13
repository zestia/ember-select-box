import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import events from '../../../helpers/keyboard-events';

moduleForComponent('', 'select-box (selecting)', {
  integration: true
});


test('changing the value attribute', function(assert) {
  assert.expect(3);

  this.set('selectedValue', 'Foo');

  this.on('selected', () => {
    assert.ok(true,
      'changing the selected value does not trigger a selection');
  });

  this.render(hbs`
    {{#select-box on-select=(action 'selected') value=selectedValue as |sb|}}
      {{sb.option value='Foo'}}
      {{sb.option value='Bar'}}
    {{/select-box}}
  `);

  let $foo = this.$(".select-box-option:contains('Foo')");
  let $bar = this.$(".select-box-option:contains('Bar')");

  assert.ok($foo.hasClass('is-selected') && !$bar.hasClass('is-selected'),
    'the option with the matching value is marked selected');

  this.set('selectedValue', 'Bar');

  assert.ok(!$foo.hasClass('is-selected') && $bar.hasClass('is-selected'),
    'changing the value causes the options to re-compute which is selected');

  this.set('selectedValue', null);

  assert.ok(!$foo.hasClass('is-selected') && !$bar.hasClass('is-selected'),
    "setting no value does not result in the first option being selected");
});


test('click to select option', function(assert) {
  assert.expect(4);

  let selectedValue;

  this.set('initialSelectedValue', null);

  this.on('selected', (value) => {
    selectedValue = value;
  });

  this.render(hbs`
    {{#select-box
      value=initialSelectedValue
      on-select=(action 'selected') as |sb|}}
      {{sb.option value='foo'}}
      {{sb.option value='bar'}}
    {{/select-box}}
  `);

  let $foo = this.$('.select-box-option:eq(0)');
  let $bar = this.$('.select-box-option:eq(1)');

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


test('selecting more than 1 of the same value', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#select-box as |sb|}}
      {{sb.option value='foo'}}
      {{sb.option value='bar'}}
      {{sb.option value='bar'}}
    {{/select-box}}
  `);

  let $one = this.$('.select-box-option:eq(1)');
  let $two = this.$('.select-box-option:eq(2)');

  $one.trigger('click');

  assert.ok($one.hasClass('is-selected') && $two.hasClass('is-selected'),
    'all options with matching values are selected, ' +
    'even on a non-multiple select'
  );
});


test('selecting multiple options', function(assert) {
  assert.expect(2);

  this.on('selected', (value) => {
    this.set('selectedValue', value);
  });

  this.render(hbs`
    {{#select-box on-select=(action 'selected') multiple=true as |sb|}}
      {{sb.option value='foo'}}
      {{sb.option value='bar'}}
    {{/select-box}}
  `);

  let $one = this.$('.select-box-option:eq(0)');
  let $two = this.$('.select-box-option:eq(1)');

  $one.trigger('click');

  assert.deepEqual(this.get('selectedValue'), ['foo'],
    'selecting a single option coerces the value to an array');

  $two.trigger('click');

  assert.deepEqual(this.get('selectedValue'), ['bar'],
    'selecting another single option does not add to the existing selection' +
    'behaviour is undefined, developers to customise?');
});


test('press enter to select active option', function(assert) {
  assert.expect(2);

  this.on('selected', (value) => {
    assert.equal(value, 'bar',
      'the select box acknowledges the selection');
  });

  this.on('selectedBar', (value) => {
    assert.equal(value, 'bar',
      'the selected option acknowledges the selection');
  });

  this.render(hbs`
    {{#select-box on-select=(action 'selected') as |sb|}}
      {{sb.option value='foo'}}
      {{sb.option value='bar' on-select=(action 'selectedBar')}}
    {{/select-box}}
  `);

  this.$('.select-box-option:eq(1)').trigger('mouseover');
  this.$('.select-box').trigger(events.enter());
});


test('options with no label', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#select-box as |sb|}}
      {{#sb.option value='foo' as |o|}}
        {{~o.label~}}
      {{/sb.option}}
    {{/select-box}}
  `);

  assert.equal(this.$('.select-box-option:eq(0)').text(), 'foo',
    "a select box option's label defaults to it's value");
});


test('selecting via the api', function(assert) {
  assert.expect(1);

  this.on('selected', (value) => {
    assert.equal(value, 'foo',
      'the select box acknowledges the selection');
  });

  this.on('selectedFoo', () => {
    assert.ok(true,
      'the selected option does not fire a on-select action');
  });

  this.render(hbs`
    {{#select-box on-select=(action 'selected') as |sb|}}
      {{sb.option value='foo' on-select=(action 'selectedFoo')}}
      <button onclick={{action sb.select 'foo'}}>
        Select foo
      </button>
    {{/select-box}}
  `);

  this.$('button').trigger('click');
});


test('manual selection', function(assert) {
  assert.expect(3);

  this.render(hbs`
    {{#select-box value='baz' as |sb|}}
      {{sb.option value='foo'}}
      {{sb.option value='bar' selected=true}}
      {{sb.option value='baz' selected=false}}
    {{/select-box}}
  `);

  let $bar = this.$(".select-box-option:contains('bar')");
  let $baz = this.$(".select-box-option:contains('baz')");

  assert.ok($bar.hasClass('is-selected'),
    'manually selected options are selected');

  assert.ok(!$baz.hasClass('is-selected'),
    'initially selected options are not selected if manually overridden');

  this.set('barSelected', true);

  this.render(hbs`
    {{#select-box as |sb|}}
      {{sb.option value='foo'}}
      {{sb.option value='bar' selected=barSelected}}
      {{sb.option value='baz'}}
    {{/select-box}}
  `);

  this.set('barSelected', false);

  assert.equal(this.$('.select-box-option.is-selected').length, 0,
    'can manually deselect an option');
});

