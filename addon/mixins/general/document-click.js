import Mixin from '@ember/object/mixin';
import { set } from '@ember/object';
import { bind } from '@ember/runloop';

export default Mixin.create({
  clickDocument() {},

  didInsertElement() {
    this._super(...arguments);
    set(this, '_documentClickHandler', bind(this, '_clickDocument'));
    document.addEventListener('click', this._documentClickHandler);
    document.addEventListener('touchstart', this._documentClickHandler);
  },

  willDestroyElement() {
    this._super(...arguments);
    document.removeEventListener('click', this._documentClickHandler);
    document.removeEventListener('touchstart', this._documentClickHandler);
  },

  _clickDocument() {
    if (this.isDestroyed) {
      return;
    }

    this.clickDocument(...arguments);
  }
});
