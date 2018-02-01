import Mixin from '@ember/object/mixin';
import invokeAction from '../../utils/invoke-action';

export default Mixin.create({
  init() {
    this._super(...arguments);
    invokeAction(this, '-register', this);
  },

  willDestroyElement() {
    this._super(...arguments);
    invokeAction(this, '-deregister', this);
  }
});
