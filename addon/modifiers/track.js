import Modifier from 'ember-modifier';

export default class TrackModifier extends Modifier {
  didSetup;

  modify(element, [...args], named) {
    if (this.didSetup) {
      named.onUpdate();
      return;
    }

    this.didSetup = true;
  }
}
