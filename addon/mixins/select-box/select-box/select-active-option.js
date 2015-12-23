import Mixin from 'ember-metal/mixin';

export default Mixin.create({
  actions: {
    selectActiveOption() {
      this.send('select', this.get('activeOption.value'));
    }
  }
});
