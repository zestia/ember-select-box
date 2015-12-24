import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('', 'select-box/group', {
  integration: true
});



test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/group}}`);

  assert.equal(this.$('div.select-box-group').length, 1,
    'renders with correct class name and tag');
});


test('class prefix', function(assert) {
  assert.expect(3);

  this.render(hbs`{{select-box/group class-prefix='foo'}}`);

  assert.equal(this.$('.foo-group').length, 1,
    "can customise a select box group's class name");

  assert.ok(this.$('.foo-group-label').length, 1,
    'child group label of a group has the prefix too');

  assert.ok(this.$('.foo-group-options').length, 1,
    'child group options of a group have the prefix too');
});


test('label', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/group label='Foo'}}`);

  assert.equal(this.$(".select-box-group-label:contains('Foo')").length, 1,
    'displays the specified group label');
});


test('options', function(assert) {
  assert.expect(1);

  this.render(hbs `
    {{#select-box/group}}
      {{select-box/option}}
    {{/select-box/group}}
  `);

  assert.equal(this.$(".select-box-group-options .select-box-option").length, 1,
    'can display options inside the group');
});