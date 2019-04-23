import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (focusing)', function(hooks) {
  setupRenderingTest(hooks);

  test('focus class name', async function(assert) {
    assert.expect(3);

    const isFocused = () => {
      return find('.select-box').classList.contains('is-focused');
    };

    await render(hbs`{{select-box}}`);

    assert.ok(!isFocused(), 'precondition, not focused');

    await triggerEvent('.select-box', 'focus');

    assert.ok(isFocused(), 'a focused select box has an appropriate class name');

    await triggerEvent('.select-box', 'blur');

    assert.ok(!isFocused(), 'the focused class name is removed when the select box is blurred');
  });

  test('focus actions', async function(assert) {
    assert.expect(2);

    let sentFocusIn;
    let sentFocusOut;

    this.set('focused', () => (sentFocusIn = true));
    this.set('blurred', () => (sentFocusOut = true));

    await render(hbs`
      {{#select-box
        onFocusIn=this.focused
        onFocusOut=this.blurred}}
        <button></button>
      {{/select-box}}
    `);

    await triggerEvent('button', 'focus');

    assert.ok(sentFocusIn, true, 'sends a focus in action');

    await triggerEvent('button', 'blur');

    assert.ok(sentFocusOut, true, 'sends a focus out action');
  });

  test('tabindex', async function(assert) {
    assert.expect(4);

    const tabindex = () => {
      return find('.select-box').getAttribute('tabindex');
    };

    await render(hbs`{{select-box}}`);

    assert.equal(tabindex(), '0', 'it should be possible to focus a select box');

    await render(hbs`{{select-box disabled=true}}`);

    assert.equal(tabindex(), '-1', 'it should not be possible to focus a disabled select box');

    await render(hbs`{{select-box tabindex=5}}`);

    assert.equal(tabindex(), '5', 'can set the tabindex');

    await render(hbs`
      {{#select-box as |sb|}}
        {{sb.Input}}
      {{/select-box}}
    `);

    assert.equal(
      tabindex(),
      '-1',
      'a select box should not be focusable if it contains an input ' +
        'instead, pressing tab should jump directly to the input'
    );
  });
});
