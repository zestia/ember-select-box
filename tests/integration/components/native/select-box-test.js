import { moduleForComponent, test } from 'ember-qunit';
import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('', 'select-box/native', {
  integration: true
});


test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/native}}`);

  assert.equal(this.$('select.select-box').length, 1,
    'renders with correct class name and tag');
});


test('class prefix', function(assert) {
  assert.expect(2);

  this.render(hbs `{{select-box/native class-prefix='foo'}}`);

  assert.equal(this.$('.foo').length, 1,
    'can override the class prefix');

  this.render(hbs `
    {{#select-box/native class-prefix='foo' as |sb|}}
      {{#sb.group}}
        {{sb.option}}
      {{/sb.group}}
    {{/select-box/native}}
  `);

  assert.ok(
    this.$('.foo-group').length === 1 &&
    this.$('.foo-option').length === 1,
    'class prefix trickles down to children'
  );
});


test('name', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/native name='foo'}}`);

  assert.equal(this.$('.select-box').attr('name'), 'foo',
    'can set a name attribute');
});


test('title', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/native title='foo'}}`);

  assert.equal(this.$('.select-box').attr('title'), 'foo',
    'can set a title attribute');
});


test('aria label', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/native aria-label='Something'}}`);

  assert.equal(this.$('.select-box').attr('aria-label'), 'Something',
    'setting the aria label works');
});


test('autofocus', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/native autofocus=true}}`);

  assert.equal(this.$('.select-box').prop('autofocus'), true,
    'can autofocus a native select box');
});


test('required', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/native required=true}}`);

  assert.equal(this.$('.select-box').prop('required'), true,
    'can set the required attribute');
});


test('disabling', function(assert) {
  assert.expect(3);

  this.render(hbs `{{select-box/native}}`);

  assert.ok(this.$('.select-box').not(':disabled'),
    'enabled by default');

  this.set('isDisabled', true);

  this.render(hbs `{{select-box/native disabled=isDisabled}}`);

  assert.ok(this.$('.select-box').is(':disabled'),
    'can be disabled');

  this.set('isDisabled', false);

  assert.ok(this.$('.select-box').not(':disabled'),
    'can be re-enabled');
});


test('tabindex', function(assert) {
  assert.expect(2);

  this.render(hbs `{{select-box/native}}`);

  assert.strictEqual(this.$('.select-box').attr('tabindex'), undefined,
    'default tabindex');

  this.render(hbs `{{select-box/native tabindex=5}}`);

  assert.strictEqual(this.$('.select-box').attr('tabindex'), '5',
    'can specify a tabindex attribute');
});


test('size', function(assert) {
  assert.expect(2);

  this.render(hbs `{{select-box/native}}`);

  assert.strictEqual(this.$('.select-box').attr('size'), undefined,
    'default size');

  this.render(hbs `{{select-box/native size=2}}`);

  assert.strictEqual(this.$('.select-box').attr('size'), '2',
    'can specify a size attribute');
});


test('changing the selected value', function(assert) {
  assert.expect(3);

  this.set('selectedValue', 'foo');

  this.render(hbs`
    {{#select-box/native value=selectedValue as |sb|}}
      {{sb.option value='foo'}}
      {{sb.option value='bar'}}
    {{/select-box/native}}
  `);

  const $foo = this.$(".select-box-option[value='foo']");
  const $bar = this.$(".select-box-option[value='bar']");

  assert.ok($foo.is(':selected') && $bar.not(':selected'),
    'the option with the matching value is selected initially');

  this.set('selectedValue', 'bar');

  assert.ok($foo.not(':selected') && $bar.is(':selected'),
    'changing the value causes the options to re-compute which is selected');

  this.set('selectedValue', null);

  assert.ok($foo.is(':selected') && $bar.not(':selected'),
    'setting no value results in the first option being selected');
});


test('change event selects an option', function(assert) {
  assert.expect(3);

  this.set('initialSelectedValue', null);
  this.set('selectedValue', null);

  this.on('selected', value => {
    this.set('selectedValue', value);
  });

  this.render(hbs`
    {{#select-box/native
      value=initialSelectedValue
      on-select=(action 'selected') as |sb|}}
      {{sb.option value='foo'}}
      {{sb.option value='bar'}}
      {{sb.option value='baz'}}
    {{/select-box/native}}
  `);

  this.$('.select-box').val('bar').trigger('change');

  assert.strictEqual(this.get('initialSelectedValue'), null,
    'does not mutate the initial selected value');

  assert.equal(this.get('selectedValue'), 'bar',
    'sends an action with the selected value');

  assert.ok(this.$('.select-box-option:eq(1)').is(':selected'),
    'renders the correct selected option');
});


test('usage with mut helper', function(assert) {
  assert.expect(1);

  this.set('selectedValue', 'bar');

  this.render(hbs`
    {{#select-box/native
      value=selectedValue
      on-select=(action (mut selectedValue)) as |sb|}}
      {{sb.option value='foo'}}
      {{sb.option value='bar'}}
      {{sb.option value='baz'}}
    {{/select-box/native}}
  `);

  this.$('.select-box').val('foo').trigger('change');

  assert.equal(this.get('selectedValue'), 'foo',
    'can be used with the mut helper');
});


test('usage with unbound helper', function(assert) {
  assert.expect(1);

  this.set('selectedValue', 'foo');

  this.render(hbs`
    {{#select-box/native value=(unbound selectedValue) as |sb|}}
      {{sb.option value='foo'}}
      {{sb.option value='bar'}}
      {{sb.option value='baz'}}
    {{/select-box/native}}
  `);

  this.set('selectedValue', 'bar');

  assert.equal(this.$('.select-box').val(), 'foo',
    'value should not change');
});


