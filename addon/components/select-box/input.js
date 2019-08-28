import Component from '@ember/component';
import { _initAction, _destroyAction } from '../../utils/actions/lifecycle';
import inputActions from '../../utils/actions/input';
import keydownActions from '../../utils/actions/keydown';
import noop from '../../utils/general/noop';
import layout from '../../templates/components/select-box/input';
import { registerElement, deregisterElement } from '../../utils/registration/element';

export default Component.extend({
  layout,
  tagName: '',

  api: noop,

  init() {
    this._super(...arguments);
    _initAction(this);
  },

  actions: {
    didInsertElement(element) {
      registerElement(this, element);
    },

    willDestroyElement(element) {
      deregisterElement(this, element);
      _destroyAction(this);
    },

    onInput(e) {
      inputActions(this, e);
    },

    onKeyDown(e) {
      keydownActions(this, e);
    }
  }
});
