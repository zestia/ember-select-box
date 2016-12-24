import Mixin from 'ember-metal/mixin';
import Nameable from  '../general/nameable';
import Registerable from  '../general/registerable';
import { isBlank } from 'ember-utils';
import RSVP from 'rsvp';
import { trySet } from 'ember-metal/set';

export default Mixin.create(
  Nameable,
  Registerable, {

  didReceiveAttrs() {
    this._super(...arguments);
    const value = this.getAttr('value');
    let label   = this.getAttr('label');

    const id = this.incrementProperty('promiseID');

    RSVP.resolve(value).then(value => {
      const superseded = id < this.get('promiseID');
      if (superseded) {
        return;
      }

      if (isBlank(label)) {
        label = value;
      }

      trySet(this, 'label', label);
      trySet(this, 'value', value);
    }, error => {
      // Treat as if no value

      if (isBlank(label) && error) {
        trySet(this, 'label', error.toString());
      }
    });
  }
});
