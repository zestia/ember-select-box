import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    selectedColour(colour) {
      this.set('selectedColour', colour);
    }
  }
});
