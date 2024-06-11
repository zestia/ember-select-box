import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, find } from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options />
      </SelectBox>
    </template>);

    assert.dom('.select-box').hasTagName('div');
  });

  test('splattributes', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox class="foo" as |sb|>
        <sb.Options />
      </SelectBox>
    </template>);

    assert.dom('.select-box').hasClass('foo');
  });

  test('expanded (listbox)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options />
      </SelectBox>
    </template>);

    assert.dom('.select-box').doesNotHaveAttribute('data-open');
  });

  test('expanded (combobox)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
      </SelectBox>
    </template>);

    assert.dom('.select-box').hasAttribute('data-open', 'false');
  });

  test('scroll into view', async function (assert) {
    assert.expect(1);

    await render(<template>
      <style>
        .select-box__options { overflow: scroll; height: 1em; }
      </style>

      <SelectBox @value={{2}} as |sb|>
        <sb.Trigger />
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
  });
});
