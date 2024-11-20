import { module, skip } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import {
  render,
  fillIn,
  find,
  settled,
  triggerKeyEvent
} from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';
import VerticalCollection from '@html-next/vertical-collection/components/vertical-collection/component';
import getOptions from 'dummy/tests/helpers/get-options';
import { on } from '@ember/modifier';

module('select-box (occlusion)', function (hooks) {
  setupRenderingTest(hooks);

  async function raf() {
    await new Promise(requestAnimationFrame);
    await settled();
  }

  skip('navigation', async function (assert) {
    assert.expect(11);

    // Using occlusion, _does_ work, but seemingly not in the test suite
    // and also, requires a buffer larger than 1.

    const options = ['one', 'two', 'three', 'four', 'five', 'six'];

    const handleScroll = () => {
      assert.step(`scroll ${find('.select-box__options').scrollTop}`);
    };

    await render(<template>
      {{! template-lint-disable no-forbidden-elements }}
      <style>
        .select-box__options { height: 2em; overflow: auto; }
        .select-box__option { line-height: 1; }
      </style>
      <SelectBox @options={{options}} as |sb|>
        <sb.Options {{on "scroll" handleScroll}}>
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

    await raf();
    assert.dom('.select-box__option').exists({ count: 3 });

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowDown');
    await raf();
    assert.dom('.select-box__option[aria-current="true"]').hasText('one');
    assert.deepEqual(getOptions(), ['one', 'two', 'three']);
    assert.verifySteps([]);

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowDown');
    await raf();
    assert.dom('.select-box__option[aria-current="true"]').hasText('two');
    assert.deepEqual(getOptions(), ['one', 'two', 'three']);
    assert.verifySteps([]);

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowDown');
    await raf();
    assert.dom('.select-box__option[aria-current="true"]').hasText('three');
    assert.deepEqual(getOptions(), ['one', 'two', 'three', 'four']);
    assert.verifySteps(['scroll 16']);

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowDown');
    await raf();
    assert.dom('.select-box__option[aria-current="true"]').hasText('four');
    assert.deepEqual(getOptions(), ['two', 'three', 'four', 'five']);
    assert.verifySteps(['scroll 32']);

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowDown');
    await raf();
    assert.dom('.select-box__option[aria-current="true"]').hasText('five');
    assert.deepEqual(getOptions(), ['three', 'four', 'five', 'six']);
    assert.verifySteps(['scroll 48']);

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowDown');
    await raf();
    assert.dom('.select-box__option[aria-current="true"]').hasText('six');
    assert.deepEqual(getOptions(), ['four', 'five', 'six']);

    assert.verifySteps([]);
  });

  skip('filtering', async function (assert) {
    assert.expect(11);

    const options = Array.from({ length: 100 }, (_, i) => `Item ${i}`);

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

    await raf();
    assert.dom('.select-box__option').exists({ count: 3 });

    assert.deepEqual(getOptions(), ['Item 0', 'Item 1', 'Item 2']);

    await fillIn('.select-box__input', '1');
    await raf();

    assert.deepEqual(getOptions(), ['Item 1', 'Item 10', 'Item 11']);

    await fillIn('.select-box__input', '');
    await raf();

    assert.deepEqual(getOptions(), ['Item 0', 'Item 1', 'Item 2']);
  });
});
