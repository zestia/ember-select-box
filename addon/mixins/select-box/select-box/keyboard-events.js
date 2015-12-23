import Mixin from 'ember-metal/mixin';
import { capitalize } from 'ember-string';

const keys = {
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
  keyDown(...args) {
    this._super(...args);
    this._runKeyPressAction(...args);
    this._runKeyPressMethod(...args);
  },

  _runKeyPressAction(e) {
    let key = keys[e.which];
    if (!key) { return; }
    let actionName = `on-press-${key}`;
    this.sendAction(actionName, e, this.get('api'));
  },

  _runKeyPressMethod(e) {
    let key = capitalize(keys[e.which] || '');
    if (!key) { return; }
    let methodName = `press${key}`;
    let func = this[methodName];
    if (typeof func === 'function') {
      func.apply(this, arguments);
    }
  }
});
