import Component from '@ember/component';
import layout from '../templates/components/native-select-box';
import BaseSelectBox from '../mixins/select-box/base';
import HasOptions from '../mixins/select-box/registration/has-options';
import { get, set } from '@ember/object';
const { from } = Array;

const mixins = [BaseSelectBox, HasOptions];

export default Component.extend(...mixins, {
  layout,
  tagName: '',

  actions: {
    inserted(element) {
      set(this, '_element', element);
    },

    changed() {
      const registeredSelected = this._getRegisteredSelectedValues();
      const unregisteredSelected = this._getUnregisteredSelectedValues();

      let selectedValues;

      if (registeredSelected.length > 0) {
        selectedValues = registeredSelected;
      } else {
        selectedValues = unregisteredSelected;
      }

      if (get(this, 'isMultiple')) {
        this.send('select', selectedValues);
      } else {
        this.send('select', selectedValues[0]);
      }
    }
  },

  _getRegisteredSelectedValues() {
    return this.options
      .filter(option => option.element.selected)
      .map(option => option.internalValue);
  },

  _getUnregisteredSelectedValues() {
    return from(this._element.querySelectorAll('option:checked')).map(
      option => option.value
    );
  }
});
