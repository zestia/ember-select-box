import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import invokeAction from '../../../utils/invoke-action';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('activeIndex', this.get('-active-index'));
  },

  isActive: computed('index', 'activeIndex', function() {
    return this.get('index') === this.get('activeIndex');
  }),

  actions: {
    activate() {
      this._super(...arguments);
      invokeAction(this, '-on-activate', this.get('index'));
    },

    _activate() {
      invokeAction(this, 'on-activate', this.get('value'), this.get('-api'));
    }
  }
});
