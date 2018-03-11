import Mixin from '@ember/object/mixin';
import invokeAction from '../../utils/invoke-action';

export default Mixin.create({
  init() {
    this._super(...arguments);
    invokeAction(this, '-on-init', this);
  },

  willDestroyElement() {
    this._super(...arguments);
    invokeAction(this, '-on-destroy', this);
  }
});
