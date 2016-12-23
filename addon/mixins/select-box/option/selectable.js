import Mixin from 'ember-metal/mixin';
import computed from 'ember-computed';
import { A as emberA } from 'ember-array/utils';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('manualSelection', this.getAttr('selected'));
    this.set('selectedValue', this.getAttr('-selected-value'));
    this.set('isMultiple', this.getAttr('-multiple'));
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
      this.sendAction('-select', this.get('value'));
    }
  }
});
