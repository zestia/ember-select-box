import Mixin from 'ember-metal/mixin';
import Ember from 'ember';
import { scheduleOnce } from 'ember-runloop';
const { K } = Ember;

export default Mixin.create({
  _overrideTabIndex() {
    this.set('tabIndex', -1);
  },

  actions: {
    inputText: K,

    _registerInput() {
      this._super(...arguments);
      scheduleOnce('afterRender', this, '_overrideTabIndex');
    }
  }
});
