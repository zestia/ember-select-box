import Mixin from 'ember-metal/mixin';
import computed from 'ember-computed';
import { A as emberA } from 'ember-array/utils';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('components', this.getAttr('-components') || emberA());
    this.set('activeIndex', this.getAttr('-active-index'));
  },

  isActive: computed('activeIndex', 'components', function() {
    return this.get('index') === this.get('activeIndex');
  }),

  actions: {
    activate() {
      this._super(...arguments);
      this.sendAction('-activate', this.get('index'));
    },
  }
});
