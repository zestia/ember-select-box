import Mixin from '@ember/object/mixin';
import { scheduleOnce } from '@ember/runloop';

export default Mixin.create({
  _overrideTabIndex() {
    if (this.get('isDestroyed')) {
      return;
    }
    this.set('tabIndex', -1);
  },

  actions: {
    _inputText() {},

    _registerInput() {
      this._super(...arguments);
      scheduleOnce('afterRender', this, '_overrideTabIndex');
    }
  }
});
