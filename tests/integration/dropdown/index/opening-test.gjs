import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, rerender } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import Dropdown from '@zestia/ember-select-box/components/dropdown';

module('dropdown (opening)', function (hooks) {
  setupRenderingTest(hooks);

  test('open', async function (assert) {
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

    assert.dom('.dropdown').hasAttribute('data-open', 'false');

    api.open();

    await rerender();

    assert.dom('.dropdown').hasAttribute('data-open', 'true');
  });

  test('can set initial open state', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <Dropdown @open={{true}} as |dd|>
          <dd.Trigger />
          <dd.Content />
        </Dropdown>
      </template>
    );

    assert.dom('.dropdown').hasAttribute('data-open', 'true');
    assert.dom('.dropdown__trigger').hasAttribute('aria-expanded', 'true');
    assert.dom('.dropdown__trigger').isNotFocused();
  });

  test('cannot open dropdown manually with argument', async function (assert) {
    assert.expect(2);

    // We can easily support this using localCopy.
    // But, changing `@open` will not pass through the expected
    // code path, like it would with a user interaction, and so
    // onOpen will not fire if we do that.

    const state = new (class {
      @tracked isOpen;
    })();

    await render(
      <template>
        <Dropdown @open={{state.isOpen}} as |dd|>
          <dd.Trigger />
        </Dropdown>
      </template>
    );

    state.isOpen = true;

    await rerender();

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.dom('.dropdown__trigger').hasAttribute('aria-expanded', 'false');
  });
});
