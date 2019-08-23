import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render, triggerKeyEvent } from '@ember/test-helpers';

module('select-box (keyboard actions)', function(hooks) {
  setupRenderingTest(hooks);

  test('keyboard actions', async function(assert) {
    assert.expect(3);

    const called = [];
    let pressedKey = 0;

    this.set('ranAction', name => called.push(name));
    this.set('pressedKey', () => pressedKey++);

    await render(hbs`<SelectBox
      @onPressKey={{this.pressedKey}}
      @onPressBackspace={{action this.ranAction "backspace"}}
      @onPressTab={{action this.ranAction "tab"}}
      @onPressEnter={{action this.ranAction "enter"}}
      @onPressEscape={{action this.ranAction "escape"}}
      @onPressLeft={{action this.ranAction "left"}}
      @onPressUp={{action this.ranAction "up"}}
      @onPressRight={{action this.ranAction "right"}}
      @onPressDown={{action this.ranAction "down"}}
    />`);

    await triggerKeyEvent('.select-box', 'keydown', 8);
    await triggerKeyEvent('.select-box', 'keydown', 9);
    await triggerKeyEvent('.select-box', 'keydown', 13);
    await triggerKeyEvent('.select-box', 'keydown', 27);
    await triggerKeyEvent('.select-box', 'keydown', 37);
    await triggerKeyEvent('.select-box', 'keydown', 38);
    await triggerKeyEvent('.select-box', 'keydown', 39);
    await triggerKeyEvent('.select-box', 'keydown', 40);

    assert.deepEqual(
      called,
      ['backspace', 'tab', 'enter', 'escape', 'left', 'up', 'right', 'down'],
      'calls actions named that of the key that was pressed'
    );

    assert.equal(pressedKey, 0, 'no characters input yet');

    await triggerKeyEvent('.select-box', 'keypress', 65); // a

    assert.equal(
      pressedKey,
      1,
      'sends key press action when characters are input'
    );
  });
});
