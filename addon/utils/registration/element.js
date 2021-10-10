import Modifier from 'ember-modifier';

export default function registerElement(selectBox) {
  return class extends Modifier {
    didInstall() {
      selectBox.element = this.element;
    }

    willDestroy() {
      selectBox.element = null;
    }
  };
}
