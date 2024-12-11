import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, triggerKeyEvent } from '@ember/test-helpers';
import Dropdown from '@zestia/ember-select-box/components/dropdown';

module('dropdown (enter)', function (hooks) {
  setupRenderingTest(hooks);

  test('enter on trigger', async function (assert) {
    assert.expect(2);

    await render(<template>
      <Dropdown as |dd|>
        <dd.Trigger />
      </Dropdown>
    </template>);

    await triggerKeyEvent('.dropdown__trigger', 'keydown', 'Enter');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await triggerKeyEvent('.dropdown__trigger', 'keydown', 'Enter');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
  });
});
