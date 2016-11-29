import Mixin from 'ember-metal/mixin';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);

    const isDisabled = this.getAttr('disabled');
    let tabIndex = this.get('tabIndex');

    if (isDisabled) {
      tabIndex = -1;
    }

    this.setProperties({ isDisabled, tabIndex });
  }
});
