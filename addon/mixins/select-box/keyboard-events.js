import Mixin from '@ember/object/mixin';
import { capitalize } from '@ember/string';
import invokeAction from '../../utils/invoke-action';
import { isAlphaNumericKeyCode } from '../../utils/alpha-num';

export const keys = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  27: 'escape',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
};

export default Mixin.create({
  keyDown() {
    this._super(...arguments);
    this._handleKeyPress(...arguments);
  },

  _handleKeyPress(e) {
    invokeAction(this, `onPressKey`, e, this.api);

    if (isAlphaNumericKeyCode(e.keyCode)) {
      invokeAction(this, `onPressAlphanum`, e, this.api);
      return;
    }

    let key = keys[e.keyCode];

    if (key) {
      key = capitalize(key);

      invokeAction(this, `onPress${key}`, e, this.api);
      invokeAction(this, `_onPress${key}`, e);
    }
  }
});
