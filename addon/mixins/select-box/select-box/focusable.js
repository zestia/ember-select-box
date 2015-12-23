import Mixin from 'ember-metal/mixin';

export default Mixin.create({
  attributeBindings: ['tabIndex:tabindex'],

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('tabIndex', this.getAttr('tabindex') || 0);
  },

  focusIn(e) {
    this._super(...arguments);
    this.set('isFocused', true);
    this.sendAction('on-focus-in', e, this.get('api'));
  },

  focusOut(e) {
    this._super(...arguments);
    this.set('isFocused', false);
    this.sendAction('on-focus-out', e, this.get('api'));
  }
});
