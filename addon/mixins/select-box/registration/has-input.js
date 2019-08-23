import Mixin from '@ember/object/mixin';
import { set } from '@ember/object';
import { assert } from '@ember/debug';

export default Mixin.create({
  actions: {
    _registerInput(input) {
      assert('select-box can only have 1 input', !this.input);

      set(this, 'input', input);
    },

    _deregisterInput() {
      set(this, 'input', null);
    }
  }
});
