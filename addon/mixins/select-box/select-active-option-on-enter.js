import Mixin from '@ember/object/mixin';

export default Mixin.create({
  _onPressEnter(...args) {
    this._super(...args);
    this.send('selectActiveOption');
  }
});
