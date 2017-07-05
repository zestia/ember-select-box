import Mixin from 'ember-metal/mixin';
import { next } from 'ember-runloop';

export default Mixin.create({
  attributeBindings: ['tabIndex:tabindex'],

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('tabIndex', this.getWithDefault('tabindex', 0));
  },

  focusIn(e) {
    this._super(...arguments);
    this.set('isFocused', true);
    this.sendAction('on-focus-in', e, this.get('api'));
  },

  focusOut(e) {
    this._super(...arguments);
    if (this.get('isClosing')) {
      next(() => this.set('isFocused', false));
    } else {
      this.set('isFocused', false);
    }
    this.sendAction('on-focus-out', e, this.get('api'));
  }
});
