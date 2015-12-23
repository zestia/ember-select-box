import Mixin from 'ember-metal/mixin';
import { assert } from 'ember-metal/utils';

export default Mixin.create({
  actions: {
    registerOptionsContainer(container) {
      assert(
        'A select box can only have 1 options container',
        !this.get('optionsContainer')
      );
      this.set('optionsContainer', container);
    },

    deregisterOptionsContainer() {
      this.set('optionsContainer', null);
    }
  }
});