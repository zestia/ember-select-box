import Modifier from 'ember-modifier';

export default class TrackArgModifier extends Modifier {
  didSetup;

  modify(element, [value, callback]) {
    if (this.didSetup) {
      callback(value);
    }

    this.didSetup = true;
  }
}
