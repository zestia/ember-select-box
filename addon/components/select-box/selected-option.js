import Component from '@ember/component';
import layout from '../../templates/components/select-box/selected-option';
import Activatable from '../../mixins/select-box/option/activatable';
import BaseOption from '../../mixins/select-box/option/base';
import HasDomElement from '../../mixins/select-box/registration/has-dom-element';
import { computed } from '@ember/object';
import invokeAction from '../../utils/invoke-action';

const mixins = [
  Activatable,
  BaseOption,
  HasDomElement
];

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
});
