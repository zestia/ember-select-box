import Modifier from 'ember-modifier';

export default function lifecycleActions(component) {
  return class extends Modifier {
    didInstall() {
      component.args._onInsert?.(component);
    }

    willDestroy() {
      component.args._onDestroy?.(component);
    }
  };
}
