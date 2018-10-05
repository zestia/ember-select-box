import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  index: computed('_parentComponents', function() {
    return (this._parentComponents || []).indexOf(this);
  })
});
