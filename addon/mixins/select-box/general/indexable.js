import Mixin from '@ember/object/mixin';
import computed from 'ember-improved-cp/read-only';
import { A as emberA } from '@ember/array';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('components', this.getWithDefault('-components', emberA()));
  },

  index: computed('components', function() {
    return this.get('components').indexOf(this);
  })
});
