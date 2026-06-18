import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, render } from '@ember/test-helpers';
import { on } from '@ember/modifier';
import Dropdown from '#src/components/dropdown';

module('dropdown (popover)', function (hooks) {
  setupRenderingTest(hooks);

  let popoverSource;

  const handleToggle = (event) => (popoverSource = event.source);

  hooks.afterEach(function () {
    popoverSource = null;
  });

  test('opens and closes using the trigger as the popover source', async function (assert) {
    assert.expect(11);

    await render(
      <template>
        <Dropdown @usePopover={{true}} as |dd|>
          <dd.Trigger />
          <dd.Content {{on "toggle" handleToggle}} />
        </Dropdown>
      </template>
    );

    const trigger = find('.dropdown__trigger');
    const content = find('.dropdown__content');

    // Dropdown content in the DOM, but not open

    assert.false(content.matches(':popover-open'));
    assert.dom('.dropdown__content').exists();
    assert.dom('.dropdown').hasAttribute('data-open', 'false');

    await click(trigger);

    // Dropdown popover is open

    assert.deepEqual(
      popoverSource,
      trigger,
      'content is coupled to the trigger to get css anchor scoped positioning for free'
    );

    assert.true(content.matches(':popover-open'));
    assert.dom(trigger).doesNotHaveAttribute('popovertarget');
    assert
      .dom(content)
      .hasAttribute('popover', 'manual')
      .doesNotHaveAttribute('style');

    await click(trigger);

    // Dropdown popover is closed

    assert.false(content.matches(':popover-open'));
    assert.dom('.dropdown__content').exists();
    assert.dom('.dropdown').hasAttribute('data-open', 'false');
  });

  test('custom popover target', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <div class="popover-target"></div>

        <Dropdown
          @usePopover={{true}}
          @popoverTarget={{find ".popover-target"}}
          as |dd|
        >
          <dd.Trigger />
          <dd.Content {{on "toggle" handleToggle}} />
        </Dropdown>
      </template>
    );

    await click('.dropdown__trigger');

    assert.deepEqual(popoverSource, find('.popover-target'));
  });
});
