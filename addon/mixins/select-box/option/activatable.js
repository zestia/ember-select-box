import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('activeIndex', this.get('-active-index'));
  },

  isActive: computed('index', 'activeIndex', function() {
    return this.get('index') === this.get('activeIndex');
  }),

  '-on-activate'() {},
  'on-activate'() {},

  actions: {
    activate() {
      this._super(...arguments);
      this.get('-on-activate')(this.get('index'));
    },

    _activate() {
      this.get('on-activate')(this.get('value'), this.get('-api'));
    }
  }
});
