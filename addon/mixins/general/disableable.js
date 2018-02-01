import Mixin from '@ember/object/mixin';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('isDisabled', this.get('disabled'));
  }
});
