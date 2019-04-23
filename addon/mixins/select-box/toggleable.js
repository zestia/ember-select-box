import Mixin from '@ember/object/mixin';
import { isPresent } from '@ember/utils';
import { run } from '@ember/runloop';
import { set, trySet } from '@ember/object';
import invokeAction from '../../utils/invoke-action';

export default Mixin.create({
  isOpen: false,

  didReceiveAttrs() {
    this._super(...arguments);

    if (isPresent(this.open)) {
      set(this, 'isOpen', this.open);
    }
  },

  actions: {
    open() {
      this._super(...arguments);

      if (this.isDestroyed) {
        return;
      }

      set(this, 'isOpen', true);
      invokeAction(this, 'onOpen', this.api);
    },

    close() {
      this._super(...arguments);

      run(() => trySet(this, 'isClosing', true));
      run(() => trySet(this, 'isOpen', false));
      run(() => trySet(this, 'isClosing', false));

      if (this.isDestroyed) {
        return;
      }

      invokeAction(this, 'onClose', this.api);
    },

    toggle() {
      this._super(...arguments);

      if (this.isOpen) {
        this.send('close');
      } else {
        this.send('open');
      }
    }
  }
});
