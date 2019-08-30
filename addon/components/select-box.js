import Component from '@ember/component';
import layout from '../templates/components/select-box';
import { readOnly, or } from '@ember/object/computed';
import { get, set } from '@ember/object';
import escapeRegExp from '../utils/general/escape-regexp';
import collapseWhitespace from '../utils/general/collapse-whitespace';
import { insertElement, destroyElement } from '../utils/select-box/element';
import {
  registerOptionsContainer,
  deregisterOptionsContainer
} from '../utils/registration/options';
import { receiveArgs } from '../utils/select-box/args';
import {
  registerSelectedOptionsContainer,
  deregisterSelectedOptionsContainer
} from '../utils/registration/selected-options';
import {
  activateOptionAtIndex,
  activateOption
} from '../utils/select-box/option/activate';
import {
  activateSelectedOptionAtIndex,
  activateSelectedOption
} from '../utils/select-box/selected-option/activate';
import { deactivateOptions } from '../utils/select-box/option/deactivate';
import { deactivateSelectedOptions } from '../utils/select-box/selected-option/deactivate';
import {
  initOptions,
  registerOption,
  deregisterOption
} from '../utils/registration/option';
import {
  initSelectedOptions,
  registerSelectedOption,
  deregisterSelectedOption
} from '../utils/registration/selected-option';
import {
  registerElement,
  deregisterElement
} from '../utils/registration/element';
import { registerInput, deregisterInput } from '../utils/registration/input';
import { destroyComponent } from '../utils/component/lifecycle';
import api from '../utils/select-box/api';
import { _selectOption, selectOption } from '../utils/select-box/option/select';
import { updateValue, receiveValue, selectValue } from '../utils/shared/value';
import { open, close, toggle } from '../utils/select-box/toggle';
import { focusIn, focusOut } from '../utils/select-box/focus';
import { maybeSearch, search, cancelSearch } from '../utils/select-box/search';
import { focusInput, blurInput } from '../utils/select-box/input/focus';
import { keyPress, keyDown } from '../utils/select-box/keyboard';
import { setInputValue } from '../utils/select-box/input/value';
import objectAtIndex from '../utils/general/object-at-index';
const { fromCharCode } = String;
export const COLLECT_CHARS_MS = 1000;

export default Component.extend({
  layout,
  tagName: '',

  // Arguments

  classNamePrefix: '',
  disabled: false,
  multiple: false,
  open: false,
  searchDelayTime: 100,
  searchMinChars: 1,
  searchSlowTime: 500,
  value: undefined,

  // Actions

  onBuildSelection: null,
  onClickOutside: null,
  onClose: null,
  onFocusIn: null,
  onFocusOut: null,
  onInit: null,
  onInsertElement: null,
  onOpen: null,
  onPressBackspace: null,
  onPressDown: null,
  onPressEnter: null,
  onPressEscape: null,
  onPressKey: null,
  onPressLeft: null,
  onPressRight: null,
  onPressTab: null,
  onPressUp: null,
  onSearch: null,
  onSearched: null,
  onSearchError: null,
  onSelect: null,
  onUpdate: null,

  // State

  resolvedValue: null,
  previousResolvedValue: null,
  activeOptionIndex: -1,
  activeSelectedOptionIndex: -1,
  documentClickHandler: null,
  domElement: null,
  domElementId: null,
  isFulfilled: false,
  isPending: true,
  isRejected: false,
  isSettled: false,
  tabIndex: '0',
  valueID: 0,
  searchID: 0,
  isInitialised: false,

  // Child components

  input: null,
  options: null,
  optionsContainer: null,
  selectedOptions: null,
  selectedOptionsContainer: null,

  // Computed state

  api: api(),
  isMultiple: readOnly('multiple'),
  isDisabled: readOnly('disabled'),
  isBusy: or('isPending', 'isSearching'),
  activeOption: objectAtIndex('options', 'activeOptionIndex'),
  activeSelectedOption: objectAtIndex(
    'selectedOptions',
    'activeSelectedOptionIndex'
  ),

  // Actions

  init() {
    this._super(...arguments);
    initOptions(this);
    initSelectedOptions(this);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    receiveArgs(this);
    receiveValue(this);
  },

  actions: {
    // Internal actions

    didInsertElement(element) {
      registerElement(this, element);
      insertElement(this);
    },

    willDestroyElement(element) {
      deregisterElement(this, element);
      destroyElement(this);
      destroyComponent(this);
    },

    onInitOption(option) {
      registerOption(this, option);
    },

    onDestroyOption(option) {
      deregisterOption(this, option);
    },

    onInitSelectedOption(option) {
      registerSelectedOption(this, option);
    },

    onDestroySelectedOption(option) {
      deregisterSelectedOption(this, option);
    },

    onInitOptionsContainer(optionsContainer) {
      registerOptionsContainer(this, optionsContainer);
    },

    onDestroyOptionsContainer(optionsContainer) {
      deregisterOptionsContainer(this, optionsContainer);
    },

    onInitSelectedOptionsContainer(selectedOptionsContainer) {
      registerSelectedOptionsContainer(this, selectedOptionsContainer);
    },

    onDestroySelectedOptionsContainer(selectedOptionsContainer) {
      deregisterSelectedOptionsContainer(this, selectedOptionsContainer);
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
      return selectOption(this, option);
    },

    onActivateOption(option) {
      activateOption(this, option);
    },

    onActivateSelectedOption(selectedOption) {
      activateSelectedOption(this, selectedOption);
    },

    // Public API Actions

    select(value) {
      return selectValue(this, value);
    },

    update(value) {
      return updateValue(this, value);
    },

    selectActiveOption() {
      return _selectOption(this.activeOption);
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

    activateNextOption(scroll = true) {
      activateOptionAtIndex(this, this.activeOptionIndex + 1, scroll);
    },

    activatePreviousOption(scroll = true) {
      activateOptionAtIndex(this, this.activeOptionIndex - 1, scroll);
    },

    activateSelectedOptionAtIndex(index, scroll = false) {
      activateSelectedOptionAtIndex(this, index, scroll);
    },

    activateNextSelectedOption(scroll = true) {
      activateSelectedOptionAtIndex(
        this,
        this.activeSelectedOptionIndex + 1,
        scroll
      );
    },

    activatePreviousSelectedOption(scroll = true) {
      activateSelectedOptionAtIndex(
        this,
        this.activeSelectedOptionIndex - 1,
        scroll
      );
    },

    deactivateOptions() {
      deactivateOptions(this);
    },

    deactivateSelectedOptions() {
      deactivateSelectedOptions(this);
    },

    // Todo

    activateOptionForKeyCode(keyCode, scroll = true) {
      const char = fromCharCode(keyCode);

      if (char) {
        this._activateOptionForChar(char, scroll);
      }
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
  }
});
