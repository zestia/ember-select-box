import Component from '@ember/component';
import layout from '../../templates/components/select-box/input';
import invokeAction from '../../utils/invoke-action';
import { guidFor } from '@ember/object/internals';
import { set } from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',

  init() {
    this._super(...arguments);
    invokeAction(this, '_onInit', this);
  },

  willDestroyElement() {
    this._super(...arguments);
    invokeAction(this, '_onDestroy', this);
  },

  actions: {
    _onInput() {
      this._super(...arguments);

      const value = this.domElement.value;

      if (!value) {
        invokeAction(this, 'onClear', this._parentApi);
      }

      invokeAction(this, '_onInput', value);
      invokeAction(this, 'onInput', value, this._parentApi);
    },

    _onKeyDown(e) {
      this._super(...arguments);

      if (e.keyCode === 8 && !this.domElement.value) {
        invokeAction(this, 'onDelete', this._parentApi);
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
    }
  },

  _domElementIdFor(element) {
    return guidFor(element).replace('ember', 'select-box-el-');
  }
});
