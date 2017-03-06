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

  this.render(hbs `{{select-box/input class-prefix='foo'}}`);

  assert.equal(this.$('.foo-input').length, 1,
    'can override the class prefix');
});


test('type', function(assert) {
  assert.expect(2);

  this.render(hbs `{{select-box/input}}`);

  assert.ok(!this.$('.select-box-input').attr('type'),
    'select box inputs are not search boxes by default due to unwanted ' +
    'behaviour when you press escape');

  this.render(hbs `{{select-box/input type='email'}}`);

  assert.equal(this.$('.select-box-input').attr('type'), 'email',
    'can change the type of the select box input');
});


test('size', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/input size=10}}`);

  assert.equal(this.$('.select-box-input').attr('size'), '10',
    "can set the size of a select box's input element");
});


test('autofocus', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/input autofocus=true}}`);

  assert.equal(this.$('.select-box-input').prop('autofocus'), true,
    "can autofocus a select box's input element");
});


test('autocomplete', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/input autocomplete='off'}}`);

  assert.equal(this.$('.select-box-input').attr('autocomplete'), 'off',
    'can set the autocomplete attribute');
});


test('autocorrect', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/input autocorrect='off'}}`);

  assert.equal(this.$('.select-box-input').attr('autocorrect'), 'off',
    'can set the autocorrect attribute');
});


test('autocapitalize', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/input autocapitalize='off'}}`);

  assert.equal(this.$('.select-box-input').attr('autocapitalize'), 'off',
    'can set the autocapitalize attribute');
});


test('spellcheck', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/input spellcheck=false}}`);

  assert.equal(this.$('.select-box-input').attr('spellcheck'), 'false',
    'can set the spellcheck attribute');
});


test('disabled', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/input disabled=true}}`);

  assert.equal(this.$('.select-box-input').prop('disabled'), true,
    "can disable a select box's input element");
});


test('readonly', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/input readonly=true}}`);

  assert.equal(this.$('.select-box-input').prop('readonly'), true,
    "can set a select box's input to be readonly");
});


test('placeholder', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/input placeholder='foo'}}`);

  assert.equal(this.$('.select-box-input').attr('placeholder'), 'foo',
    "can set a select box's placeholder");
});


test('value', function(assert) {
  assert.expect(3);

  this.set('myValue', 'foo');

  this.render(hbs `{{select-box/input value=myValue}}`);

  const $input = this.$('.select-box-input');

  assert.equal($input.val(), 'foo',
    'can specify the initial value');

  this.set('myValue', 'bar');

  assert.equal($input.val(), 'bar',
    'updating the value updates the text box value');

  $input.val('baz').trigger('input change');

  assert.equal(this.get('myValue'), 'bar',
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
      {{sb.input on-input=(action 'inputText')}}
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
      {{sb.input value='foo' on-clear=(action 'cleared')}}
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
      {{sb.input value='f' on-delete=(action 'deleted')}}
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
