import Mixin from '@ember/object/mixin';
import { isPresent } from '@ember/utils';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);

    if (isPresent(this.get('disabled'))) {
      this.set('isDisabled', this.get('disabled'));
    }

    if (this.get('isDisabled')) {
      this.set('tabIndex', -1);
    }
  }
});
