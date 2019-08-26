import Component from '@ember/component';
import layout from '../../templates/components/select-box/option';
import invokeAction from '../../utils/invoke-action';
import { isPresent } from '@ember/utils';
import { set } from '@ember/object';
import isSelected from '../../utils/is-selected';
import updateOptionValue from '../../utils/update-option-value';
import init from '../../utils/init';
import destroy from '../../utils/destroy';
import registerElement from '../../utils/register-element';
import deregisterElement from '../../utils/deregister-element';
import index from '../../utils/index';
import isActive from '../../utils/is-active';
import activate from '../../utils/activate';

export default Component.extend({
  layout,
  tagName: '',

  isDisabled: false,
  isSelected: isSelected(),
  index: index(),
  isActive: isActive(),

  init() {
    this._super(...arguments);
    init(this);
  },

  didReceiveAttrs() {
    this._super(...arguments);

    if (isPresent(this.disabled)) {
      set(this, 'isDisabled', Boolean(this.disabled));
    }

    updateOptionValue(this, this.value);
  },

  willDestroyElement() {
    this._super(...arguments);
    destroy(this);
  },

  actions: {
    insert() {
      registerElement(...arguments);
    },

    destroy() {
      deregisterElement(...arguments);
    },

    mouseEnter() {
      activate(this);
    },

    _onClick() {
      this._super(...arguments);
      this.send('select');
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
