import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (class name helper)', function(hooks) {
  setupRenderingTest(hooks);

  test('defaults', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box-class}}`);

    assert.equal(this.$().html(), 'select-box',
      'outputs the default class name');
  });

  test('prefix', async function(assert) {
    assert.expect(2);

    await render(hbs `{{select-box-class ""}}`);

    assert.equal(this.$().html(), 'select-box',
      'generates the default class name');

    await render(hbs `{{select-box-class "foo"}}`);

    assert.equal(this.$().html(), 'foo',
      'uses the specified class name instead');
  });

  test('suffix', async function(assert) {
    assert.expect(2);

    await render(hbs `{{select-box-class "" ""}}`);

    assert.equal(this.$().html(), 'select-box',
      'generates the default class name, does add extraneous dash');

    await render(hbs `{{select-box-class "" "foo"}}`);

    assert.equal(this.$().html(), 'select-box-foo',
      'adds suffix to default class name');
  });

  test('prefix and suffix', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box-class "foo" "bar"}}`);

    assert.equal(this.$().html(), 'foo-bar',
      'uses custom prefix and suffix, separating with a dash');
  });

  test('escaping', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box-class "<script>" "</script>"}}`);

    assert.equal(this.$().html(), '&lt;script&gt;-&lt;/script&gt;',
      'the values are escaped');
  });
});
