import { modifier } from 'ember-modifier';

export default modifier((element, _, named) => {
  named.onInsert(element);
  return () => named.onDestroy();
});
