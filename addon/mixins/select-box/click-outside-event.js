import Mixin from '@ember/object/mixin';
import ClickOutside from '../general/click-outside';
import invokeAction from '../../utils/invoke-action';

export default Mixin.create(ClickOutside, {
  clickOutside(e) {
    this._super(...arguments);
    invokeAction(this, 'onClickOutside', e, this.api);
  }
});
