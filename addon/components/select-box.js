import Component from '@ember/component';
import BaseSelectBox from '../mixins/select-box/base';
import HasInput from '../mixins/select-box/registration/has-input';
import HasOptions from '../mixins/select-box/registration/has-options';
import HasOptionsContainer from '../mixins/select-box/registration/has-options-container';
import HasSelectedOptions from '../mixins/select-box/registration/has-selected-options';
import HasSelectedOptionsContainer from '../mixins/select-box/registration/has-selected-options-container';
import HasDomElement from '../mixins/select-box/registration/has-dom-element';
import Inputtable from '../mixins/select-box/inputtable';
import KeyboardEvents from '../mixins/select-box/keyboard-events';
import layout from '../templates/components/select-box';
import Searchable from '../mixins/select-box/searchable';
import SelectActiveOption from '../mixins/select-box/select-active-option';
import SelectActiveOptionOnEnter from '../mixins/select-box/select-active-option-on-enter';
import API from '../mixins/select-box/api';
import Toggleable from '../mixins/select-box/toggleable';
import { or } from '@ember/object/computed';
import { computed, get, set } from '@ember/object';
import scrollIntoView from '../utils/select-box/scroll-into-view';
import escapeRegExp from '../utils/escape-regexp';
import collapseWhitespace from '../utils/collapse-whitespace';
import { A as emberA } from '@ember/array';
import { bind } from '@ember/runloop';
import { isPresent } from '@ember/utils';
import invokeAction from '../utils/invoke-action';
const { isArray, from } = Array;
const { fromCharCode } = String;
export const COLLECT_CHARS_MS = 1000;

const mixins = [
  API,
  BaseSelectBox,
  HasInput,
  HasOptions,
  HasOptionsContainer,
  HasSelectedOptions,
  HasSelectedOptionsContainer,
  HasDomElement,
  Inputtable,
  KeyboardEvents,
  Searchable,
  SelectActiveOption,
  SelectActiveOptionOnEnter,
  Toggleable
];

