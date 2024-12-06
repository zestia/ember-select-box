import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, click } from '@ember/test-helpers';
import Dropdown from '@zestia/ember-select-box/components/dropdown';

module('dropdownx (clicking trigger)', function (hooks) {
  setupRenderingTest(hooks);

  test('clicking trigger', async function (assert) {
    assert.expect(7);

    // Whether or not the Content renders is up to the developer.
    // This allows it to be hidden with CSS instead if preferred.

    await render(<template>
      <Dropdown as |dd|>
        <dd.Trigger />
        <dd.Content />
      </Dropdown>
    </template>);

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.dom('.dropdown__trigger').hasAttribute('aria-expanded', 'false');
    assert.dom('.dropdown__content').exists();

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');
    assert.dom('.dropdown__trigger').hasAttribute('aria-expanded', 'true');
    assert.dom('.dropdown__content').exists();

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
  });

  test('right clicking trigger', async function (assert) {
    assert.expect(2);

    await render(<template>
      <Dropdown as |dd|>
        <dd.Trigger />
      </Dropdown>
    </template>);

    assert.dom('.dropdown').hasAttribute('data-open', 'false');

    await click('.dropdown__trigger', { button: 2 });

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
  });
});
