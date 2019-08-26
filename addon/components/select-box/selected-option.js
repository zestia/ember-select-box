import Component from '@ember/component';
import layout from '../../templates/components/select-box/selected-option';
import { computed, get } from '@ember/object';
import invokeAction from '../../utils/invoke-action';
import updateOptionValue from '../../utils/update-option-value';
import init from '../../utils/init';
import destroy from '../../utils/destroy';
import registerElement from '../../utils/register-element';
import deregisterElement from '../../utils/deregister-element';

export default Component.extend({
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
    init(this);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    updateOptionValue(this, this.value);
  },

  willDestroyElement() {
    this._super(...arguments);
    destroy(this);
  },

  actions: {
    registerElement,
    deregisterElement,

    activate() {
      this._super(...arguments);
      invokeAction(this, '_onActivate', get(this, 'index'));
    },

    _activated() {
      invokeAction(this, 'onActivate', this.internalValue, this._parentApi);
    }
  }
});
