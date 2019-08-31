import Component from '@ember/component';
import {
  _destroyComponent,
  _initComponent
} from '../../utils/component/lifecycle';
import {
  deregisterElement,
  registerElement
} from '../../utils/registration/element';
import { input, keyDown } from '../../utils/select-box/input/keyboard';
import layout from '../../templates/components/select-box/input';

export default Component.extend({
  layout,
  tagName: '',

  // Arguments

  classNamePrefix: '',
  selectBox: null,

  // State

  domElement: null,
  id: null,

  // Actions

  onClear: null,
  onDelete: null,
  onInput: null,

  init() {
    this._super(...arguments);
    _initComponent(this);
  },

  actions: {
    // Internal actions

    didInsertElement(element) {
      registerElement(this, element);
    },

    willDestroyElement(element) {
      deregisterElement(this, element);
      _destroyComponent(this);
    },

    onInput(e) {
      input(this, e);
    },

    onKeyDown(e) {
      keyDown(this, e);
    }
  }
});
