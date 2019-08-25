import Component from '@ember/component';
import layout from '../../templates/components/select-box/option';
import Activatable from '../../mixins/select-box/option/activatable';
import BaseOption from '../../mixins/select-box/option/base';
import Selectable from '../../mixins/select-box/option/selectable';
import HasDomElement from '../../mixins/select-box/registration/has-dom-element';
import invokeAction from '../../utils/invoke-action';
import { isPresent } from '@ember/utils';
import { computed, set } from '@ember/object';

const mixins = [
  Activatable,
  BaseOption,
  Selectable,
  HasDomElement
];

export default Component.extend(...mixins, {
  layout,
  tagName: '',

  isDisabled: false,

  index: computed('_parentComponents', function() {
    return (this._parentComponents || []).indexOf(this);
  }),

  didReceiveAttrs() {
    this._super(...arguments);

    if (isPresent(this.disabled)) {
      set(this, 'isDisabled', Boolean(this.disabled));
    }
  },

  init() {
    this._super(...arguments);
    invokeAction(this, '_onInit', this);
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
    }
  }
});
