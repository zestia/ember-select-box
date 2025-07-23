import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, rerender, click } from '@ember/test-helpers';
import Dropdown from '@zestia/ember-select-box/components/dropdown';

module('dropdown (api)', function (hooks) {
  setupRenderingTest(hooks);

  test('api', async function (assert) {
    assert.expect(8);

    let api;
    let api2;

    const handleReady = (dd) => (api = dd);
    const capture = (dd) => (api2 = dd);

    await render(
      <template>
        <Dropdown @onReady={{handleReady}} as |dd|>
          <dd.Trigger />
          <dd.Content>
            {{capture dd}}
          </dd.Content>
        </Dropdown>
      </template>
    );

    assert.strictEqual(api, api2);

    // Components
    assert.strictEqual(typeof api.Trigger, 'object');
    assert.strictEqual(typeof api.Content, 'object');

    // Properties
    assert.deepEqual(api.element, find('.dropdown'));
    assert.strictEqual(api.isOpen, false);

    // Actions
    assert.strictEqual(typeof api.open, 'function');
    assert.strictEqual(typeof api.close, 'function');
    assert.strictEqual(typeof api.toggle, 'function');
  });

  test('api writing', async function (assert) {
    assert.expect(1);

    let api;

    const handleReady = (sb) => (api = sb);

    await render(
      <template>
        <Dropdown @onReady={{handleReady}} as |dd|>
          <dd.Trigger>
            {{dd.isOpen}}
          </dd.Trigger>
        </Dropdown>
      </template>
    );

    assert.throws(() => {
      api.isOpen = true;
    }, 'read only api');
  });

  test('isOpen', async function (assert) {
    assert.expect(2);

    let api;

    const handleReady = (dd) => (api = dd);

    await render(
      <template>
        <Dropdown @onReady={{handleReady}} as |dd|>
          <dd.Trigger />
        </Dropdown>
      </template>
    );

    assert.false(api.isOpen);

    await click('.dropdown__trigger');

    assert.true(api.isOpen);
  });

  test('toggle', async function (assert) {
    assert.expect(3);

    let api;

    const handleReady = (dd) => (api = dd);

    await render(
      <template>
        <Dropdown @onReady={{handleReady}} as |dd|>
          <dd.Trigger />
        </Dropdown>
      </template>
    );

    assert.dom('.dropdown').hasAttribute('data-open', 'false');

    api.toggle();

    await rerender();

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    api.toggle();

    await rerender();

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
  });
});
