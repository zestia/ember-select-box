import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import events from '../../helpers/keyboard-events';

moduleForComponent('', 'select-box/input', {
  integration: true
});


test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/input}}`);

  assert.equal(this.$('input.select-box-input').length, 1,
    'renders with correct class name and tag');
});


test('class prefix', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/input class-prefix="foo"}}`);

  assert.equal(this.$('.foo-input').length, 1,
    'can override the class prefix');
});


test('type', function(assert) {
  assert.expect(2);

  this.render(hbs `{{select-box/input}}`);

  assert.ok(!this.$('.select-box-input').attr('type'),
    'select box inputs are not search boxes by default due to unwanted ' +
    'behaviour when you press escape');

  this.render(hbs `{{select-box/input type="email"}}`);

  assert.equal(this.$('.select-box-input').attr('type'), 'email',
    'can change the type of the select box input');
});


test('value', function(assert) {
  assert.expect(3);

  this.set('myObj', { value: 'foo' });

  this.render(hbs `{{select-box/input value=myObj.value}}`);

  const $input = this.$('.select-box-input');

  assert.equal($input.val(), 'foo',
    'can specify the initial value');

  this.set('myObj.value', 'bar');

  assert.equal($input.val(), 'bar',
    'updating the value updates the text box value');

  $input.val('baz').trigger('input').trigger('change');

  assert.equal(this.get('myObj.value'), 'bar',
    'changing the input value does not mutate the value attribute');
});


test('inputting', function(assert) {
  assert.expect(2);

  this.on('inputText', (value, sb) => {
    assert.equal(value, 'foo',
      'inputting text sends an action with the value');

    assert.ok(typeof sb === 'object',
      'sends the api');
  });

  this.render(hbs `
    {{#select-box as |sb|}}
      {{sb.input on-input=(action "inputText")}}
    {{/select-box}}
  `);

  this.$('.select-box-input').val('foo').trigger('input');
});


test('on-clear action', function(assert) {
  assert.expect(1);

  this.on('cleared', sb => {
    assert.ok(typeof sb === 'object',
      'clearing the input value sends an action with the select box api');
  });

  this.render(hbs `
    {{#select-box as |sb|}}
      {{sb.input value="foo" on-clear=(action "cleared")}}
    {{/select-box}}
  `);

  this.$('.select-box-input').val('').trigger('input');
});


test('on-delete action', function(assert) {
  assert.expect(2);

  let count = 0;

  this.on('deleted', sb => {
    count++;

    assert.ok(typeof sb === 'object',
      'the on-delete action receives select box api');
  });

  this.render(hbs `
    {{#select-box as |sb|}}
      {{sb.input value="f" on-delete=(action "deleted")}}
    {{/select-box}}
  `);

  const $input = this.$('.select-box-input');

  $input
    .val('x')
    .trigger(events.backspace())
    .val('')
    .trigger(events.backspace());

  assert.equal(count, 1,
    'delete action is only fired when value is blank & backspace is pressed');
});
