import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';

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
});
