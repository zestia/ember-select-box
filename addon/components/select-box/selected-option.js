import Component from '@ember/component';
import layout from '../../templates/components/select-box/selected-option';
import setValue from '../../utils/value/set';
import initAction from '../../utils/actions/init';
import destroyAction from '../../utils/actions/destroy';
import index from '../../utils/macros/index';
import { equal } from '@ember/object/computed';
import { registerElement, deregisterElement } from '../../utils/registration/element';

export default Component.extend({
  layout,
  tagName: '',

  index: index('selectedOptions'),
  isActive: equal('index', 'activeSelectedOptionIndex'),

  init() {
    this._super(...arguments);
    initAction(this);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    setValue(this, this.value);
  },

  actions: {
    didInsertElement(element) {
      registerElement(this, element);
    },

    willDestroyElement(element) {
      deregisterElement(this, element);
      destroyAction(this);
    }
  }
});
