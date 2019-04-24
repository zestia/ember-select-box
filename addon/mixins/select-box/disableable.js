import Mixin from '@ember/object/mixin';
import { set } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);

    if (isPresent(this.disabled)) {
      set(this, 'isDisabled', Boolean(this.disabled));
    }

    if (this.isDisabled) {
      set(this, 'tabIndex', -1);
    }
  }
});
