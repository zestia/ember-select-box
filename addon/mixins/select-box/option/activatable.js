import Mixin from '@ember/object/mixin';
import { computed, get } from '@ember/object';
import invokeAction from '../../../utils/invoke-action';

export default Mixin.create({
  isActive: computed('index', '_parentActiveIndex', function() {
    return get(this, 'index') === this._parentActiveIndex;
  }),

  actions: {
    activate() {
      this._super(...arguments);
      invokeAction(this, '_onActivate', get(this, 'index'));
    },

    _activated() {
      invokeAction(this, 'on-activate', this.internalValue, this._parentApi);
    }
  }
});
