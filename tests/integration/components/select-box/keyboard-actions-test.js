import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { keys as eventKeys } from '@zestia/ember-select-box/mixins/select-box/keyboard-events';
import { render, triggerKeyEvent, settled } from '@ember/test-helpers';
const { keys } = Object;

module('select-box (keyboard actions)', function(hooks) {
  setupRenderingTest(hooks);

  test('keyboard actions', async function(assert) {
    assert.expect(2);

    const called = [];
    let pressedKey = 0;

    this.set('ranAction', name => called.push(name));
    this.set('pressedKey', () => pressedKey++);

    await render(hbs `{{select-box
      on-press-key=(action pressedKey)
      on-press-backspace=(action ranAction "backspace")
      on-press-tab=(action ranAction "tab")
      on-press-enter=(action ranAction "enter")
      on-press-escape=(action ranAction "escape")
      on-press-left=(action ranAction "left")
      on-press-up=(action ranAction "up")
      on-press-right=(action ranAction "right")
      on-press-down=(action ranAction "down")
    }}`);

    keys(eventKeys).forEach(async key => {
      await triggerKeyEvent('.select-box', 'keydown', key);
    });

    await settled();

    assert.deepEqual(called, [
      'backspace',
      'tab',
      'enter',
      'escape',
      'left',
      'up',
      'right',
      'down'
    ], 'calls actions named that of the key that was pressed');

    assert.equal(pressedKey, 8,
      'sends a generic key press action whenever a key is pressed to avoid clash ' +
      'when using keyDown=(action) which would wipeout functionality');
  });
});
