import Mixin from 'ember-metal/mixin';
import { assert } from 'ember-metal/utils';

export default Mixin.create({
  actions: {
    registerInput(input) {
      if (this.get('input')) {
        assert('select-box can only have 1 input', !this.get('input'));
      }
      this.set('input', input);
    },

    deregisterInput() {
      this.set('input', null);
    }
  }
});
