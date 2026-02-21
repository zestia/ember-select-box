import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import Dropdown from '@zestia/ember-select-box/components/dropdown';

module('dropdown', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(2);

    await render(<template><Dropdown /></template>);

    assert
      .dom('.dropdown')
      .hasTagName('div')
      .doesNotHaveAttribute('data-disabled');
  });

  test('open', async function (assert) {
    assert.expect(1);

    await render(<template><Dropdown /></template>);

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
  });

  test('splattributes', async function (assert) {
    assert.expect(1);

    await render(<template><Dropdown class="foo" /></template>);

    assert.dom('.dropdown').hasClass('foo');
  });

  test('whitespace', async function (assert) {
    assert.expect(1);

    await render(<template><Dropdown /></template>);

    assert.strictEqual(find('.dropdown').innerHTML, '');
  });
});