export default Component.extend(...mixins, {
  layout,
  tagName: '',

  tabIndex: '0',

  isBusy: or('isPending', 'isSearching'),

  activeSelectedOption: computed(
    'activeSelectedOptionIndex',
    'selectedOptions',
    function() {
      return this.selectedOptions.objectAt(
        get(this, 'activeSelectedOptionIndex')
      );
    }),

  activeOption: computed('activeOptionIndex', 'options', function() {
    return this.options.objectAt(get(this, 'activeOptionIndex'));
  }),

  init() {
    this._super(...arguments);
    this._deactivateOptions();
    this._deactivateSelectedOptions();
  },

  didReceiveAttrs() {
    this._super(...arguments);

    if (isPresent(this.disabled)) {
      set(this, 'isDisabled', Boolean(this.disabled));
    }

    set(this, 'tabIndex', this.isDisabled ? '-1' : '0');
  },

  actions: {
    activateOptionAtIndex(index, scroll = false) {
      this._activateOptionAtIndex(index, scroll);
    },

    activateSelectedOptionAtIndex(index, scroll = false) {
      this._activateSelectedOptionAtIndex(index, scroll);
    },

    activateNextOption(scroll = true) {
      const next = this.activeOptionIndex + 1;
      this._activateOptionAtIndex(next, scroll);
    },

    activateNextSelectedOption(scroll = true) {
      const next = this.activeSelectedOptionIndex + 1;
      this._activateSelectedOptionAtIndex(next, scroll);
    },

    activatePreviousOption(scroll = true) {
      const prev = this.activeOptionIndex - 1;
      this._activateOptionAtIndex(prev, scroll);
    },

    activatePreviousSelectedOption(scroll = true) {
      const prev = this.activeSelectedOptionIndex - 1;
      this._activateSelectedOptionAtIndex(prev, scroll);
    },

    activateOptionForKeyCode(keyCode, scroll = true) {
      const char = fromCharCode(keyCode);

      if (char) {
        this._activateOptionForChar(char, scroll);
      }
    },

    deactivateOptions() {
      this._deactivateOptions();
    },

    deactivateSelectedOptions() {
      this._deactivateSelectedOptions();
    },

    _select(value) {
      value = this._buildSelectedValue(value, this.internalValue);
      this._super(value);
    },

    _onFocusIn(e) {
      this._super(...arguments);

      if (this.isDestroyed) {
        return;
      }

      set(this, 'isFocused', true);
      invokeAction(this, 'onFocusIn', e, this.api);
    },

    _onFocusOut(e) {
      this._super(...arguments);

      if (this.isDestroyed) {
        return;
      }

      try {
        set(this, 'isFocused', false);
      } catch (error) {
        // https://github.com/emberjs/ember.js/issues/18043
      }

      invokeAction(this, 'onFocusOut', e, this.api);
    },

    _registerDomElement() {
      this._super(...arguments);
      set(this, '_documentClickHandler', bind(this, '_clickDocument'));
      document.addEventListener('click', this._documentClickHandler);
      document.addEventListener('touchstart', this._documentClickHandler);
    },

    _deregisterDomElement() {
      this._super(...arguments);
      document.removeEventListener('click', this._documentClickHandler);
      document.removeEventListener('touchstart', this._documentClickHandler);
    }
  },

  clickDocument(e) {
    this._super(...arguments);
    const el = this.domElement;
    const clickedSelf = el === e.target;
    const clickedInside = el.contains(e.target);
    const clickedOutside = !clickedSelf && !clickedInside;

    if (clickedOutside) {
      this.clickOutside(e);
    }
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

  _activateOptionForChar(char, scroll) {
    const lastChars = this._activateOptionChars || '';
    const lastMs = this._activateOptionMs || 0;
    const lastIndex = this._activateOptionIndex || 0;
    const lastChar = lastChars.substring(lastChars.length - 1);
    const ms = Date.now();
    const duration = ms - lastMs;
    const repeatedChar = char === lastChar;
    const reset = duration > COLLECT_CHARS_MS;
    const chars = reset ? char : `${lastChars}${char}`;
    let options = this._findOptionsMatchingChars(chars);
    let index = 0;
    let option;

    if (repeatedChar) {
      index = lastIndex + 1;
      options = this._findOptionsMatchingChars(lastChar);
      option = options[index];
    }

    if (!option) {
      index = 0;
      option = options[index];
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
      return pattern.test(collapseWhitespace(option.domElement.textContent));
    });
  },

  _activatedOption() {
    const activeOption = get(this, 'activeOption');

    if (activeOption) {
      activeOption.send('_activated');
    }
  },

  _activatedSelectedOption() {
    const activeSelectedOption = get(this, 'activeSelectedOption');

    if (activeSelectedOption) {
      activeSelectedOption.send('_activated');
    }
  },

  _deactivateOptions() {
    set(this, 'activeOptionIndex', -1);
  },

  _deactivateSelectedOptions() {
    set(this, 'activeSelectedOptionIndex', -1);
  },

  _scrollActiveOptionIntoView() {
    const activeOption = get(this, 'activeOption');

    if (activeOption) {
      scrollIntoView(activeOption.domElement);
    }
  },

  _scrollActiveSelectedOptionIntoView() {
    const activeSelectedOption = get(this, 'activeSelectedOption');

    if (activeSelectedOption) {
      scrollIntoView(activeSelectedOption.domElement);
    }
  },

  _buildSelectedValue(value1, value2) {
    let build = this.onBuildSelection;

    if (typeof build !== 'function') {
      build = bind(this, '_buildSelectedValueDefault');
    }

    return build(value1, value2);
  },

  _buildSelectedValueDefault(value1, value2) {
    let value = value1;

    if (get(this, 'isMultiple') && !isArray(value1)) {
      const temp = emberA(from(value2));

      if (temp.includes(value1)) {
        temp.removeObject(value1);
      } else {
        temp.addObject(value1);
      }

      value = temp.toArray();
    }

    return value;
  },

  _clickDocument() {
    if (this.isDestroyed) {
      return;
    }

    this.clickDocument(...arguments);
  },

  clickOutside(e) {
    this._super(...arguments);
    invokeAction(this, 'onClickOutside', e, this.api);
  }
});
