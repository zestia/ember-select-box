import Mixin from 'ember-metal/mixin';
import Nameable from  '../general/nameable';
import Registerable from  '../general/registerable';

export default Mixin.create(
  Nameable,
  Registerable, {

  didReceiveAttrs() {
    this._super(...arguments);
    this.setProperties({
      label: this.getAttr('label'),
      value: this.getAttr('value') || this.getAttr('label')
    });
  }
});
