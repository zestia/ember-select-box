import Mixin from 'ember-metal/mixin';

export default Mixin.create({
  actions: {
    selectActiveOption() {
      let activeOption = this.get('activeOption');
      if (activeOption) {
        activeOption.send('select');
      }
    }
  }
});
