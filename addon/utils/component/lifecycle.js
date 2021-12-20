import Modifier from 'ember-modifier';

export function lifecycleHooks(component) {
  return class extends Modifier {
    didInstall() {
      this.args.named.didInstall(this.element);
    }

    didUpdateArguments() {
      this.args.named.didUpdateArguments();
    }

    willDestroy() {
      super.willDestroy();
      this.args.named.willDestroy();
    }
  };
}

export function _insertComponent(component) {
  component.args._onInsert?.(component);
}

export function _destroyComponent(component) {
  component.args._onDestroy?.(component);
}
