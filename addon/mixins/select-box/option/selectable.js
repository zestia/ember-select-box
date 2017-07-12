import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { A as emberA } from '@ember/array';
import invokeAction from '../../../utils/invoke-action';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('manualSelection', this.get('selected'));
    this.set('selectedValue', this.get('-selected-value'));
    this.set('isMultiple', this.get('-multiple'));
  },

  isSelected: computed(
    'value',
    'selectedValue',
    'isMultiple',
    'manualSelection',
    function() {
      if (this.get('manualSelection') !== undefined) {
        return this.get('manualSelection');
      } else if (this.get('isMultiple')) {
        return emberA(this.get('selectedValue')).includes(this.get('value'));
      } else {
        return this.get('value') === this.get('selectedValue');
      }
    }
  ),

  actions: {
    select() {
      this._super(...arguments);
      invokeAction(this, '-select', this.get('value'));
    }
  }
});
