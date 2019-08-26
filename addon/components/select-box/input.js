import Component from '@ember/component';
import layout from '../../templates/components/select-box/input';
import init from '../../utils/init';
import destroy from '../../utils/destroy';
import input from '../../utils/input';
import keydown from '../../utils/keydown';
import register from '../../utils/register';
import deregister from '../../utils/deregister';

export default Component.extend({
  layout,
  tagName: '',

  init() {
    this._super(...arguments);
    init(this);
  },

  willDestroyElement() {
    this._super(...arguments);
    destroy(this);
  },

  actions: {
    input,
    keydown,
    register,
    deregister
  }
});
