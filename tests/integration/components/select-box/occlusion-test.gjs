import { module, skip } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';
import VerticalCollection from '@html-next/vertical-collection/components/vertical-collection/component';

module('select-box (occlusion)', function (hooks) {
  setupRenderingTest(hooks);

  skip('navigation', async function (assert) {
    assert.expect(1);

    const options = ['one', 'two', 'three', 'four', 'five', 'six'];

    await render(<template>
      {{! template-lint-disable no-forbidden-elements }}
      <style>
        .select-box__options { height: 2em; overflow: auto; }
        .select-box__option { line-height: 1; }
      </style>
      <SelectBox @options={{options}} as |sb|>
        <sb.Input />
        <sb.Options>
          <VerticalCollection
            @items={{sb.options}}
            @estimateHeight={{16}}
            @bufferSize={{1}}
            as |value|
          >
            <sb.Option @value={{value}}>
              {{value}}
            </sb.Option>
          </VerticalCollection>
        </sb.Options>
      </SelectBox>
    </template>);

    // await triggerKeyEvent('.select-box__input', 'keydown', 'ArrowDown');
    // await triggerKeyEvent('.select-box__input', 'keydown', 'ArrowDown');
    // await triggerKeyEvent('.select-box__input', 'keydown', 'ArrowDown');
    // await triggerKeyEvent('.select-box__input', 'keydown', 'ArrowDown');
    // await triggerKeyEvent('.select-box__input', 'keydown', 'ArrowDown');
    // await triggerKeyEvent('.select-box__input', 'keydown', 'ArrowDown');
  });
});
