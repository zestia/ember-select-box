import Mixin from '@ember/object/mixin';
import { guidFor } from '@ember/object/internals';
import { set } from '@ember/object';

export default Mixin.create({
  actions: {
    _registerDomElement(element) {
      set(this, 'domElement', element);
      set(this, 'domElementId', this._domElementIdFor(element));
      this._super(...arguments);
    },

    _deregisterDomElement() {
      set(this, 'domElement', null);
      set(this, 'domElementId', null);
      this._super(...arguments);
    }
  },

  _domElementIdFor(element) {
    return guidFor(element).replace('ember', 'select-box-el-');
  }
});
