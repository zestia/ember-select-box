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
import { className } from '../../utils/shared/attributes';

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

  // Computed state

  className: className(),

  init() {
    this._super(...arguments);
    _initComponent(this);
  },

  actions: {
    // Internal actions

    handleInsertElement(element) {
      registerElement(this, element);
    },

    handleDestroyElement(element) {
      deregisterElement(this, element);
      _destroyComponent(this);
    },

    handleInput(e) {
      input(this, e);
    },

    handleKeyDown(e) {
      keyDown(this, e);
    }
  }
});
