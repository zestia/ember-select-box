import Mixin from '@ember/object/mixin';
import { computed, get } from '@ember/object';
import scrollIntoView from '../../utils/select-box/scroll-into-view';
import { later, cancel } from '@ember/runloop';
const { fromCharCode } = String;
const alphaNumeric = /^[0-9a-z]$/i;

export default Mixin.create({
  init() {
    this._super(...arguments);
    this._deactivateOptions();
  },

  _activateOptionAtIndex(index, scroll) {
    const under = index < 0;
    const over  = index > this.options.length - 1;

    if (!(under || over)) {
      this.set('activeOptionIndex', index);
      this._activatedOption();
    }

    if (scroll) {
      this._scrollActiveOptionIntoView();
    }
  },

  _activateOptionForChar(char, scroll) {
    cancel(this.activateOptionCharTimer);

    const timer     = later(this, '_resetActivateOptionChars', 1000);
    const index     = this.activateOptionCharIndex || 0;
    const lastChars = this.activateOptionChars || '';
    const lastChar  = lastChars.substring(lastChars.length - 1);
    const chars     = lastChars + char;

    let options;
    let option;

    if (lastChar && lastChar === char) {
      options = this._findOptionsMatchingChars(char);
      option = options[index];
    } else {
      options = this._findOptionsMatchingChars(chars);
      option = options[0];
    }

    this.set('activateOptionChars', chars);
    this.set('activateOptionCharTimer', timer);
    this.set('activateOptionCharIndex', index >= options.length - 1 ? 0 : index + 1);

    if (option) {
      this.send('activateOptionAtIndex', get(option, 'index'), scroll);
    }
  },

  _findOptionsMatchingChars(chars) {
    const pattern = new RegExp(`^${chars}`, 'i');

    return this.options.filter(option => {
      return pattern.test(option.element.textContent.trim());
    });
  },

  _resetActivateOptionChars() {
    this.set('activateOptionChars', '');
  },

  _activatedOption() {
    const activeOption = get(this, 'activeOption');

    if (activeOption) {
      activeOption.send('_activated');
    }
  },

  _deactivateOptions() {
    this.set('activeOptionIndex', -1);
  },

  _scrollActiveOptionIntoView() {
    scrollIntoView(get(this, 'activeOption').element);
  },

  activeOption: computed('activeOptionIndex', 'options', function() {
    return this.options.objectAt(this.activeOptionIndex);
  }),

  actions: {
    activateOptionAtIndex(index, scroll = false) {
      this._activateOptionAtIndex(index, scroll);
    },

    activateNextOption(scroll = true) {
      const next = this.activeOptionIndex + 1;
      this._activateOptionAtIndex(next, scroll);
    },

    activatePreviousOption(scroll = true) {
      const prev = this.activeOptionIndex - 1;
      this._activateOptionAtIndex(prev, scroll);
    },

    activateOptionForKeyCode(keyCode, scroll = true) {
      const char = fromCharCode(keyCode);

      if (alphaNumeric.test(char)) {
        this._activateOptionForChar(char, scroll);
      }
    },

    deactivateOptions() {
      this._deactivateOptions();
    }
  }
});
