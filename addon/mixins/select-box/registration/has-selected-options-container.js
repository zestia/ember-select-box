import Mixin from 'ember-metal/mixin';
import { assert } from 'ember-metal/utils';

export default Mixin.create({
  actions: {
    registerSelectedOptionsContainer(container) {
      assert(
        'A select box can only have 1 selected options container',
        !this.get('selectedOptionsContainer')
      );
      this.set('selectedOptionsContainer', container);
    },

    deregisterSelectedOptionsContainer() {
      this.set('selectedOptionsContainer', null);
    }
  }
});