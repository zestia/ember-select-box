import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { focus, render, triggerKeyEvent } from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (keydown on options)', function (hooks) {
  setupRenderingTest(hooks);

  test('can navigate options with the arrow keys', async function (assert) {
    assert.expect(8);

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

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await focus('.select-box__options');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowDown');

    assert.verifySteps(['a']);

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowDown');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');

    assert.verifySteps(['c']);
  });

  test('key down on options is ignored', async function (assert) {
    assert.expect(2);

    const handleActivateOption = (value) => assert.step(value);

    await render(<template>
      <SelectBox @onActivate={{handleActivateOption}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value="a" />
          <sb.Option @value="b" @disabled={{true}} />
          <sb.Option @value="c" />
        </sb.Options>
      </SelectBox>
    </template>);

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowDown');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'false');

    assert.verifySteps(
      [],
      `the options element is not focusable when part of a combobox,
       only the input and trigger elements handle key events`
    );
  });
});
