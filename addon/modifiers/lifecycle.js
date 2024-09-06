import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';

export default class LifecycleModifier extends Modifier {
  didSetup;

  constructor(appInstance, { positional: [_, onDestroy] }) {
    super(...arguments);
    registerDestructor(this, onDestroy);
  }

  modify(element, [onInsert]) {
    if (this.didSetup) {
      return;
    }

    onInsert(element);
    this.didSetup = true;
  }
}
