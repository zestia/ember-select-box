import Mixin from 'ember-metal/mixin';

export default Mixin.create({
  isOpen: false,

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('isOpen', this.getAttr('is-open'));
  },

  actions: {
    open() {
      this.set('isOpen', true);
    },

    close() {
      this.set('isOpen', false);
    },

    toggle() {
      this.toggleProperty('isOpen');
    }
  }
});
