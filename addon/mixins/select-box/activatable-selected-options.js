import Mixin from '@ember/object/mixin';
import { computed, get, set } from '@ember/object';
import scrollIntoView from '../../utils/select-box/scroll-into-view';

export default Mixin.create({
  init() {
    this._super(...arguments);
    this._deactivateSelectedOptions();
  },

  _activateSelectedOptionAtIndex(index, scroll) {
    const under = index < 0;
    const over = index > this.selectedOptions.length - 1;

    if (!(under || over)) {
      set(this, 'activeSelectedOptionIndex', index);
      this._activatedSelectedOption();
    }

    if (scroll) {
      this._scrollActiveSelectedOptionIntoView();
    }
  },

  _activatedSelectedOption() {
    if (this.activeSelectedOption) {
      this.activeSelectedOption.send('_activated');
    }
  },

  _deactivateSelectedOptions() {
    set(this, 'activeSelectedOptionIndex', -1);
  },

  _scrollActiveSelectedOptionIntoView() {
    if (this.activeSelectedOption) {
      scrollIntoView(this.activeSelectedOption.element);
    }
  },

  activeSelectedOption: computed('activeSelectedOptionIndex', 'selectedOptions', function() {
    const index = this.activeSelectedOptionIndex;
    return this.selectedOptions.objectAt(index);
  }),

  actions: {
    activateSelectedOptionAtIndex(index, scroll = false) {
      this._activateSelectedOptionAtIndex(index, scroll);
    },

    activateNextSelectedOption(scroll = true) {
      const next = this.activeSelectedOptionIndex + 1;
      this._activateSelectedOptionAtIndex(next, scroll);
    },

    activatePreviousSelectedOption(scroll = true) {
      const prev = this.activeSelectedOptionIndex - 1;
      this._activateSelectedOptionAtIndex(prev, scroll);
    },

    deactivateSelectedOptions() {
      this._deactivateSelectedOptions();
    }
  }
});
