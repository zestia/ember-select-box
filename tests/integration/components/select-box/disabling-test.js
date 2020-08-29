import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (disabling)', function (hooks) {
  setupRenderingTest(hooks);

  test('default', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox />`);

    assert
      .dom('.select-box')
      .hasAttribute('aria-disabled', 'false', 'enabled by default');
  });

  test('disabling and enabling', async function (assert) {
    assert.expect(2);

    this.set('isDisabled', true);

    await render(hbs`<SelectBox @disabled={{this.isDisabled}} />`);

    assert
      .dom('.select-box')
      .hasAttribute('aria-disabled', 'true', 'can set the disabled state');

    this.set('isDisabled', false);

    assert
      .dom('.select-box')
      .hasAttribute('aria-disabled', 'false', 'can change the disabled state');
  });

  test('presence of an input', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox @disabled={{true}} as |sb|>
        <sb.Input />
      </SelectBox>
    `);

    assert
      .dom('.select-box__input')
      .isDisabled(
        "a select box's input element is disabled if the select box is disabled"
      );
  });
});
