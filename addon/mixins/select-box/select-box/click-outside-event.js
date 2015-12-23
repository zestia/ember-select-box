import Mixin from 'ember-metal/mixin';
import ClickOutside from '../general/click-outside';

export default Mixin.create(ClickOutside, {
  clickOutside(e) {
    this._super(...arguments);
    this.sendAction('on-click-outside', e, this.get('api'));
  }
});