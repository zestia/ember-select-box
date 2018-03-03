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
  valueID: 0,

  didReceiveAttrs() {
    this._super(...arguments);
    this._update(this.get('value'));
  },

  _update(value) {
    const val = resolve(value);
    const id = this.incrementProperty('valueID');

    const success = bind(this, '_resolvedValue', id, false);
    const failure = bind(this, '_resolvedValue', id, true);

    this.set('internalValue', value);

    val.then(success, failure);
  },

  _resolvedValue(id, failed, value) {
    if (id < this.get('valueID') || this.get('isDestroyed')) {
      return;
    }

    let label = this.get('label');

    if (isBlank(label)) {
      label = value;
    }

    this.set('internalLabel', label);
    this.set('internalValue', value);
  }
});
