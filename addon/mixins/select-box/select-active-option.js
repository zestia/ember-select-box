import Mixin from '@ember/object/mixin';

export default Mixin.create({
  actions: {
    selectActiveOption() {
      const activeOption = this.activeOption;

      if (activeOption) {
        activeOption.send('select');
      }
    }
  }
});
