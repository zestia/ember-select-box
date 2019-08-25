import Component from '@ember/component';
import layout from '../templates/components/native-select-box';
import BaseSelectBox from '../mixins/select-box/base';
import HasOptions from '../mixins/select-box/registration/has-options';
import HasDomElement from '../mixins/select-box/registration/has-dom-element';
import { get } from '@ember/object';
const { from } = Array;

const mixins = [BaseSelectBox, HasOptions, HasDomElement];

export default Component.extend(...mixins, {
  layout,
  tagName: '',

  actions: {
    _onChange() {
      this._super(...arguments);

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
      .filter(option => option.domElement.selected)
      .map(option => option.internalValue);
  },

  _getUnregisteredSelectedValues() {
    return from(this.domElement.querySelectorAll('option:checked')).map(
      option => option.value
    );
  }
});
