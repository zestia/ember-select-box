import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';

export default class LifecycleModifier extends Modifier {
  didSetup;

  constructor(appInstance, args) {
    super(...arguments);
    registerDestructor(this, args.named.onDestroy);
  }

  modify(element, positional, named) {
    if (this.didSetup) {
      return;
    }

    named.onInsert(element);
    this.didSetup = true;
  }
}
