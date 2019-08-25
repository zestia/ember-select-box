import Component from '@ember/component';
import layout from '../../templates/components/native-select-box/option';
import invokeAction from '../../utils/invoke-action';
import { guidFor } from '@ember/object/internals';
import { computed, set } from '@ember/object';
import isSelected from '../../utils/is-selected';
import updateOptionValue from '../../utils/update-option-value';

export default Component.extend({
  layout,
  tagName: '',

  isSelected: isSelected(),

  index: computed('_parentComponents', function() {
    return (this._parentComponents || []).indexOf(this);
  }),

  init() {
    this._super(...arguments);
    invokeAction(this, '_onInit', this);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    updateOptionValue(this, this.value);
  },

  willDestroyElement() {
    this._super(...arguments);
    invokeAction(this, '_onDestroy', this);
  },

  actions: {
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

    select() {
      this._super(...arguments);

      if (this.isDisabled) {
        return;
      }

      invokeAction(this, '_onSelect', this.internalValue);
      invokeAction(this, 'onSelect', this.internalValue, this._parentApi);
    }
  },

  _domElementIdFor(element) {
    return guidFor(element).replace('ember', 'select-box-el-');
  }
});
