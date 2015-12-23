import Mixin from 'ember-metal/mixin';

export default Mixin.create({
  didReceiveAttrs(...args) {
    this._super(...args);

    let tabIndex   = this.get('tabIndex');
    let isDisabled = this.getAttr('disabled');

    if (isDisabled) {
      tabIndex = -1;
    }

    this.setProperties({ isDisabled, tabIndex });
  }
});
