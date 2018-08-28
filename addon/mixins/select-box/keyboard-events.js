import Mixin from '@ember/object/mixin';
import { capitalize } from '@ember/string';
import invokeAction from '../../utils/invoke-action';

export const keys = {
  8:  'backspace',
  9:  'tab',
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
    this._keyPressAction(...arguments);
    this._keyPressMethod(...arguments);
  },

  _keyPressAction(e) {
    invokeAction(this, `on-press-key`, e, this.api);

    const key = keys[e.keyCode];

    if (!key) {
      return;
    }

    invokeAction(this, `on-press-${key}`, e, this.api);
  },

  _keyPressMethod(e) {
    const key = capitalize(keys[e.keyCode] || '');

    if (!key) {
      return;
    }

    const method = this[`press${key}`];

    if (typeof method !== 'function') {
      return;
    }

    method.apply(this, arguments);
  }
});
