import Component from '@ember/component';
import layout from '../templates/components/native-select-box';
import BaseSelectBox from '../mixins/select-box/base';
import Focusable from '../mixins/select-box/focusable';
import HasOptions from '../mixins/select-box/registration/has-options';
import Nameable from '../mixins/general/nameable';
const { from } = Array;

const mixins = [BaseSelectBox, Focusable, HasOptions, Nameable];

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
    const registeredSelected = this._getRegisteredSelectedValues();
    const unregisteredSelected = this._getUnregisteredSelectedValues();

    let selectedValues;

    if (registeredSelected.length > 0) {
      selectedValues = registeredSelected;
    } else {
      selectedValues = unregisteredSelected;
    }

    if (this.isMultiple) {
      this.send('select', selectedValues);
    } else {
      this.send('select', selectedValues[0]);
    }
  },

  _getRegisteredSelectedValues() {
    return this.options
      .filter(option => option.element.selected)
      .map(option => option.internalValue);
  },

  _getUnregisteredSelectedValues() {
    return from(this.element.querySelectorAll('option:checked')).map(option => option.value);
  }
});
