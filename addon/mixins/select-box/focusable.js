import Mixin from '@ember/object/mixin';
import { next } from '@ember/runloop';
import trySet from '../../utils/try-set';

export default Mixin.create({
  attributeBindings: ['tabIndex:tabindex'],

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('tabIndex', this.getWithDefault('tabindex', 0));
  },

  focusIn(e) {
    this._super(...arguments);
    this.set('isFocused', true);
    this.getWithDefault('on-focus-in', () => {})(e, this.get('api'));
  },

  focusOut(e) {
    this._super(...arguments);

    if (this.get('isClosing')) {
      next(() => trySet(this, 'isFocused', false));
    } else {
      this.set('isFocused', false);
    }

    this.getWithDefault('on-focus-out', () => {})(e, this.get('api'));
  }
});
