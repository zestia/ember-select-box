import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
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
      .doesNotHaveAttribute('aria-disabled')
      .hasAttribute('aria-current', 'true');

    state.disableOne = true;

    await rerender();

    assert
      .dom('.select-box__option')
      .hasAttribute('aria-disabled', 'true')
      .doesNotHaveAttribute('aria-current');
  });

  test("mousing into an option activates it even if the select box doesn't have focus", async function (assert) {
    assert.expect(3);

    const handleActivateOption = () => assert.step('activate');

    await render(<template>
      <SelectBox @onActivate={{handleActivateOption}} as |sb|>
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    await triggerEvent('.select-box__option', 'mouseenter');

    assert.dom('.select-box__option').hasAttribute('aria-current', 'true');

    assert.verifySteps(['activate']);
  });

  test('mousing over an option does not scroll to it', async function (assert) {
    assert.expect(1);

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

    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');

    // MDN says mouseleave does not bubble, but with ember-test-helpers it does
    // unless we explicitly tell it not to.
    // https://ember-twiddle.com/79665b9e5892198ff2b79253183dab65
    await triggerEvent('.select-box__option:nth-child(2)', 'mouseleave', {
      bubbles: false
    });

    assert.dom('.select-box__option:nth-child(2)').hasAttribute(
      'aria-current',
      'true',
      `does not lose the fact that this option is current.
       since the pointer is inside the select box still, it makes
       sense to not flicker options active/de-active as the user
       moves the mouse over them.`
    );
  });

  test('mousing out of a select box deactivates the options when it does not have focus', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option>a</sb.Option>
          <sb.Option>b</sb.Option>
          <sb.Option>c</sb.Option>
        </sb.Options>
      </SelectBox>
    </template>);

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
  });

  test('mousing out of a select box does not deactivate the options when it has focus (listbox)', async function (assert) {
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
    await triggerEvent('.select-box', 'mouseleave');

    assert.dom('.select-box__option:nth-child(2)').hasAttribute(
      'aria-current',
      'true',
      `the list box still has focus, and as such it is receptive to user input
       therefore, this option must be current in order to be selected`
    );
  });

  test('mousing out of a select box does not deactivate the options when it has focus (comobox - trigger)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option>a</sb.Option>
          <sb.Option>b</sb.Option>
          <sb.Option>c</sb.Option>
        </sb.Options>
      </SelectBox>
    </template>);

    await focus('.select-box__trigger');
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
       cancel their click by moving the pointer out, and then releasing`
    );
  });
});
