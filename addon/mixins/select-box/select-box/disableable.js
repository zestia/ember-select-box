import Mixin from '@ember/object/mixin';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);

    const isDisabled = this.get('disabled');
    let tabIndex = this.get('tabIndex');

    if (isDisabled) {
      tabIndex = -1;
    }

    this.setProperties({ isDisabled, tabIndex });
  }
});
