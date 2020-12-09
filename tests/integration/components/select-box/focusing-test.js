import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, triggerEvent, focus, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (focusing)', function (hooks) {
  setupRenderingTest(hooks);

  test('onFocusLeave fires when focus has actually left the select box', async function (assert) {
    assert.expect(5);

    this.handleFocusLeave = () => assert.step('focus leave');

    await render(hbs`
      <SelectBox
        @onFocusLeave={{this.handleFocusLeave}}
      >
        <button type="button" class="in"></button>
      </SelectBox>

      <button type="button" class="out"></button>
    `);

    const elIn = find('.in');
    const elOut = find('.out');

    await triggerEvent('.select-box', 'focusout', { relatedTarget: elIn });

    assert.verifySteps([]);

    await triggerEvent('.select-box', 'focusout', { relatedTarget: elOut });

    assert.verifySteps(['focus leave']);

    assert.verifySteps([]);

    await focus('.in');

    await triggerEvent('.select-box', 'focusout');

    assert.verifySteps([]);
  });

  test('disabled tabindex (without input)', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox @disabled={{this.disabled}} />
    `);

    assert
      .dom('.select-box')
      .hasAttribute('tabindex', '0', 'precondition: focusable');

    this.set('disabled', true);

    assert
      .dom('.select-box')
      .hasAttribute('tabindex', '-1', 'disabling, disables focusability');

    this.set('disabled', false);

    assert
      .dom('.select-box')
      .hasAttribute('tabindex', '0', 're-enabling, re-enables focusability');
  });

  test('disabled tabindex (with input)', async function (assert) {
    assert.expect(2);

    this.disabled = true;

    await render(hbs`
      <SelectBox @disabled={{this.disabled}} as |sb|>
        <sb.Input />
      </SelectBox>
    `);

    assert
      .dom('.select-box')
      .hasAttribute('tabindex', '-1', 'not focusable when disabled');

    this.set('disabled', false);

    assert
      .dom('.select-box')
      .hasAttribute(
        'tabindex',
        '-1',
        're-enabling has correct tab index ' +
          'still not focusable because it is a combobox (has an input)'
      );
  });

  test('initially disabled', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox @disabled={{true}} />`);

    assert
      .dom('.select-box')
      .hasAttribute('tabindex', '-1', 'will not be focusable');
  });

  test('manual tabindex', async function (assert) {
    assert.expect(1);

    await render(hbs`
      {{! template-lint-disable no-positive-tabindex }}
      <SelectBox tabindex="2" />
    `);

    assert
      .dom('.select-box')
      .hasAttribute('tabindex', '2', 'can still set tabindex');
  });

  test('focusing options', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Option @value={{1}}>One</sb.Option>
        <sb.Option @value={{2}} tabindex="0">Two</sb.Option>
      </SelectBox>
    `);

    const one = find('.select-box__option:nth-child(1)');
    const two = find('.select-box__option:nth-child(2)');

    try {
      await focus(one);
    } catch (error) {
      assert.dom(one).isNotFocused('cannot focus a div option by default');
    }

    await focus(two);

    assert
      .dom(two)
      .isFocused('can focus an option that specifically has a tabindex');

    assert
      .dom(two)
      .hasAttribute('aria-current', 'true', 'focusing an option activates it');
  });
});
