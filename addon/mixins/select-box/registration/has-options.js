import Mixin from '@ember/object/mixin';
import { A as emberA } from '@ember/array';

export default Mixin.create({
  init() {
    this._super(...arguments);
    this.set('options', emberA());
  },

  actions: {
    _registerOption(option) {
      this.get('options').addObject(option);
    },

    _deregisterOption(option) {
      this.get('options').removeObject(option);
    }
  }
});
