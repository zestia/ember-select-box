import Component from 'ember-component';
import BaseSelectBox from '../../mixins/select-box/base';
import layout from '../../templates/components/select-box/native';
import { A as emberA } from 'ember-array/utils';

export default Component.extend(BaseSelectBox, {
  layout: layout,
  tagName: 'select',
  attributeBindings: [
    'name',
    'title',
    'tabindex',
    'disabled',
    'size',
    'multiple',
    'autofocus',
    'required',
    'aria-label'
  ],

  change() {
    let options = this._getSelectedOptions();

    if (this.getAttr('multiple')) {
      this.send('select', options.mapBy('value'));
    } else {
      this.send('select', options.get('firstObject.value'));
    }
  },

  _getSelectedOptions() {
    return emberA(this.get('options').filter((option) => {
      return option.$().is(':selected');
    }));
  }
});
