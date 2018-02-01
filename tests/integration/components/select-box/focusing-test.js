import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (focusing)', function(hooks) {
  setupRenderingTest(hooks);

  test('focus class name', async function(assert) {
    assert.expect(3);

    const isFocused = () => {
      return this.$('.select-box').hasClass('is-focused');
    };

    await render(hbs `{{select-box}}`);

    assert.ok(!isFocused(),
      'precondition, not focused');

    this.$('.select-box').trigger('focus');

    assert.ok(isFocused(),
      'a focused select box has an appropriate class name');

    this.$('.select-box').trigger('blur');

    assert.ok(!isFocused(),
      'the focused class name is removed when the select box is blurred');
  });

  test('focus actions', async function(assert) {
    assert.expect(2);

    let sentFocusIn;
    let sentFocusOut;

    this.set('focused', () => sentFocusIn = true);
    this.set('blurred', () => sentFocusOut = true);

    await render(hbs `
      {{#select-box
        on-focus-in=(action focused)
        on-focus-out=(action blurred)}}
        <button></button>
      {{/select-box}}
    `);

    this.$('button').trigger('focus');

    assert.ok(sentFocusIn, true,
      'sends a focus in action');

    this.$('button').trigger('blur');

    assert.ok(sentFocusOut, true,
      'sends a focus out action');
  });

  test('tabindex', async function(assert) {
    assert.expect(4);

    const tabindex = () => {
      return this.$('.select-box').attr('tabindex');
    };

    await render(hbs `{{select-box}}`);

    assert.equal(tabindex(), '0',
      'it should be possible to focus a select box');

    await render(hbs `{{select-box disabled=true}}`);

    assert.equal(tabindex(), '-1',
      'it should not be possible to focus a disabled select box');

    await render(hbs `{{select-box tabindex=5}}`);

    assert.equal(tabindex(), '5',
      'can set the tabindex');

    await render(hbs `
      {{#select-box as |sb|}}
        {{sb.input}}
      {{/select-box}}
    `);

    assert.equal(tabindex(), '-1',
      'a select box should not be focusable if it contains an input ' +
      'instead, pressing tab should jump directly to the input');
  });
});
