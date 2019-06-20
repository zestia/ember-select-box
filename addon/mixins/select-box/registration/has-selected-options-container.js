import Mixin from '@ember/object/mixin';
import { set } from '@ember/object';
import { assert } from '@ember/debug';

export default Mixin.create({
  actions: {
    _registerSelectedOptionsContainer(container) {
      assert(
        'A select box can only have 1 selected options container',
        !this._selectedOptionsContainer
      );
      set(this, '_selectedOptionsContainer', container);
    },

    _deregisterSelectedOptionsContainer() {
      set(this, '_selectedOptionsContainer', null);
    }
  }
});
