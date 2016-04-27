import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import SelectBox from 'ember-select-box/components/select-box';

moduleForComponent('', 'select-box', {
  integration: true
});


test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box}}`);

  assert.equal(this.$('div.select-box').length, 1,
    'renders with correct class name and tag');
});


test('class prefix attr', function(assert) {
  assert.expect(9);

  this.render(hbs `
    {{#select-box class-prefix='foo' as |sb|}}
      {{sb.input}}
      {{#sb.selected-options}}
        {{sb.selected-option}}
      {{/sb.selected-options}}
      {{#sb.options}}
        {{#sb.group}}
          {{sb.option}}
        {{/sb.group}}
      {{/sb.options}}
    {{/select-box}}
  `);

  assert.equal(this.$('.foo').length, 1);
  assert.equal(this.$('.foo-input').length, 1);
  assert.equal(this.$('.foo-options').length, 1);
  assert.equal(this.$('.foo-selected-options').length, 1);
  assert.equal(this.$('.foo-group').length, 1);
  assert.equal(this.$('.foo-group-label').length, 1);
  assert.equal(this.$('.foo-group-options').length, 1);
  assert.equal(this.$('.foo-option').length, 1);
  assert.equal(this.$('.foo-selected-option').length, 1);
});


test('extending with class prefix', function(assert) {
  assert.expect(1);

  let FooSelectBox = SelectBox.extend({
    classNamePrefix: 'foo'
  });

  this.registry.register('component:select-box/foo', FooSelectBox);

  this.render(hbs `{{select-box/foo}}`);

  assert.ok(this.$('.foo').length, 1,
    'can set the class name prefix to create custom select boxes');
});


test('aria role', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box}}`);

  assert.equal(this.$('.select-box').attr('role'), 'listbox',
    'a select box has an appropriate aria role');
});


test('initial update action', function(assert) {
  assert.expect(1);

  this.on('updated', (value) => {
    assert.strictEqual(value, undefined,
      'fires an initial update action with the selected value');
  });

  this.render(hbs `{{select-box on-update=(action 'updated')}}`);
});


test('subsequent update actions', function(assert) {
  assert.expect(1);

  let count = 0;

  this.set('selectedValue', 'foo');

  this.on('updated', (value) => {
    count++;
    if (count === 2) {
      assert.strictEqual(value, 'bar',
        'fires an update action when the value changes');
    }
  });

  this.render(hbs `
    {{select-box
      value=selectedValue
      on-update=(action 'updated')}}
  `);

  this.set('selectedValue', 'bar');
});


test('update action', function(assert) {
  assert.expect(1);

  let count = 0;

  this.on('updated', () => {
    count++;
  });

  this.render(hbs `
    {{select-box
      disabled=isDisabled
      on-update=(action 'updated')}}
  `);

  this.set('isDisabled', true);

  assert.equal(count, 1,
    'updating attributes other than the `value` ' +
    'should not fire update action');
});
