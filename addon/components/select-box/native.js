import Component from '@ember/component';
import layout from '../../templates/components/select-box/native';
import BaseSelectBox from '../../mixins/select-box/base';
import Focusable from '../../mixins/select-box/focusable';
import HasOptions from '../../mixins/select-box/registration/has-options';
import Nameable from '../../mixins/general/nameable';

const mixins = [
  BaseSelectBox,
  Focusable,
  HasOptions,
  Nameable
];

export default Component.extend(...mixins, {
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

    if (this.get('isMultiple')) {
      this.send('select', selectedValues);
    } else {
      this.send('select', selectedValues[0]);
    }
  },

  _getRegisteredSelectedValues() {
    return this.get('options')
      .filter(option => option.get('element.selected'))
      .map(option => option.get('internalValue'));
  },

  _getUnregisteredSelectedValues() {
    return [].slice
      .call(this.get('element').querySelectorAll('option:checked'))
      .map(option => option.value);
  }
});