test('multiple selection', function(assert) {
  assert.expect(2);

  this.on('selected', value => {
    assert.deepEqual(value, ['foo', 'bar'],
      'sends an action with the values of the selected options');
  });

  this.render(hbs`
    {{#select-box/native multiple=true on-select=(action 'selected') as |sb|}}
      {{sb.option value='foo'}}
      {{sb.option value='bar'}}
      {{sb.option value='baz'}}
    {{/select-box/native}}
  `);

  this.$('.select-box').val(['foo', 'bar']).trigger('change');

  assert.deepEqual(this.$('.select-box').val(), ['foo', 'bar'],
    'the select box reports that the expected options are selected');
});


test('selecting non primitives', function(assert) {
  assert.expect(1);

  this.set('foo', ['foo']);
  this.set('bar', { bar: 'baz' });

  this.on('selected', value => {
    assert.deepEqual(value, [['foo'], { bar: 'baz' }],
      'can select options with non primitive values');
  });

  this.render(hbs`
    {{#select-box/native multiple=true on-select=(action 'selected') as |sb|}}
      {{sb.option value=foo}}
      {{sb.option value=bar}}
    {{/select-box/native}}
  `);

  this.$('.select-box-option').prop('selected', true);
  this.$('.select-box').trigger('change');
});


test('options with no label', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#select-box/native as |sb|}}
      {{#sb.option value='foo' as |o|}}
        {{~o.label~}}
      {{/sb.option}}
    {{/select-box/native}}
  `);

  assert.equal(this.$('.select-box-option:eq(0)').text(), 'foo',
    "a native select box option's label defaults to it's value");
});


test('manual selection (initial value)', function(assert) {
  assert.expect(1);

  this.set('barSelected', true);

  this.render(hbs`
    {{#select-box/native value='baz' as |sb|}}
      {{sb.option value='foo' selected=false}}
      {{sb.option value='bar' selected=true}}
      {{sb.option value='baz' selected=false}}
    {{/select-box/native}}
  `);

  assert.equal(this.$('.select-box').val(), 'bar',
    'manually selected values take priority over the initial value');
});


test('manual selection (multiple values)', function(assert) {
  assert.expect(2);

  this.set('barSelected', true);

  this.render(hbs`
    {{#select-box/native multiple=true as |sb|}}
      {{sb.option value='foo'}}
      {{sb.option value='bar' selected=barSelected}}
      {{sb.option value='baz' selected=bazSelected}}
    {{/select-box/native}}
  `);

  assert.deepEqual(this.$('.select-box').val(), ['bar'],
    'can manually specify a selected value');

  this.set('bazSelected', true);

  assert.deepEqual(this.$('.select-box').val(), ['bar', 'baz'],
    'can manually select multiple values');
});


test('non-component options (single)', function(assert) {
  assert.expect(2);

  this.set('nonPrimitive', { id: 456 });
  this.set('primitive', 123);

  this.on('selected', value => {
    assert.strictEqual(value, '123',
      'can select primitive values');
  });

  this.render(hbs`
    {{#select-box/native on-select=(action 'selected') as |sb|}}
      <option value={{nonPrimitive}}>Primitive</option>
      <option value={{primitive}}>Primitive</option>
    {{/select-box/native}}
  `);

  assert.equal(this.$('option:eq(0)').attr('value'), '[object Object]',
    'non primitive values are stringified');

  this.$('.select-box').val('123').trigger('change');
});


test('non-component options (multiple)', function(assert) {
  assert.expect(1);

  this.on('selected', values => {
    assert.deepEqual(values, ['Hello', 'World'],
      'can select multiple values from non-component options');
  });

  this.render(hbs`
    {{#select-box/native multiple=true on-select=(action 'selected') as |sb|}}
      <option value="Hello"></option>
      <option value="World"></option>
    {{/select-box/native}}
  `);

  this.$('.select-box').val(['Hello', 'World']).trigger('change');
});


test('non-component options (mixed)', function(assert) {
  assert.expect(1);

  this.on('selected', values => {
    assert.deepEqual(values, ['foo'],
      'non-component options are ignored if option components are registered');
  });

  this.render(hbs`
    {{#select-box/native multiple=true on-select=(action 'selected') as |sb|}}
      {{sb.option value="foo"}}
      <option value="bar"></option>
    {{/select-box/native}}
  `);

  this.$('.select-box').val(['foo', 'bar']).trigger('change');
});


test('initial update action', function(assert) {
  assert.expect(1);

  const FooSelectBox = Component.extend({
    layout: hbs`
      <div class="foo-select-display-label">
        {{displayLabel}}
      </div>
      {{#select-box/native
        value=value
        on-update=(action 'updateDisplayLabel') as |sb|}}
        {{yield sb}}
      {{/select-box/native}}
    `,
    actions: {
      updateDisplayLabel() {
        this.set('displayLabel', this.$('option:selected').text());
      }
    }
  });

  this.registry.register('component:select-box/foo', FooSelectBox);

  this.render(hbs`
    {{#select-box/foo value='bar' as |sb|}}
      {{sb.option value='foo'}}
      {{sb.option value='bar'}}
      {{sb.option value='baz'}}
    {{/select-box/foo}}
  `);

  assert.equal(this.$('.foo-select-display-label').text().trim(), 'bar',
    'regression test: the update action is fired after all options have ' +
    'rendered');
});
