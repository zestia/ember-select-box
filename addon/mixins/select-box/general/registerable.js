import Mixin from 'ember-metal/mixin';

export default Mixin.create({
  init() {
    this._super(...arguments);
    this._registerComponent();
  },

  willDestroyElement() {
    this._super(...arguments);
    this._deregisterComponent();
  },

  _registerComponent() {
    this.sendAction('-register', this);
  },

  _deregisterComponent() {
    this.sendAction('-deregister', this);
  }
});

