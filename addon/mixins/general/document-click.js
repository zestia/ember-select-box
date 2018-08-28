import Mixin from '@ember/object/mixin';
import { bind } from '@ember/runloop';

export default Mixin.create({
  clickDocument() {},

  didInsertElement() {
    this._super(...arguments);
    this.set('_documentClickHandler', bind(this, '_clickDocument'));
    document.addEventListener('click', this._documentClickHandler);
  },

  willDestroyElement() {
    this._super(...arguments);
    document.removeEventListener('click', this._documentClickHandler);
  },

  _clickDocument() {
    if (this.isDestroyed) {
      return;
    }

    this.clickDocument(...arguments);
  }
});
