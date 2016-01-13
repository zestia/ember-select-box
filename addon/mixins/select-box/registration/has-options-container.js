import Mixin from 'ember-metal/mixin';
import { assert } from 'ember-metal/utils';

export default Mixin.create({
  actions: {
    _registerOptionsContainer(container) {
      assert(
        'A select box can only have 1 options container',
        !this.get('optionsContainer')
      );
      this.set('optionsContainer', container);
    },

    _deregisterOptionsContainer() {
      this.set('optionsContainer', null);
    }
  }
});