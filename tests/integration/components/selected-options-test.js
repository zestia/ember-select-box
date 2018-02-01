import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box/selected-options', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/selected-options}}`);

    assert.equal(this.$('div.select-box-selected-options').length, 1,
      'renders with correct class name and tag');
  });

  test('class prefix', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/selected-options class-prefix="foo"}}`);

    assert.equal(this.$('.foo-selected-options').length, 1,
      'can override the class prefix');
  });

  test('style', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/selected-options style="color:red<script>"}}`);

    assert.ok(this.$().html().match('style="color:red&amp;lt;script&amp;gt;"'),
      'selected options container can be styled, value is escaped');
  });
});
