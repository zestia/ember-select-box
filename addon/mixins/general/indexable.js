import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  index: computed('-parent-components', function() {
    return (this['-parent-components'] || []).indexOf(this);
  })
});
