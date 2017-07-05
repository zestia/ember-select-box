import Mixin from 'ember-metal/mixin';
import { isPresent } from 'ember-utils';
import run from 'ember-runloop';

export default Mixin.create({
  isOpen: false,

  didReceiveAttrs() {
    this._super(...arguments);
    const open = this.get('is-open');
    if (isPresent(open)) {
      this.set('isOpen', open);
    }
  },

  actions: {
    open() {
      this.set('isOpen', true);
    },

    close() {
      run(() => this.set('isClosing', true));
      run(() => this.set('isOpen', false));
      run(() => this.set('isClosing', false));
    },

    toggle() {
      if (this.get('isOpen')) {
        this.send('close');
      } else {
        this.send('open');
      }
    }
  }
});
