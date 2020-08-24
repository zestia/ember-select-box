import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (disabling)', function (hooks) {
  setupRenderingTest(hooks);

  test('disabling and enabling', async function (assert) {
    assert.expect(4);

    await render(hbs`<SelectBox />`);

    assert
      .dom('.select-box')
      .hasAttribute('aria-disabled', 'false', 'enabled by default');

    this.set('isDisabled', true);

    await render(hbs`<SelectBox @disabled={{this.isDisabled}} />`);

    assert
      .dom('.select-box')
      .hasAttribute(
        'aria-disabled',
        'true',
        'can set the disabled state, adding a class name'
      );

    this.set('isDisabled', false);

    assert
      .dom('.select-box')
      .hasAttribute(
        'aria-disabled',
        'false',
        'can change the disabled state, removing the class name'
      );

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
