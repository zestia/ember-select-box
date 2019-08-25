import Component from '@ember/component';
import layout from '../../templates/components/select-box/option';
import Activatable from '../../mixins/select-box/option/activatable';
import BaseOption from '../../mixins/select-box/option/base';
import Selectable from '../../mixins/select-box/option/selectable';
import invokeAction from '../../utils/invoke-action';
import { isPresent } from '@ember/utils';
import { computed, set } from '@ember/object';
import { guidFor } from '@ember/object/internals';

const mixins = [
  Activatable,
  BaseOption,
  Selectable
];

export default Component.extend(...mixins, {
  layout,
  tagName: '',

  isDisabled: false,

  index: computed('_parentComponents', function() {
    return (this._parentComponents || []).indexOf(this);
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
    }
  },

  _domElementIdFor(element) {
    return guidFor(element).replace('ember', 'select-box-el-');
  }
});
