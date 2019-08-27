import Component from '@ember/component';
import layout from '../../templates/components/select-box/input';
import init from '../../utils/init';
import destroy from '../../utils/destroy';
import input from '../../utils/input';
import keydown from '../../utils/keydown';
import registerElement from '../../utils/register-element';
import deregisterElement from '../../utils/deregister-element';

export default Component.extend({
  layout,
  tagName: '',

  init() {
    this._super(...arguments);
    init(this);
  },

  actions: {
    insertedElement(element) {
      registerElement(this, element);
    },

    willDestroyElement(element) {
      deregisterElement(this, element);
      destroy(this);
    },

    input(e) {
      input(this, e);
    },

    keydown(e) {
      keydown(this, e);
    }
  }
});
