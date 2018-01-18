import Mixin from '@ember/object/mixin';
import { bind } from '@ember/runloop';

export default Mixin.create({
  clickDocument() {},

  didInsertElement() {
    this._super(...arguments);
    this.set('_documentClickHandler', bind(this, '_clickDocument'));
    document.addEventListener('click', this.get('_documentClickHandler'));
  },

  willDestroyElement() {
    this._super(...arguments);
    document.removeEventListener('click', this.get('_documentClickHandler'));
  },

  _clickDocument() {
    if (this.get('isDestroyed')) {
      return;
    }
    this.clickDocument(...arguments);
  }
});
