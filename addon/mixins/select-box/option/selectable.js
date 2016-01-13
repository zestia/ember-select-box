import Mixin from 'ember-metal/mixin';
import computed from 'ember-computed';
import { A as emberA } from 'ember-array/utils';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('isMultiple', this.getAttr('-multiple'));
    this.set('selectedValue', this.getAttr('-selected-value'));
  },

  isSelected: computed('value', 'selectedValue', 'isMultiple', function() {
    if (this.get('isMultiple')) {
      return emberA(this.get('selectedValue')).contains(this.get('value'));
    } else {
      return this.get('value') === this.get('selectedValue');
    }
  }),

  actions: {
    select() {
      this._super(...arguments);
      this.sendAction('-select', this.get('value'));
      this.sendAction('on-select', this.get('value'), this.getAttr('-api'));
    }
  }
});

