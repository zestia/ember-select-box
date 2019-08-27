import Component from '@ember/component';
import deregisterElement from '../../utils/deregister-element';
import destroyAction from '../../utils/actions/destroy';
import initAction from '../../utils/actions/init';
import inputActions from '../../utils/actions/input';
import keydownActions from '../../utils/actions/keydown';
import layout from '../../templates/components/select-box/input';
import registerElement from '../../utils/register-element';

export default Component.extend({
  layout,
  tagName: '',

  init() {
    this._super(...arguments);
    initAction(this);
  },

  actions: {
    didInsertElement(element) {
      registerElement(this, element);
    },

    willDestroyElement(element) {
      deregisterElement(this, element);
      destroyAction(this);
    },

    onInput(e) {
      inputActions(this, e);
    },

    onKeyDown(e) {
      keydownActions(this, e);
    }
  }
});
