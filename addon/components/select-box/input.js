import Component from '@ember/component';
import layout from '../../templates/components/select-box/input';
import invokeAction from '../../utils/invoke-action';
import HasDomElement from '../../mixins/select-box/registration/has-dom-element';

const mixins = [HasDomElement];

export default Component.extend(...mixins, {
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
    }
  }
});
