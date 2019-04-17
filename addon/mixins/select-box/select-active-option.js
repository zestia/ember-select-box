import Mixin from '@ember/object/mixin';

export default Mixin.create({
  actions: {
    selectActiveOption() {
      if (this.activeOption) {
        this.activeOption.send('select');
      }
    }
  }
});
