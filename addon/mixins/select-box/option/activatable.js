import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import invokeAction from '../../../utils/invoke-action';

export default Mixin.create({
  isActive: computed('index', '-parent-active-index', function() {
    return this.get('index') === this.get('-parent-active-index');
  }),

  actions: {
    activate() {
      this._super(...arguments);
      invokeAction(this, '-on-activate', this.get('index'));
    },

    _activated() {
      invokeAction(this, 'on-activate', this.get('internalValue'), this.get('-parent-api'));
    }
  }
});
