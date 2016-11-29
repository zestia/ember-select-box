import Mixin from 'ember-metal/mixin';
import { isPresent } from 'ember-utils';

export default Mixin.create({
  isOpen: false,

  didReceiveAttrs() {
    this._super(...arguments);
    const open = this.getAttr('is-open');
    if (isPresent(open)) {
      this.set('isOpen', open);
    }
  },

  actions: {
    open() {
      this.set('isOpen', true);
    },

    close() {
      this.set('isOpen', false);
    },

    toggle() {
      this.toggleProperty('isOpen');
    }
  }
});
