import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, triggerEvent, blur, focus, render } from '@ember/test-helpers';
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

  test('disabled tabindex', async function (assert) {
    assert.expect(3);

    await render(hbs`<SelectBox @disabled={{this.disabled}} />`);

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

  test('tabindex', async function (assert) {
    assert.expect(1);

    await render(hbs`
      {{! template-lint-disable no-positive-tabindex }}
      <SelectBox tabindex="2" />
    `);

    assert
      .dom('.select-box')
      .hasAttribute('tabindex', '2', 'can still set tabindex');
  });
});
