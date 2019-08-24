import Mixin from '@ember/object/mixin';
import { set } from '@ember/object';

export default Mixin.create({
  actions: {
    _registerDomElement(element) {
      set(this, 'domElement', element);
    }
  }
});
