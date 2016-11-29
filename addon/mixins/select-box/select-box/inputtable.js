import Mixin from 'ember-metal/mixin';
import { scheduleOnce } from 'ember-runloop';

export default Mixin.create({
  _overrideTabIndex() {
    this.set('tabIndex', -1);
  },

  actions: {
    inputText() {},

    _registerInput() {
      this._super(...arguments);
      scheduleOnce('afterRender', this, '_overrideTabIndex');
    }
  }
});
