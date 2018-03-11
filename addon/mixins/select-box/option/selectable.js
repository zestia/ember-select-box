import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { makeArray } from '@ember/array';
import invokeAction from '../../../utils/invoke-action';

const isSelectedKeys = [
  'selected',
  'internalValue',
  '-parent-is-multiple',
  '-parent-internal-value',
];

export default Mixin.create({
  isSelected: computed(...isSelectedKeys, function() {
    if (this.get('selected') !== undefined) {
      return this.get('selected');
    } else if (this.get('-parent-is-multiple')) {
      return makeArray(this.get('-parent-internal-value')).includes(this.get('internalValue'));
    } else {
      return this.get('internalValue') === this.get('-parent-internal-value');
    }
  }),

  actions: {
    select() {
      this._super(...arguments);

      if (this.get('isDisabled')) {
        return;
      }

      invokeAction(this, '-on-select', this.get('internalValue'));
      invokeAction(this, 'on-select', this.get('internalValue'), this.get('-parent-api'));
    }
  }
});
