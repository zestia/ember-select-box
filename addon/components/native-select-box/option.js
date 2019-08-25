import Component from '@ember/component';
import layout from '../../templates/components/native-select-box/option';
import BaseOption from '../../mixins/select-box/option/base';
import Selectable from '../../mixins/select-box/option/selectable';
import HasDomElement from '../../mixins/select-box/registration/has-dom-element';
import { computed } from '@ember/object';
import invokeAction from '../../utils/invoke-action';

const mixins = [BaseOption, Selectable, HasDomElement];

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
  }
});
