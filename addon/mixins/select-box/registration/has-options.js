import Mixin from 'ember-metal/mixin';
import { A as emberA } from 'ember-array/utils';
import { scheduleOnce } from 'ember-runloop';

export default Mixin.create({
  init() {
    this._super(...arguments);
    this.set('_options', emberA());
    this.set('options', emberA());
  },

  _scheduleUpdateOptions() {
    scheduleOnce('afterRender', this, '_updateOptions');
  },

  _updateOptions() {
    this.set('options', emberA(this.get('_options').toArray()));
  },

  actions: {
    _registerOption(option) {
      this.get('_options').addObject(option);
      this._scheduleUpdateOptions();
    },

    _deregisterOption(option) {
      this.get('_options').removeObject(option);
      this._scheduleUpdateOptions();
    }
  }
});
