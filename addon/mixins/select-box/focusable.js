import Mixin from '@ember/object/mixin';
import { set } from '@ember/object';
import invokeAction from '../../utils/invoke-action';

export default Mixin.create({
  tabIndex: '0',

  actions: {
    _onfocus(e) {
      this._super(...arguments);

      if (this.isDestroyed) {
        return;
      }

      set(this, 'isFocused', true);
      invokeAction(this, 'onFocus', e, this.api);
    },

    _onblur(e) {
      this._super(...arguments);

      if (this.isDestroyed) {
        return;
      }

      try {
        set(this, 'isFocused', false);
      } catch (error) {
        // https://github.com/emberjs/ember.js/issues/18043
      }

      invokeAction(this, 'onBlur', e, this.api);
    }
  }
});
