import Mixin from '@ember/object/mixin';
import { get } from '@ember/object';

export default Mixin.create({
  actions: {
    selectActiveOption() {
      const activeOption = get(this, 'activeOption');

      if (activeOption) {
        activeOption.send('select');
      }
    }
  }
});
