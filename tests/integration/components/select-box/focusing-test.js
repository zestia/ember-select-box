import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { blur, focus, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (focusing)', function(hooks) {
  setupRenderingTest(hooks);

  test('focus class name', async function(assert) {
    assert.expect(3);

    await render(hbs`<SelectBox />`);

    assert
      .dom('.select-box')
      .doesNotHaveClass('select-box--focused', 'precondition, not focused');

    await focus('.select-box');

    assert
      .dom('.select-box')
      .hasClass(
        'select-box--focused',
        'a focused select box has an appropriate class name'
      );

    await blur('.select-box');

    assert
      .dom('.select-box')
      .doesNotHaveClass(
        'select-box--focused',
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
        @onFocusOut={{this.blurred}} as |sb|>
        <sb.Input />
      </SelectBox>
    `);

    await focus('.select-box__input');

    assert.ok(sentFocusIn, true, 'sends a focus in action');

    await blur('.select-box__input', 'blur');

    assert.ok(sentFocusOut, true, 'sends a focus out action');
  });

  test('tabindex', async function(assert) {
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
});
