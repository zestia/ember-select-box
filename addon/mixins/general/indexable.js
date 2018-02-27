import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('components', this.getWithDefault('-components', []));
  },

  index: computed('components', function() {
    return this.get('components').indexOf(this);
  })
});
