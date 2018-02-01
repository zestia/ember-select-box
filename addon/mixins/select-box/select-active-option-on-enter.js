import Mixin from '@ember/object/mixin';

export default Mixin.create({
  pressEnter(...args) {
    this._super(...args);
    this.send('selectActiveOption');
  }
});
