import Component from '@ember/component';
import layout from '../../templates/components/select-box/selected-option';
import BaseOption from '../../mixins/select-box/option/base';
import { computed, get, set } from '@ember/object';
import invokeAction from '../../utils/invoke-action';
import { guidFor } from '@ember/object/internals';

const mixins = [
  BaseOption
];

export default Component.extend(...mixins, {
  layout,
  tagName: '',

  index: computed('_parentComponents', function() {
    return (this._parentComponents || []).indexOf(this);
  }),

  isActive: computed('index', '_parentActiveIndex', function() {
    return get(this, 'index') === this._parentActiveIndex;
  }),

  init() {
    this._super(...arguments);
    invokeAction(this, '_onInit', this);
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

    activate() {
      this._super(...arguments);
      invokeAction(this, '_onActivate', get(this, 'index'));
    },

    _activated() {
      invokeAction(this, 'onActivate', this.internalValue, this._parentApi);
    }
  },

  _domElementIdFor(element) {
    return guidFor(element).replace('ember', 'select-box-el-');
  }
});
