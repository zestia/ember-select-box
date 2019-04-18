import Mixin from '@ember/object/mixin';
import { isPresent } from '@ember/utils';
import { run } from '@ember/runloop';
import { set } from '@ember/object';
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

      run(() => {
        if (this.isDestroyed) {
          return;
        }

        set(this, 'isClosing', true);
        set(this, 'isOpen', false);
      });

      run(() => {
        if (this.isDestroyed) {
          return;
        }

        invokeAction(this, 'onClose', this.api);
        set(this, 'isClosing', false);
      });
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
