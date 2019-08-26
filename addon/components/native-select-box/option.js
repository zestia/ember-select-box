import Component from '@ember/component';
import layout from '../../templates/components/native-select-box/option';
import invokeAction from '../../utils/invoke-action';
import { computed } from '@ember/object';
import isSelected from '../../utils/is-selected';
import updateOptionValue from '../../utils/update-option-value';
import init from '../../utils/init';
import destroy from '../../utils/destroy';
import registerElement from '../../utils/register-element';
import deregisterElement from '../../utils/deregister-element';

export default Component.extend({
  layout,
  tagName: '',

  isSelected: isSelected(),

  index: computed('_parentComponents', function() {
    return (this._parentComponents || []).indexOf(this);
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
    insertElement(element) {
      registerElement(this, element);
    },

    destroyElement(element) {
      deregisterElement(this, element);
    },

    select() {
      this._super(...arguments);

      if (this.isDisabled) {
        return;
      }

      invokeAction(this, '_onSelect', this.internalValue);
      invokeAction(this, 'onSelect', this.internalValue, this._parentApi);
    }
  }
});
