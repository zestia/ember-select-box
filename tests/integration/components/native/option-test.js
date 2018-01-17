import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('', 'select-box/native/option', {
  integration: true
});


test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/native/option}}`);

  assert.equal(this.$('option.select-box-option').length, 1,
    'renders with correct class name and tag');
});


test('class prefix', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/native/option class-prefix="foo"}}`);

  assert.equal(this.$('.foo-option').length, 1,
    'can override the class prefix');
});


test('title', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/native/option title="Foo"}}`);

  assert.equal(this.$('.select-box-option').attr('title'), 'Foo',
    'a native select box option can have a title attribute');
});


test('disabling', function(assert) {
  assert.expect(2);

  this.set('optionDisabled', true);

  this.render(hbs `{{select-box/native/option disabled=optionDisabled}}`);

  assert.ok(this.$('.select-box-option').is(':disabled'),
    'a native select box option can be disabled');

  this.set('optionDisabled', false);

  assert.ok(this.$('.select-box-option').not(':disabled'),
    'a native select box option can be re-enabled');
});


test('value', function(assert) {
  assert.expect(2);

  this.set('myValue', 123);

  this.render(hbs `{{select-box/native/option value=myValue}}`);

  assert.strictEqual(this.$('.select-box-option').attr('value'), '123',
    'the specified value is set as an HTML attribute');

  this.set('myValue', 456);

  assert.strictEqual(this.$('.select-box-option').attr('value'), '456',
    'changing the value updates the HTML attribute');
});


test('label', function(assert) {
  assert.expect(2);

  this.set('myLabel', 'Foo');

  this.render(hbs `{{select-box/native/option label=myLabel}}`);

  assert.strictEqual(this.$('.select-box-option').text(), 'Foo',
    'renders the label inside the option element');

  this.set('myLabel', 'Bar');

  assert.strictEqual(this.$('.select-box-option').text(), 'Bar',
    'changing the label updates the label inside the option element');
});


test('block label', function(assert) {
  assert.expect(2);

  this.render(hbs `
    {{#select-box/native/option~}}
      Foo
    {{~/select-box/native/option}}
  `);

  assert.strictEqual(this.$('.select-box-option').text(), 'Foo',
    'renders the label inside the option element');

  this.render(hbs `
    {{#select-box/native as |sb|}}
      {{#sb.option label="Bar"}}Foo{{/sb.option}}
    {{/select-box/native}}
  `);

  assert.strictEqual(this.$('.select-box-option').text(), 'Foo',
    'the block takes precedence over a specified label');
});


test('yield', function(assert) {
  assert.expect(1);

  this.set('items', [
    { myValue: 'foo', myLabel: 'Foo' },
    { myValue: 'bar', myLabel: 'Bar' }
  ]);

  this.render(hbs`
    {{#select-box/native as |sb|}}
      {{#each items as |item|}}
        {{#sb.option value=item.myValue label=item.myLabel as |o|~}}
          {{o.label}}={{o.value}}
        {{~/sb.option}}
      {{/each}}
    {{/select-box/native}}
  `);

  assert.ok(
    this.$('.select-box-option:eq(0)').text() === 'Foo=foo' &&
    this.$('.select-box-option:eq(1)').text() === 'Bar=bar',
    'native options can yield their label & value'
  );
});
