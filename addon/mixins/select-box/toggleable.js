import Mixin from '@ember/object/mixin';
import { isPresent } from '@ember/utils';
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

      if (this.isDestroyed) {
        return;
      }

      set(this, 'isOpen', false);
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
