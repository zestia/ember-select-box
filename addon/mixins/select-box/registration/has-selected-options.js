import Mixin from '@ember/object/mixin';
import { A as emberA } from '@ember/array';

export default Mixin.create({
  init() {
    this._super(...arguments);
    this.set('selectedOptions', emberA());
  },

  actions: {
    _registerSelectedOption(selectedOption) {
      this.get('selectedOptions').addObject(selectedOption);
    },

    _deregisterSelectedOption(selectedOption) {
      this.get('selectedOptions').removeObject(selectedOption);
    }
  }
});
