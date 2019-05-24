import Mixin from '@ember/object/mixin';
import { set } from '@ember/object';
import { isPresent } from '@ember/utils';
import invokeAction from '../../utils/invoke-action';

export default Mixin.create({
  attributeBindings: ['tabIndex:tabindex'],

  didReceiveAttrs() {
    this._super(...arguments);

    if (isPresent(this.tabindex)) {
      set(this, 'tabIndex', this.tabindex);
    }

    if (!isPresent(this.tabIndex)) {
      set(this, 'tabIndex', '0');
    }
  },

  focusIn(e) {
    this._super(...arguments);

    if (this.isDestroyed) {
      return;
    }

    set(this, 'isFocused', true);
    invokeAction(this, 'onFocusIn', e, this.api);
  },

  focusOut(e) {
    this._super(...arguments);

    if (this.isDestroyed) {
      return;
    }

    try {
      set(this, 'isFocused', false);
    } catch (error) {
      // https://github.com/emberjs/ember.js/issues/18043
    }

    invokeAction(this, 'onFocusOut', e, this.api);
  }
});
