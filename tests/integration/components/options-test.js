import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';

module('select-box/options', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/options}}`);

    assert.equal(this.$('div.select-box-options').length, 1,
      'renders with correct class name and tag');
  });

  test('class prefix', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/options class-prefix="foo"}}`);

    assert.equal(this.$('.foo-options').length, 1,
      'can override the class prefix');
  });

  test('style', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/options style="color:red<script>"}}`);

    assert.ok(this.$().html().match('style="color:red&amp;lt;script&amp;gt;"'),
      'options container can be styled, value is escaped');
  });

  test('aria role', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/options}}`);

    assert.equal(this.$('.select-box-options').attr('role'), 'listbox',
      'options container has an appropriate aria role');
  });

  test('promise value (aria busy)', async function(assert) {
    assert.expect(2);

    const deferred = defer();

    this.set('promise', deferred.promise);

    await render(hbs`{{select-box/option value=promise}}`);

    assert.ok(this.$('.select-box-option').get(0).hasAttribute('aria-busy'),
      'select box option has busy attribute when resolving promise');

    deferred.resolve();

    await settled();

    assert.ok(!this.$('.select-box-option').get(0).hasAttribute('aria-busy'),
      'select box option no longer has busy attribute when promise has resolved');
  });
});
