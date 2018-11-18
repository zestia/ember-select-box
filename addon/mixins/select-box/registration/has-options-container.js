import Mixin from '@ember/object/mixin';
import { assert } from '@ember/debug';

export default Mixin.create({
  actions: {
    _registerOptionsContainer(container) {
      assert('A select box can only have 1 options container', !this.optionsContainer);
      this.set('optionsContainer', container);
    },

    _deregisterOptionsContainer() {
      this.set('optionsContainer', null);
    }
  }
});
