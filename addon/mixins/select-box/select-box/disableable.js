import Mixin from 'ember-metal/mixin';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);

    let tabIndex   = this.get('tabIndex');
    let isDisabled = this.getAttr('disabled');

    if (isDisabled) {
      tabIndex = -1;
    }

    this.setProperties({ isDisabled, tabIndex });
  }
});
