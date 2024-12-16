import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import {
  render,
  rerender,
  find,
  focus,
  triggerEvent
} from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (mouseenter option)', function (hooks) {
  setupRenderingTest(hooks);

  test('mousing into an option activates it', async function (assert) {
    assert.expect(9);

    const handleActivateOption = (value) => assert.step(value);

    await render(<template>
      <SelectBox @onActivate={{handleActivateOption}} as |sb|>
        <sb.Options>
          <sb.Option @value="a" />
          <sb.Option @value="b" @disabled={{true}} />
          <sb.Option @value="c" />
        </sb.Options>
      </SelectBox>
    </template>);

    await triggerEvent('.select-box__option:nth-child(1)', 'mouseenter');

    assert.dom('.select-box__option:nth-child(1)').hasAttribute(
      'aria-current',
      'true',
      `activates the option even without focus, this allows us
       to not have :hover conflict with [aria-current]`
    );

    assert.verifySteps(['a'], 'sends an action when an option is activated');

    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute(
        'aria-current',
        'true',
        'previous option remains active because the one the mouse entered into is disabled'
      );

    assert
      .dom('.select-box__option:nth-child(2)')
      .doesNotHaveAttribute(
        'aria-current',
        'the disabled option is not activated'
      );

    assert.verifySteps([]);

    await triggerEvent('.select-box__option:nth-child(3)', 'mouseenter');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');

    assert.verifySteps(['c']);
  });

  test('mousing into a disabled option', async function (assert) {
    assert.expect(4);

    const state = new (class {
      @tracked disableOne;
    })();

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option @disabled={{state.disableOne}} />
        </sb.Options>
      </SelectBox>
    </template>);

    await triggerEvent('.select-box__option', 'mouseenter');

    assert
      .dom('.select-box__option')
      .hasAttribute('aria-disabled', 'false')
      .hasAttribute('aria-current', 'true');

    state.disableOne = true;

    await rerender();

    assert
      .dom('.select-box__option')
      .hasAttribute('aria-disabled', 'true')
      .doesNotHaveAttribute('aria-current');
  });

  test('mousing over an option does not scroll to it', async function (assert) {
    assert.expect(1);

    // This would create annoying shift as you move the mouse.

    await render(<template>
      {{! template-lint-disable no-forbidden-elements }}
      <style>
        .select-box__options { height: 1em; overflow: auto; }
        .select-box__option { line-height: 1; }
      </style>

      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option>a</sb.Option>
          <sb.Option>b</sb.Option>
          <sb.Option>c</sb.Option>
        </sb.Options>
      </SelectBox>
    </template>);

    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');

    assert.strictEqual(find('.select-box__options').scrollTop, 0);
  });

  test('mousing out of an option does not deactivate it', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option>a</sb.Option>
          <sb.Option>b</sb.Option>
          <sb.Option>c</sb.Option>
        </sb.Options>
      </SelectBox>
    </template>);

    await focus('.select-box__options');
    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');
    await triggerEvent('.select-box__option:nth-child(2)', 'mouseleave');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute(
        'aria-current',
        'true',
        'does not lose the fact that this option is current.'
      );
  });

  test('mousing out of a select box deactivates the options when it does not have focus', async function (assert) {
    assert.expect(4);

    await render(<template>
      <SelectBox @value="c" as |sb|>
        <sb.Options>
          <sb.Option @value="a">a</sb.Option>
          <sb.Option @value="b">b</sb.Option>
          <sb.Option @value="c">c</sb.Option>
        </sb.Options>
      </SelectBox>
    </template>);

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');

    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    await triggerEvent('.select-box', 'mouseleave');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute(
        'aria-current',
        'false',
        "it was set to current so the developer doesn't have to battle with :hover vs current"
      );

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute(
        'aria-current',
        'true',
        'falls back to selected value, since that is where keybaord control starts from'
      );
  });

  test('mousing out of a select box does not deactivate the options when it has focus (listbox)', async function (assert) {
    assert.expect(4);

    await render(<template>
      <SelectBox @value="c" as |sb|>
        <sb.Options>
          <sb.Option @value="a">a</sb.Option>
          <sb.Option @value="b">b</sb.Option>
          <sb.Option @value="c">c</sb.Option>
        </sb.Options>
      </SelectBox>
    </template>);

    await focus('.select-box__options');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');

    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    await triggerEvent('.select-box', 'mouseleave');

    assert.dom('.select-box__option:nth-child(2)').hasAttribute(
      'aria-current',
      'true',
      `still focused, and so still receptive to user input, pressing enter will select
      the active option`
    );

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute(
        'aria-current',
        'false',
        'does not falls back to selected value'
      );
  });

  test('mousing out of a select box does not deactivate the options when it has focus (comobox - trigger)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Dropdown>
          <sb.Trigger />
          <sb.Content>
            <sb.Options>
              <sb.Option>a</sb.Option>
              <sb.Option>b</sb.Option>
              <sb.Option>c</sb.Option>
            </sb.Options>
          </sb.Content>
        </sb.Dropdown>
      </SelectBox>
    </template>);

    await focus('.select-box .dropdown__trigger');
    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');
    await triggerEvent('.select-box', 'mouseleave');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');
  });

  test('mousing out of a select box does not deactivate the options when it has focus (comobox - input)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Input />
        <sb.Options>
          <sb.Option>a</sb.Option>
          <sb.Option>b</sb.Option>
          <sb.Option>c</sb.Option>
        </sb.Options>
      </SelectBox>
    </template>);

    await focus('.select-box__input');
    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');
    await triggerEvent('.select-box', 'mouseleave');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');
  });

  test('mousing down on an option does not select it', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option @value={{1}} />
        </sb.Options>
      </SelectBox>
    </template>);

    await triggerEvent('.select-box__option', 'mousedown');

    assert.dom('.select-box__option').hasAttribute(
      'aria-selected',
      'false',
      `should not be selected on mousedown, because the user should be able to
       cancel their click by moving the pointer out, and then releasing
       (search the tests for the click abort test for more info)`
    );
  });
});
