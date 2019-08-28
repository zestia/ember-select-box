import Component from '@ember/component';
import layout from '../templates/components/select-box';
import { readOnly, or } from '@ember/object/computed';
import { get, set } from '@ember/object';
import escapeRegExp from '../utils/general/escape-regexp';
import collapseWhitespace from '../utils/general/collapse-whitespace';
import { A as emberA } from '@ember/array';
import invokeAction from '../utils/shared/invoke-action';
import { bind, scheduleOnce } from '@ember/runloop';
import { isPresent } from '@ember/utils';
import { assert } from '@ember/debug';
import { initOptions, registerOption, deregisterOption } from '../utils/registration/options';
import { registerElement, deregisterElement } from '../utils/registration/element';
import { registerInput, deregisterInput } from '../utils/registration/input';
import { initComponent, destroyComponent } from '../utils/shared/lifecycle';
import api from '../utils/select-box/api';
import { _selectOption, selectOption } from '../utils/select-box/option/select';
import { updateValue } from '../utils/shared/value';
import { selectValue } from '../utils/select-box/value';
import { open, close, toggle } from '../utils/select-box/toggle';
import { focusIn, focusOut } from '../utils/select-box/focus';
import { maybeSearch, search, cancelSearch } from '../utils/select-box/search';
import { focusInput, blurInput } from '../utils/select-box/input/focus';
import { keyPress, keyDown } from '../utils/select-box/keyboard';
import { setInputValue } from '../utils/select-box/input/value';
import objectAtIndex from '../utils/macros/object-at-index';
import activateOptionAtIndex from '../utils/select-box/option/activate';
const { fromCharCode } = String;
export const COLLECT_CHARS_MS = 1000;



export default Component.extend({
  layout,
  tagName: '',

  // Arguments

  tabIndex: '0',
  searchMinChars: 1,
  searchDelayTime: 100,
  searchSlowTime: 500,

  // Computed state

  isMultiple: readOnly('multiple'),
  isBusy: or('isPending', 'isSearching'),
  activeOption: objectAtIndex('options', 'activeOptionIndex'),
  activeSelectedOption: objectAtIndex('selectedOptions', 'activeSelectedOptionIndex'),

  init() {
    this._super(...arguments);
    this._deactivateOptions();
    this._deactivateSelectedOptions();
    initOptions(this, 'options');
    set(this, '_selectedOptions', emberA());
    set(this, 'selectedOptions', emberA());
    initComponent(this);
  },

  didReceiveAttrs() {
    this._super(...arguments);

    if (isPresent(this.disabled)) {
      set(this, 'isDisabled', Boolean(this.disabled));
    }

    set(this, 'tabIndex', this.isDisabled ? '-1' : '0');

    if (isPresent(this.open)) {
      set(this, 'isOpen', this.open);
    }

    updateValue(this, this.value);
  },

  actions: {
    // Internal actions

    onInitOption(option) {
      registerOption(this, 'options', option);
    },

    onDestroyOption(option) {
      deregisterOption(this, 'options', option);
    },

    onInitInput(input) {
      registerInput(this, input);
    },

    onDestroyInput(input) {
      deregisterInput(this, input);
    },

    onInputText(text) {
      maybeSearch(this, text);
    },

    onFocusIn(e) {
      focusIn(this, e);
    },

    onFocusOut(e) {
      focusOut(this, e);
    },

    onKeyPress(e) {
      keyPress(this, e);
    },

    onKeyDown(e) {
      keyDown(this, e);
    },

    onPressEnter() {
      _selectOption(this.activeOption);
    },

    onSelectOption(option) {
      selectOption(this, option);
    },

    onActivateOption(option) {
      activateOptionAtIndex(this, option.index);
    },

    onActivateSelectedOption(selectedOption) {
      activateOptionAtIndex(this, selectedOption.index);
    },

    // Public API Actions

    select(value) {
      selectValue(this, value);
    },

    update(value) {
      return updateValue(this, value);
    },

    open() {
      open(this);
    },

    close() {
      close(this);
    },

    toggle() {
      toggle(this);
    },

    search(query) {
      return search(this, query);
    },

    cancelSearch() {
      cancelSearch(this);
    },

    focusInput() {
      focusInput(this);
    },

    blurInput() {
      blurInput(this);
    },

    setInputValue(value) {
      setInputValue(this, value);
    },

    activateOptionAtIndex(index, scroll = false) {
      activateOptionAtIndex(this, index, scroll);
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



    didInsertElement(element) {
      registerElement(this, element);

      set(this, '_documentClickHandler', bind(this, '_clickDocument'));
      document.addEventListener('click', this._documentClickHandler);
      document.addEventListener('touchstart', this._documentClickHandler);

      invokeAction(this, 'onInsertElement', this.api());
    },

    willDestroyElement(element) {
      deregisterElement(this, element);

      document.removeEventListener('click', this._documentClickHandler);
      document.removeEventListener('touchstart', this._documentClickHandler);

      destroyComponent(this);
    },

    _registerOptionsContainer(container) {
      assert(
        'A select box can only have 1 options container',
        !this._optionsContainer
      );
      set(this, '_optionsContainer', container);
    },

    _deregisterOptionsContainer() {
      set(this, '_optionsContainer', null);
    },





    _registerSelectedOption(selectedOption) {
      this._selectedOptions.addObject(selectedOption);
      this._scheduleUpdateSelectedOptions();
    },

    _deregisterSelectedOption(selectedOption) {
      this._selectedOptions.removeObject(selectedOption);
      this._scheduleUpdateSelectedOptions();
    },

    _registerSelectedOptionsContainer(container) {
      assert(
        'A select box can only have 1 selected options container',
        !this._selectedOptionsContainer
      );
      set(this, '_selectedOptionsContainer', container);
    },

    _deregisterSelectedOptionsContainer() {
      set(this, '_selectedOptionsContainer', null);
    },







    selectActiveOption() {
      const activeOption = get(this, 'activeOption');

      if (activeOption) {
        activeOption.send('select');
      }
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


  _activatedSelectedOption() {
    const activeSelectedOption = get(this, 'activeSelectedOption');

    if (activeSelectedOption) {
      // activateAction(activeSelectedOption);
    }
  },

  _deactivateOptions() {
    set(this, 'activeOptionIndex', -1);
  },

  _deactivateSelectedOptions() {
    set(this, 'activeSelectedOptionIndex', -1);
  },


  _scrollActiveSelectedOptionIntoView() {
    const activeSelectedOption = get(this, 'activeSelectedOption');

    if (activeSelectedOption) {
      // scrollIntoView(activeSelectedOption.domElement);
    }
  },

  _clickDocument() {
    if (this.isDestroyed) {
      return;
    }

    this.clickDocument(...arguments);
  },

  clickOutside(e) {
    this._super(...arguments);
    invokeAction(this, 'onClickOutside', e, this.api());
  },

  _scheduleUpdateOptions() {
    scheduleOnce('afterRender', this, '_updateOptions');
  },

  _updateOptions() {
    set(this, 'options', emberA(this._options.toArray()));
  },

  _scheduleUpdateSelectedOptions() {
    scheduleOnce('afterRender', this, '_updateSelectedOptions');
  },

  _updateSelectedOptions() {
    set(this, 'selectedOptions', emberA(this._selectedOptions.toArray()));
  },

  api() {
    return api(this);
  }
});
