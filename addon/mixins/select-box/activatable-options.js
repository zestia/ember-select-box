import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import scrollIntoView from '../../utils/select-box/scroll-into-view';

export default Mixin.create({
  init() {
    this._super(...arguments);
    this._deactivateOptions();
  },

  _activateOptionAtIndex(index, scroll) {
    const under = index < 0;
    const over  = index > this.get('options.length') - 1;
    if (!(under || over)) {
      this.set('activeOptionIndex', index);
      this._activatedOption();
    }
    if (scroll) {
      this._scrollActiveOptionIntoView();
    }
  },

  _activatedOption() {
    const activeOption = this.get('activeOption');
    if (activeOption) {
      activeOption.send('_activated');
    }
  },

  _deactivateOptions() {
    this.set('activeOptionIndex', -1);
  },

  _scrollActiveOptionIntoView() {
    scrollIntoView(this.get('activeOption.element'));
  },

  activeOption: computed('activeOptionIndex', 'options', function() {
    return this.get('options').objectAt(this.get('activeOptionIndex'));
  }),

  actions: {
    activateOptionAtIndex(index, scroll) {
      this._activateOptionAtIndex(index, scroll);
    },

    activateNextOption(scroll) {
      const next = this.get('activeOptionIndex') + 1;
      this._activateOptionAtIndex(next, scroll);
    },

    activatePreviousOption(scroll) {
      const prev = this.get('activeOptionIndex') - 1;
      this._activateOptionAtIndex(prev, scroll);
    },

    deactivateOptions() {
      this._deactivateOptions();
    }
  }
});
