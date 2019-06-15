import Mixin from '@ember/object/mixin';
import { computed, get, set } from '@ember/object';
import scrollIntoView from '../../utils/select-box/scroll-into-view';
import escapeRegExp from '../../utils/escape-regexp';
const { fromCharCode } = String;
export const COLLECT_CHARS_MS = 500;

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
    const lastMs = this._activateOptionCharsMs;
    const lastIndex = this._activateOptionCharsIndex || 0;
    const lastChar = lastChars.substring(lastChars.length - 1);
    const ms = Date.now();
    const duration = lastMs ? ms - lastMs : 0;
    const reset = duration > COLLECT_CHARS_MS;

    let chars;
    let matchIndex;

    if (reset) {
      chars = char;
      matchIndex = 0;
    } else if (char === lastChar) {
      chars = char;
      matchIndex = lastIndex + 1;
    } else {
      chars = `${lastChars}${char}`;
      matchIndex = 0;
    }

    const options = this._findOptionsMatchingChars(chars);
    const option = options[matchIndex];

    if (option) {
      this.send('activateOptionAtIndex', get(option, 'index'), scroll);
    }

    set(this, '_activateOptionChars', chars);
    set(this, '_activateOptionCharsMs', ms);
    set(this, '_activateOptionCharsIndex', matchIndex);
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
