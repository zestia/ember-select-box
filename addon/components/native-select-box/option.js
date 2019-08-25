import Component from '@ember/component';
import layout from '../../templates/components/native-select-box/option';
import BaseOption from '../../mixins/select-box/option/base';
import Selectable from '../../mixins/select-box/option/selectable';
import invokeAction from '../../utils/invoke-action';
import { guidFor } from '@ember/object/internals';
import { computed, set } from '@ember/object';

const mixins = [BaseOption, Selectable];

export default Component.extend(...mixins, {
  layout,
  tagName: '',

  index: computed('_parentComponents', function() {
    return (this._parentComponents || []).indexOf(this);
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
    }
  },

  _domElementIdFor(element) {
    return guidFor(element).replace('ember', 'select-box-el-');
  }
});
