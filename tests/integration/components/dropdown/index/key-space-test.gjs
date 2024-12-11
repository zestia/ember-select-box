import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, triggerKeyEvent } from '@ember/test-helpers';
import Dropdown from '@zestia/ember-select-box/components/dropdown';

module('dropdownx', function (hooks) {
  setupRenderingTest(hooks);

  test('space on trigger (space)', async function (assert) {
    assert.expect(2);

    await render(<template>
      <Dropdown as |dd|>
        <dd.Trigger />
      </Dropdown>
    </template>);

    await triggerKeyEvent('.dropdown__trigger', 'keydown', ' ');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await triggerKeyEvent('.dropdown__trigger', 'keydown', ' ');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
  });
});
