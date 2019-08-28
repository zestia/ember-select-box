import Component from '@ember/component';
import layout from '../../templates/components/select-box/selected-option';
import resolveValue from '../../utils/value/resolve';
import { _initAction, _destroyAction } from '../../utils/actions/lifecycle';
import noop from '../../utils/general/noop';
import index from '../../utils/macros/index';
import { equal } from '@ember/object/computed';
import { registerElement, deregisterElement } from '../../utils/registration/element';

export default Component.extend({
  layout,
  tagName: '',

  api: noop,

  index: index('selectedOptions'),
  isActive: equal('index', 'activeSelectedOptionIndex'),

  init() {
    this._super(...arguments);
    _initAction(this);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    resolveValue(this, this.value);
  },

  actions: {
    didInsertElement(element) {
      registerElement(this, element);
    },

    willDestroyElement(element) {
      deregisterElement(this, element);
      _destroyAction(this);
    }
  }
});
