import Mixin from '@ember/object/mixin';
import { A as emberA } from '@ember/array';
import { set } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

export default Mixin.create({
  init() {
    this._super(...arguments);
    set(this, '_options', emberA());
    set(this, 'options', emberA());
  },

  _scheduleUpdateOptions() {
    scheduleOnce('afterRender', this, '_updateOptions');
  },

  _updateOptions() {
    set(this, 'options', emberA(this._options.toArray()));
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
