import Mixin from '@ember/object/mixin';
import { A as emberA } from '@ember/array';
import { set } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

export default Mixin.create({
  init() {
    this._super(...arguments);
    set(this, '_selectedOptions', emberA());
    set(this, 'selectedOptions', emberA());
  },

  _scheduleUpdateSelectedOptions() {
    scheduleOnce('afterRender', this, '_updateSelectedOptions');
  },

  _updateSelectedOptions() {
    set(this, 'selectedOptions', emberA(this._selectedOptions.toArray()));
  },

  actions: {
    _registerSelectedOption(selectedOption) {
      this._selectedOptions.addObject(selectedOption);
      this._scheduleUpdateSelectedOptions();
    },

    _deregisterSelectedOption(selectedOption) {
      this._selectedOptions.removeObject(selectedOption);
      this._scheduleUpdateSelectedOptions();
    }
  }
});
