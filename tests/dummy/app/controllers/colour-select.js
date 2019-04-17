import Controller from '@ember/controller';
import { set } from '@ember/object';

export default Controller.extend({
  actions: {
    selectedColour(colour) {
      set(this, 'selectedColour', colour);
    }
  }
});
