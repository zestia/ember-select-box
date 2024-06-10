import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, rerender } from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';
import { tracked } from '@glimmer/tracking';

module('select-box (single)', function (hooks) {
  setupRenderingTest(hooks);

  test('single with no value', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute(
        'aria-current',
        'true',
        'keyboard navigation will start from the first matching selected option'
      );

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'false');
  });

  test('single with no initial value', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option @value={{1}} />
        </sb.Options>
      </SelectBox>
    </template>);

    assert
      .dom('.select-box__option[aria-current="true"]')
      .doesNotExist('keyboard navigation will start from the beginning');
  });

  test('single with an initial value', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox @value={{2}} as |sb|>
        <sb.Options>
          <sb.Option @value={{1}} />
          <sb.Option @value={{2}} />
          <sb.Option @value={{3}} />
        </sb.Options>
      </SelectBox>
    </template>);

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute(
        'aria-current',
        'true',
        'keyboard navigation will start from the selected option'
      );
  });

  test('single changing value', async function (assert) {
    assert.expect(6);

    const state = new (class {
      @tracked value = 2;
    })();

    await render(<template>
      <SelectBox @value={{state.value}} as |sb|>
        <sb.Options>
          <sb.Option @value={{1}} />
          <sb.Option @value={{2}} />
          <sb.Option @value={{3}} />
        </sb.Options>
      </SelectBox>
    </template>);

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'true')
      .hasAttribute('aria-current', 'true');

    state.value = 3;

    await rerender();

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .exists({ count: 1 });

    assert.dom('.select-box__option[aria-current="true"]').exists({ count: 1 });

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-selected', 'true')
      .hasAttribute('aria-current', 'true');
  });
});
