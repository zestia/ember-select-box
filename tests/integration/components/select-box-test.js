import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import SelectBox from 'ember-cli-select-box/components/select-box';

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

  assert.equal(this.$('.foo-select-box').length, 1);
  assert.equal(this.$('.foo-select-box-input').length, 1);
  assert.equal(this.$('.foo-select-box-options').length, 1);
  assert.equal(this.$('.foo-select-box-selected-options').length, 1);
  assert.equal(this.$('.foo-select-box-group').length, 1);
  assert.equal(this.$('.foo-select-box-group-label').length, 1);
  assert.equal(this.$('.foo-select-box-group-options').length, 1);
  assert.equal(this.$('.foo-select-box-option').length, 1);
  assert.equal(this.$('.foo-select-box-selected-option').length, 1);
});


test('extending with class prefix', function(assert) {
  assert.expect(1);

  let FooSelectBox = SelectBox.extend({
    classNamePrefix: 'foo'
  });

  this.registry.register('component:select-box/foo', FooSelectBox);

  this.render(hbs `{{select-box/foo}}`);

  assert.ok(this.$('.foo-select-box').length, 1,
    'can set the class name prefix to create custom select boxes');
});


test('aria', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box}}`);

  assert.equal(this.$('.select-box').attr('role'), 'listbox',
    'a select box has an appropriate aria role');
});


