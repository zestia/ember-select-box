import Component from '@ember/component';
import layout from '../templates/components/native-select-box';
import BaseSelectBox from '../mixins/select-box/base';
import { guidFor } from '@ember/object/internals';
import { set, get } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { A as emberA } from '@ember/array';
const { from } = Array;

const mixins = [BaseSelectBox];

export default Component.extend(...mixins, {
  layout,
  tagName: '',

  init() {
    this._super(...arguments);
    set(this, '_options', emberA());
    set(this, 'options', emberA());
  },

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
    },

    _registerDomElement(element) {
      set(this, 'domElement', element);
      set(this, 'domElementId', this._domElementIdFor(element));
      this._super(...arguments);
    },

    _deregisterDomElement() {
      set(this, 'domElement', null);
      set(this, 'domElementId', null);
      this._super(...arguments);
    },

    _registerOption(option) {
      this._options.addObject(option);
      this._scheduleUpdateOptions();
    },

    _deregisterOption(option) {
      this._options.removeObject(option);
      this._scheduleUpdateOptions();
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
  },

  _domElementIdFor(element) {
    return guidFor(element).replace('ember', 'select-box-el-');
  },

  _scheduleUpdateOptions() {
    scheduleOnce('afterRender', this, '_updateOptions');
  },

  _updateOptions() {
    set(this, 'options', emberA(this._options.toArray()));
  },
});
