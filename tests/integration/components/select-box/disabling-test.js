import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (disabling)', function(hooks) {
  setupRenderingTest(hooks);

  test('disabling and enabling', async function(assert) {
    assert.expect(4);

    await render(hbs`<SelectBox />`);

    assert.dom('.select-box').doesNotHaveClass('is-disabled', 'enabled by default');

    this.set('isDisabled', true);

    await render(hbs`<SelectBox @disabled={{this.isDisabled}} />`);

    assert
      .dom('.select-box')
      .hasClass('is-disabled', 'can set the disabled state, adding a class name');

    this.set('isDisabled', false);

    assert
      .dom('.select-box')
      .doesNotHaveClass('is-disabled', 'can change the disabled state, removing the class name');

    await render(hbs`
      <SelectBox @disabled={{true}} as |sb|>
        <sb.Input />
      </SelectBox>
    `);

    assert.ok(
      find('.select-box-input').hasAttribute('disabled'),
      "a select box's input element is disabled if the select box is disabled"
    );
  });

  test('aria disabled', async function(assert) {
    assert.expect(2);

    this.set('disabled', true);

    await render(hbs`<SelectBox @disabled={{this.disabled}} />`);

    assert
      .dom('.select-box')
      .hasAttribute('aria-disabled', 'true', 'receives an aria disabled attribute when disabled');

    this.set('disabled', false);

    assert
      .dom('.select-box')
      .hasAttribute('aria-disabled', 'false', 'aria disabled attribute is removed when enabled');
  });

  test('disabled class name', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox @disabled="foo" />`);

    assert
      .dom('.select-box')
      .doesNotHaveClass(
        'foo',
        'classNameBindings should not add the value of `isDisabled` as as a class name'
      );
  });
});
