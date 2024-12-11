import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, focus, triggerEvent } from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (mouseenter option)', function (hooks) {
  setupRenderingTest(hooks);

  test('mousing down on trigger but mousing up on an option', async function (assert) {
    assert.expect(1);

    // This tests mousing down, keeping the button pressed,
    // essentially dragging down and then releasing.

    await render(<template>
      <SelectBox as |sb|>
        <sb.Dropdown>
          <sb.Trigger />
          <sb.Content>
            <sb.Options>
              <sb.Option @value={{1}}>one</sb.Option>
              <sb.Option @value={{2}}>two</sb.Option>
            </sb.Options>
          </sb.Content>
        </sb.Dropdown>
      </SelectBox>
    </template>);

    await triggerEvent('.select-box .dropdown__trigger', 'mousedown');
    await triggerEvent('.select-box__option:nth-child(2)', 'mouseup');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'true');
  });

  test('mousing down on trigger but mousing up outside the select box', async function (assert) {
    assert.expect(4);

    // This tests mousing down, keeping the button pressed,
    // then essentially dragging out of the select box dropdown
    // and releasing, aka aborting the click.

    const handleSelect = () => assert.step('select');

    await render(<template>
      <SelectBox @onSelect={{handleSelect}} as |sb|>
        <sb.Dropdown>
          <sb.Trigger />
          <sb.Content>
            <sb.Options>
              <sb.Option @value={{1}}>one</sb.Option>
              <sb.Option @value={{2}}>two</sb.Option>
            </sb.Options>
          </sb.Content>
        </sb.Dropdown>
      </SelectBox>

      <button class="outside" type="button"></button>
    </template>);

    await focus('.select-box .dropdown__trigger');
    await triggerEvent('.select-box .dropdown__trigger', 'mousedown');
    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');

    await triggerEvent('.select-box', 'mouseleave');
    await triggerEvent('.outside', 'mouseup');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();
    assert.dom('.select-box .dropdown__trigger').isFocused();
    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');
    assert.verifySteps([]);
  });
});
