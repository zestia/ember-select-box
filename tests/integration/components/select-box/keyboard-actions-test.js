import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render, triggerKeyEvent } from '@ember/test-helpers';

module('select-box (keyboard actions)', function (hooks) {
  setupRenderingTest(hooks);

  test('keyboard actions', async function (assert) {
    assert.expect(11);

    this.handleAction = (name) => assert.step(name);
    this.handlePressKey = () => assert.step('pressed key');

    await render(hbs`<SelectBox
      @onPressKey={{this.handlePressKey}}
      @onPressBackspace={{fn this.handleAction "backspace"}}
      @onPressTab={{fn this.handleAction "tab"}}
      @onPressEnter={{fn this.handleAction "enter"}}
      @onPressEscape={{fn this.handleAction "escape"}}
      @onPressLeft={{fn this.handleAction "left"}}
      @onPressUp={{fn this.handleAction "up"}}
      @onPressRight={{fn this.handleAction "right"}}
      @onPressDown={{fn this.handleAction "down"}}
    />`);

    await triggerKeyEvent('.select-box', 'keydown', 8);
    await triggerKeyEvent('.select-box', 'keydown', 9);
    await triggerKeyEvent('.select-box', 'keydown', 13);
    await triggerKeyEvent('.select-box', 'keydown', 27);
    await triggerKeyEvent('.select-box', 'keydown', 37);
    await triggerKeyEvent('.select-box', 'keydown', 38);
    await triggerKeyEvent('.select-box', 'keydown', 39);
    await triggerKeyEvent('.select-box', 'keydown', 40);

    assert.verifySteps(
      ['backspace', 'tab', 'enter', 'escape', 'left', 'up', 'right', 'down'],
      'calls actions named that of the key that was pressed'
    );

    await triggerKeyEvent('.select-box', 'keypress', 65); // a

    assert.verifySteps(
      ['pressed key'],
      'sends key press action when characters are input'
    );
  });
});
