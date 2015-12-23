import Mixin from 'ember-metal/mixin';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('isDisabled', this.getAttr('disabled'));
  }
});
