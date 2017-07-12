import Mixin from 'ember-metal/mixin';
import { isPresent } from 'ember-utils';
import run from 'ember-runloop';
import trySet from '../../../utils/try-set';

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
      this.sendAction('on-open', this.get('api'));
    },

    close() {
      run(() => trySet(this, 'isClosing', true));
      run(() => trySet(this, 'isOpen', false));
      run(() => trySet(this, 'isClosing', false));
      this.sendAction('on-close', this.get('api'));
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
