import Mixin from 'ember-metal/mixin';
import Nameable from  '../general/nameable';
import Registerable from  '../general/registerable';
import { isBlank } from 'ember-utils';

export default Mixin.create(
  Nameable,
  Registerable, {

  didReceiveAttrs() {
    this._super(...arguments);
    const value = this.getAttr('value');
    let label   = this.getAttr('label');

    if (isBlank(label)) {
      label = value;
    }

    this.setProperties({ label, value });
  }
});
