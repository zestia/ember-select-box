import Mixin from '@ember/object/mixin';
import { set } from '@ember/object';

export default Mixin.create({
  tabIndex: '0',

  actions: {
    _onFocusIn(e) {
      this._super(...arguments);

      if (this.isDestroyed) {
        return;
      }

      set(this, 'isFocused', true);
    },

    _onFocusOut(e) {
      this._super(...arguments);

      if (this.isDestroyed) {
        return;
      }

      try {
        set(this, 'isFocused', false);
      } catch (error) {
        // https://github.com/emberjs/ember.js/issues/18043
      }
    }
  }
});
