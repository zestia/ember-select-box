import Mixin from 'ember-metal/mixin';
import { A as emberA } from 'ember-array/utils';
import { scheduleOnce } from 'ember-runloop';

export default Mixin.create({
  init() {
    this._super(...arguments);
    this.set('_selectedOptions', emberA());
    this.set('selectedOptions', emberA());
  },

  _scheduleUpdateSelectedOptions() {
    scheduleOnce('afterRender', this, '_updateSelectedOptions');
  },

  _updateSelectedOptions() {
    this.set('selectedOptions', emberA(this.get('_selectedOptions').toArray()));
  },

  actions: {
    registerSelectedOption: function(selectedOption) {
      this.get('_selectedOptions').addObject(selectedOption);
      this._scheduleUpdateSelectedOptions();
    },

    deregisterSelectedOption: function(selectedOption) {
      this.get('_selectedOptions').removeObject(selectedOption);
      this._scheduleUpdateSelectedOptions();
    }
  }
});
