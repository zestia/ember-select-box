import Mixin from 'ember-metal/mixin';

export default Mixin.create({
  init() {
    this._super(...arguments);
    this.sendAction('-register', this);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.sendAction('-deregister', this);
  }
});

