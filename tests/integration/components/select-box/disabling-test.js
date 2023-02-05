import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (disabling)', function (hooks) {
  setupRenderingTest(hooks);

  test('disabled (input only)', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox @disabled={{true}} as |sb|>
        <sb.Input />
        <sb.Options>
          <sb.Option />
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.select-box').hasAttribute('data-disabled', 'true');
    assert.dom('.select-box__input').isDisabled();
    assert
      .dom('.select-box__option[aria-disabled="true"]')
      .exists({ count: 3 });
  });

  test('disabled (trigger only)', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <SelectBox @disabled={{true}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option />
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.select-box').hasAttribute('data-disabled', 'true');
    assert.dom('.select-box__trigger').hasAttribute('aria-disabled', 'true');
    assert.dom('.select-box__trigger').hasAttribute('tabindex', '-1');
    assert
      .dom('.select-box__option[aria-disabled="true"]')
      .exists({ count: 3 });
  });

  test('disabled with a value', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <SelectBox @value={{2}} @disabled={{true}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value={{1}} />
          <sb.Option @value={{2}} />
          <sb.Option @value={{1}} />
        </sb.Options>
      </SelectBox>
    `);

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'true')
      .hasAttribute(
        'aria-disabled',
        'true',
        'option is still selected, even though disabled'
      );
  });
});
