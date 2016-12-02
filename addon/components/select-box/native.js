import Component from 'ember-component';
import BaseSelectBox from '../../mixins/select-box/base';
import layout from '../../templates/components/select-box/native';
import jQuery from 'jquery';
import { A as emberA } from 'ember-array/utils';

export default Component.extend(BaseSelectBox, {
  layout,
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
    const registeredSelected   = this._getRegisteredSelectedValues();
    const unregisteredSelected = this._getUnregisteredSelectedValues();

    let selectedValues;

    if (registeredSelected.length > 0) {
      selectedValues = registeredSelected;
    } else {
      selectedValues = unregisteredSelected;
    }

    if (this.getAttr('multiple')) {
      this.send('select', selectedValues);
    } else {
      this.send('select', selectedValues[0]);
    }
  },

  _getRegisteredSelectedValues() {
    return emberA(this.get('options')
      .filter(option => option.$().is(':selected'))
      .map(option => option.get('value')));
  },

  _getUnregisteredSelectedValues() {
    return emberA(this.$('option:selected')
      .map((index, option) => jQuery(option).attr('value'))
      .toArray());
  }
});
