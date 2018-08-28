import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import invokeAction from '../../../utils/invoke-action';

export default Mixin.create({
  isActive: computed('index', '-parent-active-index', function() {
    return this.index === this['-parent-active-index'];
  }),

  actions: {
    activate() {
      this._super(...arguments);
      invokeAction(this, '-on-activate', this.index);
    },

    _activated() {
      invokeAction(this, 'on-activate', this.internalValue, this['-parent-api']);
    }
  }
});
