import Component from '@ember/component';
import layout from '../../templates/components/select-box/option';
import BaseOption from '../../mixins/select-box/option/base';
import invokeAction from '../../utils/invoke-action';
import { isPresent } from '@ember/utils';
import { computed, get, set } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import isSelected from '../../utils/is-selected';

const mixins = [
  BaseOption
];

export default Component.extend(...mixins, {
  layout,
  tagName: '',

  isDisabled: false,
  isSelected: isSelected(),

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

  didReceiveAttrs() {
    this._super(...arguments);

    if (isPresent(this.disabled)) {
      set(this, 'isDisabled', Boolean(this.disabled));
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    invokeAction(this, '_onDestroy', this);
  },

  actions: {
    _onMouseEnter() {
      this._super(...arguments);
      this.send('activate');
    },

    _onClick() {
      this._super(...arguments);
      this.send('select');
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

    activate() {
      this._super(...arguments);
      invokeAction(this, '_onActivate', get(this, 'index'));
    },

    _activated() {
      invokeAction(this, 'onActivate', this.internalValue, this._parentApi);
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
