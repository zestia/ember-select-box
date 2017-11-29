import Mixin from '@ember/object/mixin';
import Nameable from  '../general/nameable';
import Registerable from  '../general/registerable';
import { isBlank } from '@ember/utils';
import RSVP from 'rsvp';
import { bind } from '@ember/runloop';
import trySet from '../../../utils/try-set';
const { resolve } = RSVP;

export default Mixin.create(
  Nameable,
  Registerable, {

  promiseID: 0,

  didReceiveAttrs() {
    this._super(...arguments);
    this._update();
  },

  _update() {
    const value = this.get('value');
    const id    = this.get('promiseID') + 1;

    trySet(this, 'promiseID', id);

    const success = bind(this, '_resolvedValue', id, false);
    const failure = bind(this, '_resolvedValue', id, true);

    resolve(value).then(success, failure);
  },

  _resolvedValue(id, failed, value) {
    const superseded = id < this.get('promiseID');

    if (superseded || this.get('isDestroyed')) {
      return;
    }

    let label = this.get('label');

    if (failed) {
      label = `${value}`;
    }

    if (isBlank(label)) {
      label = value;
    }

    trySet(this, 'label', label);
    trySet(this, 'value', value);
  }
});
