import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (focusing)', function(hooks) {
  setupRenderingTest(hooks);

  test('focus class name', async function(assert) {
    assert.expect(3);

    await render(hbs`<SelectBox />`);

    assert.dom('.select-box').doesNotHaveClass('is-focused', 'precondition, not focused');

    await triggerEvent('.select-box', 'focus');

    assert
      .dom('.select-box')
      .hasClass('is-focused', 'a focused select box has an appropriate class name');

    await triggerEvent('.select-box', 'blur');

    assert
      .dom('.select-box')
      .doesNotHaveClass(
        'is-focused',
        'the focused class name is removed when the select box is blurred'
      );
  });

  test('focus actions', async function(assert) {
    assert.expect(2);

    let sentFocusIn;
    let sentFocusOut;

    this.set('focused', () => (sentFocusIn = true));
    this.set('blurred', () => (sentFocusOut = true));

    await render(hbs`
      <SelectBox
        @onFocusIn={{this.focused}}
        @onFocusOut={{this.blurred}}>
        <button></button>
      </SelectBox>
    `);

    await triggerEvent('button', 'focus');

    assert.ok(sentFocusIn, true, 'sends a focus in action');

    await triggerEvent('button', 'blur');

    assert.ok(sentFocusOut, true, 'sends a focus out action');
  });

  test('tabindex', async function(assert) {
    assert.expect(3);

    await render(hbs`<SelectBox />`);

    assert
      .dom('.select-box')
      .hasAttribute('tabindex', '0', 'it should be possible to focus a select box');

    await render(hbs`<SelectBox @disabled={{true}} />`);

    assert
      .dom('.select-box')
      .hasAttribute('tabindex', '-1', 'it should not be possible to focus a disabled select box');

    await render(hbs`{{select-box tabindex="5"}}`);

    assert.dom('.select-box').hasAttribute('tabindex', '5', 'can set the tabindex');
  });
});
