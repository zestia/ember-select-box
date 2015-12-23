import Mixin from 'ember-metal/mixin';

export default Mixin.create({
  pressEnter(...args) {
    this._super(...args);
    this.send('selectActiveOption');
  }
});
