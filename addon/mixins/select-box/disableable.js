import Mixin from '@ember/object/mixin';
import { isPresent } from '@ember/utils';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);

    if (isPresent(this.disabled)) {
      this.set('isDisabled', this.disabled);
    }

    if (this.isDisabled) {
      this.set('tabIndex', -1);
    }
  }
});
