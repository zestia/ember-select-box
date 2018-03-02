import Mixin from '@ember/object/mixin';
import ClickOutside from '../general/click-outside';

export default Mixin.create(ClickOutside, {
  clickOutside(e) {
    this._super(...arguments);
    this.get('on-click-outside')(e, this.get('api'));
  },

  'on-click-outside'() {}
});
