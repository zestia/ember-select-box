import Mixin from 'ember-metal/mixin';
import computed from 'ember-computed';
import scrollIntoView from '../../../utils/select-box/scroll-into-view';

export default Mixin.create({
  init() {
    this._super(...arguments);
    this._deactivateSelectedOptions();
  },

  _activateSelectedOptionAtIndex(index, scroll) {
    const under = index < 0;
    const over  = index > this.get('selectedOptions.length') - 1;
    if (!(under || over)) {
      this.set('activeSelectedOptionIndex', index);
    }
    if (scroll) {
      this._scrollActiveSelectedOptionIntoView();
    }
  },

  _deactivateSelectedOptions() {
    this.set('activeSelectedOptionIndex', -1);
  },

  _scrollActiveSelectedOptionIntoView() {
    scrollIntoView(
      this.get('activeSelectedOption.element'),
      this.get('selectedOptionsContainer.element')
    );
  },

  activeSelectedOption: computed('activeSelectedOptionIndex', 'selectedOptions',
  function() {
    const index = this.get('activeSelectedOptionIndex');
    return this.get('selectedOptions').objectAt(index);
  }),

  actions: {
    activateSelectedOptionAtIndex(index, scroll) {
      this._activateSelectedOptionAtIndex(index, scroll);
    },
    activateNextSelectedOption(scroll) {
      const next = this.get('activeSelectedOptionIndex') + 1;
      this._activateSelectedOptionAtIndex(next, scroll);
    },
    activatePreviousSelectedOption(scroll) {
      const prev = this.get('activeSelectedOptionIndex') - 1;
      this._activateSelectedOptionAtIndex(prev, scroll);
    },
    deactivateSelectedOptions() {
      this._deactivateSelectedOptions();
    }
  }
});
