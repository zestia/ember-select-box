import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';

export default class LifecycleModifier extends Modifier {
  didSetup;

  constructor(appInstance, { named: { onDestroy } }) {
    super(...arguments);
    onDestroy && registerDestructor(this, onDestroy);
  }

  modify(element, positional, { onInsert }) {
    if (this.didSetup) {
      return;
    }

    onInsert?.(element);
    this.didSetup = true;
  }
}
