import Mixin from '@ember/object/mixin';
import { computed, get, set } from '@ember/object';
import scrollIntoView from '../../utils/select-box/scroll-into-view';
import escapeRegExp from '../../utils/escape-regexp';
const { fromCharCode } = String;
export const COLLECT_CHARS_MS = 1000;

export default Mixin.create({
  init() {
    this._super(...arguments);
    this._deactivateOptions();
  },

  _activateOptionAtIndex(index, scroll) {
    const under = index < 0;
    const over = index > this.options.length - 1;

    if (!(under || over)) {
      set(this, 'activeOptionIndex', index);
      this._activatedOption();
    }

    if (scroll) {
      this._scrollActiveOptionIntoView();
    }
  },

  _activateOptionForChar(char, scroll) {
    const lastChars = this._activateOptionChars || '';
    const lastMs = this._activateOptionMs;
    const lastIndex = this._activateOptionIndex || 0;
    const lastChar = lastChars.substring(lastChars.length - 1);
    const repeatedChar = char === lastChar;
    const ms = Date.now();
    const duration = lastMs ? ms - lastMs : 0;
    const reset = duration > COLLECT_CHARS_MS;

    let chars = reset ? char : `${lastChars}${char}`;
    let index = 0;
    let options = this._findOptionsMatchingChars(chars);
    let option = options[index];

    if (options.length < 1 && repeatedChar) {
      index = lastIndex + 1;
      chars = lastChar;
      options = this._findOptionsMatchingChars(chars);
      option = options[index];

      if (!option) {
        index = 0;
        option = options[index];
      }
    }

    if (option) {
      this.send('activateOptionAtIndex', get(option, 'index'), scroll);
    }

    set(this, '_activateOptionChars', chars);
    set(this, '_activateOptionMs', ms);
    set(this, '_activateOptionIndex', index);
  },

  _findOptionsMatchingChars(chars) {
    chars = escapeRegExp(chars);

    const pattern = new RegExp(`^${chars}`, 'i');

    return this.options.filter(option => {
      return pattern.test(option.element.textContent.trim());
    });
  },

  _activatedOption() {
    const activeOption = get(this, 'activeOption');

    if (activeOption) {
      activeOption.send('_activated');
    }
  },

  _deactivateOptions() {
    set(this, 'activeOptionIndex', -1);
  },

  _scrollActiveOptionIntoView() {
    const activeOption = get(this, 'activeOption');

    if (activeOption) {
      scrollIntoView(activeOption.element);
    }
  },

  activeOption: computed('activeOptionIndex', 'options', function() {
    return this.options.objectAt(get(this, 'activeOptionIndex'));
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

      this._activateOptionForChar(char, scroll);
    },

    deactivateOptions() {
      this._deactivateOptions();
    }
  }
});
