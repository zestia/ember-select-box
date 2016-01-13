import Mixin from 'ember-metal/mixin';
import computed from 'ember-computed';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('activeIndex', this.getAttr('-active-index'));
  },

  isActive: computed('index', 'activeIndex', function() {
    return this.get('index') === this.get('activeIndex');
  }),

  actions: {
    activate() {
      this._super(...arguments);
      this.sendAction('-activate', this.get('index'));
    },

    _activate() {
      this.sendAction('on-activate', this.get('value'), this.getAttr('-api'));
    }
  }
});
