import Component from '@ember/component';
import layout from '../../templates/components/select-box/option';
import { isPresent } from '@ember/utils';
import { set } from '@ember/object';
import isSelected from '../../utils/is-selected';
import setOptionValue from '../../utils/set-option-value';
import init from '../../utils/init';
import destroy from '../../utils/destroy';
import registerElement from '../../utils/register-element';
import deregisterElement from '../../utils/deregister-element';
import index from '../../utils/index';
import isActive from '../../utils/is-active';
import activate from '../../utils/activate';
import selectOptionValue from '../../utils/select-option-value';

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

    setOptionValue(this, this.value);
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

    mouseEnter() {
      activate(this);
    },

    click(e) {
      selectOptionValue(this);
    }
  }
});
