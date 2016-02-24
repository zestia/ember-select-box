import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('', 'select-box/native/group', {
  integration: true
});


test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/native/group}}`);

  assert.equal(this.$('optgroup.select-box-group').length, 1,
    'renders with correct class name and tag');
});


test('class prefix', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/native/group class-prefix='foo'}}`);

  assert.equal(this.$('.foo-group').length, 1,
    'can override the class prefix');
});


test('label', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/native/group label='Foo'}}`);

  assert.equal(this.$('.select-box-group').attr('label'), 'Foo',
    'the specified label is applied as an HTML attribute');
});


test('disabling', function(assert) {
  assert.expect(2);

  this.set('groupDisabled', true);

  this.render(hbs `{{select-box/native/group disabled=groupDisabled}}`);

  assert.ok(this.$('.select-box-group').is(':disabled'),
    'a select box group can be disabled');

  this.set('groupDisabled', false);

  assert.ok(this.$('.select-box-group').not(':disabled'),
    'a select box group can be re-enabled');
});
