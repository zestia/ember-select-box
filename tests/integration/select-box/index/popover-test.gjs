import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, render } from '@ember/test-helpers';
import { on } from '@ember/modifier';
import SelectBox from '#src/components/select-box';

module('select-box (popover)', function (hooks) {
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
        <SelectBox as |sb|>
          <sb.Dropdown @usePopover={{true}}>
            <sb.Trigger />
            <sb.Content {{on "toggle" handleToggle}}>
              <sb.Options />
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    const trigger = find('.select-box .dropdown__trigger');
    const content = find('.select-box .dropdown__content');

    // Dropdown content in the DOM, but not open

    assert.false(content.matches(':popover-open'));
    assert.dom('.select-box .dropdown__content').exists();
    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');

    await click(trigger);

    // Dropdown popover is open

    assert.strictEqual(
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
    assert.dom('.select-box .dropdown__content').exists();
    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');
  });

  test('custom popover target', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown
            @usePopover={{true}}
            @popoverTarget={{sb.dropdown.element}}
          >
            <sb.Input />
            <sb.Trigger />
            <sb.Content {{on "toggle" handleToggle}}>
              <sb.Options />
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');

    assert.deepEqual(popoverSource, find('.select-box .dropdown'));
  });
});
