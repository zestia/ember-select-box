import Component from '@ember/component';
import { _initComponent, _destroyComponent } from '../../utils/shared/lifecycle';
import index from '../../utils/macros/index';
import isSelected from '../../utils/macros/is-selected';
import layout from '../../templates/components/native-select-box/option';
import { registerElement, deregisterElement } from '../../utils/registration/element';
import resolveValue from '../../utils/shared/resolve-value';
import noop from '../../utils/general/noop';

export default Component.extend({
  layout,
  tagName: '',

  api: noop,
  index: index('selectBox.options'),
  isSelected: isSelected(),

  init() {
    this._super(...arguments);
    _initComponent(this);
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
      _destroyComponent(this);
    }
  }
});
