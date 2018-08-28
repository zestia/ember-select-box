import Mixin from '@ember/object/mixin';
import { A as emberA } from '@ember/array';
import { scheduleOnce } from '@ember/runloop';

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
    this.set('options', emberA(this._options.toArray()));
  },

  actions: {
    _registerOption(option) {
      this._options.addObject(option);
      this._scheduleUpdateOptions();
    },

    _deregisterOption(option) {
      this._options.removeObject(option);
      this._scheduleUpdateOptions();
    }
  }
});
