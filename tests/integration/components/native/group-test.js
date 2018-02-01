import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box/native/group', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/native/group}}`);

    assert.equal(this.$('optgroup.select-box-group').length, 1,
      'renders with correct class name and tag');
  });

  test('class prefix', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/native/group class-prefix="foo"}}`);

    assert.equal(this.$('.foo-group').length, 1,
      'can override the class prefix');
  });

  test('label', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/native/group label="Foo"}}`);

    assert.equal(this.$('.select-box-group').attr('label'), 'Foo',
      'the specified label is applied as an HTML attribute');
  });

  test('disabling', async function(assert) {
    assert.expect(2);

    this.set('groupDisabled', true);

    await render(hbs `{{select-box/native/group disabled=groupDisabled}}`);

    assert.ok(this.$('.select-box-group').is(':disabled'),
      'a select box group can be disabled');

    this.set('groupDisabled', false);

    assert.ok(this.$('.select-box-group').not(':disabled'),
      'a select box group can be re-enabled');
  });
});
