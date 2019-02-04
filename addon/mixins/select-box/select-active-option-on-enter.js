import Mixin from '@ember/object/mixin';

export default Mixin.create({
  _onPressEnter() {
    this._super(...arguments);
    this.send('selectActiveOption');
  }
});
