import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, settled, find } from '@ember/test-helpers';
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
    assert.expect(8);

    const state = new (class {
      @tracked value = 2;
    })();

    await render(<template>
      {{! template-lint-disable no-forbidden-elements }}
      <style>
        .select-box__options { overflow: scroll; height: 1em; }
        .select-box__option { line-height: 1 }
      </style>

      <SelectBox @value={{state.value}} as |sb|>
        <sb.Options>
          <sb.Option @value={{1}}>One</sb.Option>
          <sb.Option @value={{2}}>Two</sb.Option>
          <sb.Option @value={{3}}>Three</sb.Option>
        </sb.Options>
      </SelectBox>
    </template>);

    assert.strictEqual(
      find('.select-box__options').scrollTop,
      0,
      `does not trigger scroll into view on the active option
       on initial render, we don't want to accidently cause
       pages to jump around`
    );

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'true')
      .hasAttribute('aria-current', 'true');

    state.value = 3;

    await settled();

    assert.strictEqual(
      find('.select-box__options').scrollTop,
      0,
      `changing the value programatically does not scroll the active
       option into view. scrolling into view should only happen as
       a result of the user interacting with the select box`
    );

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
