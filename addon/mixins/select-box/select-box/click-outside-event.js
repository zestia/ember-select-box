import Mixin from '@ember/object/mixin';
import ClickOutside from '../general/click-outside';
import invokeAction from '../../../utils/invoke-action';

export default Mixin.create(ClickOutside, {
  clickOutside(e) {
    this._super(...arguments);
    invokeAction(this, 'on-click-outside', e, this.get('api'));
  }
});
