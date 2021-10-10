import Modifier from 'ember-modifier';

export default function (selectBox) {
  return class extends Modifier {
    didInstall() {
      selectBox.isReady = true;
      selectBox.args.onReady?.(selectBox.api);
    }
  };
}
