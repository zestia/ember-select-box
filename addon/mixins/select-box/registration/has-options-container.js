import Mixin from '@ember/object/mixin';
import { set } from '@ember/object';
import { assert } from '@ember/debug';

export default Mixin.create({
  actions: {
    _registerOptionsContainer(container) {
      assert('A select box can only have 1 options container', !this.optionsContainer);
      set(this, 'optionsContainer', container);
    },

    _deregisterOptionsContainer() {
      set(this, 'optionsContainer', null);
    }
  }
});
