import Mixin from '@ember/object/mixin';

export default Mixin.create({
  init() {
    this._super(...arguments);
    this.get('-on-register')(this);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.get('-on-deregister')(this);
  },

  '-on-register'() {},
  '-on-deregister'() {}
});
