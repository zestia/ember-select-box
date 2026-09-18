import { modifier } from 'ember-modifier';

var lifecycle = modifier((element, _, named) => {
  named.onInsert(element);
  return () => named.onDestroy();
});

export { lifecycle as default };
//# sourceMappingURL=lifecycle.js.map
