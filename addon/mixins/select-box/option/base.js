import Mixin from '@ember/object/mixin';
import Nameable from  '../../general/nameable';
import Registerable from  '../../general/registerable';
import { isBlank } from '@ember/utils';
import { resolve } from 'rsvp';
import { bind } from '@ember/runloop';

const mixins = [
  Nameable,
  Registerable
];

export default Mixin.create(...mixins, {
  promiseID: 0,

  didReceiveAttrs() {
    this._super(...arguments);
    this._update();
  },

  _update() {
    const value = resolve(this.get('value'));
    const id = this.incrementProperty('promiseID');

    const success = bind(this, '_resolvedValue', id, false);
    const failure = bind(this, '_resolvedValue', id, true);

    value.then(success, failure);
  },

  _resolvedValue(id, failed, value) {
    if (id < this.get('promiseID') || this.get('isDestroyed')) {
      return;
    }

    let label = this.get('label');

    if (failed) {
      label = `${value}`;
    }

    if (isBlank(label)) {
      label = value;
    }

    this.set('label', label);
    this.set('value', value);
  }
});
