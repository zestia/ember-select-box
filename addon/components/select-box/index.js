import Component from '@glimmer/component';
import { isPresent } from '@ember/utils';
import {
  _selectOption,
  selectOption
} from '../../utils/select-box/option/select';
import {
  activateNextOption,
  activateOption,
  activateOptionAtIndex,
  activateOptionForKeyCode,
  activateOptionForValue,
  activatePreviousOption
} from '../../utils/select-box/option/activate';
import {
  activateNextSelectedOption,
  activatePreviousSelectedOption,
  activateSelectedOption,
  activateSelectedOptionAtIndex
} from '../../utils/select-box/selected-option/activate';
import { blurInput, focusInput } from '../../utils/select-box/input/focus';
import {
  cancelSearch,
  maybeSearch,
  search
} from '../../utils/select-box/search';
import { close, open, toggle } from '../../utils/select-box/toggle';
import { deactivateOptions } from '../../utils/select-box/option/deactivate';
import { deactivateSelectedOptions } from '../../utils/select-box/selected-option/deactivate';
import {
  deregisterElement,
  registerElement
} from '../../utils/registration/element';
import { deregisterInput, registerInput } from '../../utils/registration/input';
import {
  deregisterOption,
  registerOption
} from '../../utils/registration/option';
import {
  deregisterOptionsContainer,
  registerOptionsContainer
} from '../../utils/registration/options';
import {
  deregisterSelectedOption,
  registerSelectedOption
} from '../../utils/registration/selected-option';
import {
  deregisterSelectedOptionsContainer,
  registerSelectedOptionsContainer
} from '../../utils/registration/selected-options';
import {
  addDocumentClickListener,
  removeDocumentClickListener
} from '../../utils/select-box/document';
import { focusIn, focusOut } from '../../utils/select-box/focus';
import {
  keyDown,
  keyPress,
  shouldPreventDefault
} from '../../utils/select-box/keyboard';
import { receiveDisabled } from '../../utils/select-box/disabled';
import { setInputValue } from '../../utils/select-box/input/value';
import api from '../../utils/select-box/api';
import objectAtIndex from '../../utils/general/object-at-index';
import {
  receiveValue,
  selectValue,
  updateValue
} from '../../utils/shared/value';
import id from '../../utils/shared/id';
import buildClassName from '../../utils/select-box/class-name';
import { ready } from '../../utils/shared/ready';
import { insertElement } from '../../utils/shared/element';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A as emberA } from '@ember/array';

export default class SelectBox extends Component {
  activeOptionIndex = -1;
  activeSelectedOptionIndex = -1;
  documentClickHandler = null;
  memoisedAPI = null;
  optionCharState = null;
  previousResolvedValue = null;
  resolvedValue = null;
  searchID = 0;
  tabIndex = '0';
  valueID = 0;
  input = null;
  pendingOptions = emberA();
  pendingSelectedOptions = emberA();

  optionsContainer = null;
  selectedOptionsContainer = null;

  @tracked domElement = null;
  @tracked options = [];
  @tracked selectedOptions = [];
  @tracked isFocused = false;
  @tracked isFulfilled = false;
  @tracked isOpen = false;
  @tracked isPending = true;
  @tracked isRejected = false;
  @tracked isSearching = false;
  @tracked isSettled = false;
  @tracked isSlowSearch = false;

  @id() id;
  @api() api;
  @objectAtIndex('options', 'activeOptionIndex') activeOption;
  @objectAtIndex('selectedOptions', 'activeSelectedOptionIndex')
  activeSelectedOption;

  get className() {
    return buildClassName(this);
  }

  get isDisabled() {
    return this.args.disabled;
  }

  get isMultiple() {
    return this.args.multiple;
  }

  get isBusy() {
    return this.isPending || this.isSearching;
  }

  get searchDelayTime() {
    return isPresent(this.args.searchDelayTime)
      ? this.args.searchDelayTime
      : 100;
  }

  get searchMinChars() {
    return isPresent(this.args.searchMinChars) ? this.args.searchMinChars : 1;
  }

  get searchSlowTime() {
    return isPresent(this.args.searchSlowTime) ? this.args.searchSlowTime : 500;
  }

  constructor() {
    super(...arguments);
    receiveDisabled(this);
    receiveValue(this);
  }

  // Internal actions

  @action
  handleInsertElement(element) {
    registerElement(this, element);
    addDocumentClickListener(this);
    insertElement(this);
    ready(this);
  }

  @action
  handleDestroyElement() {
    deregisterElement(this);
    removeDocumentClickListener(this);
  }

  @action
  handleUpdateValue() {
    receiveValue(this);
  }

  @action
  handleUpdateDisabled() {
    receiveDisabled(this);
  }

  @action
  handleInsertOption(option) {
    registerOption(this, option);
  }

  @action
  handleDestroyOption(option) {
    deregisterOption(this, option);
  }

  @action
  handleInsertSelectedOption(option) {
    registerSelectedOption(this, option);
  }

  @action
  handleDestroySelectedOption(option) {
    deregisterSelectedOption(this, option);
  }

  @action
  handleInsertOptionsContainer(optionsContainer) {
    registerOptionsContainer(this, optionsContainer);
  }

  @action
  handleDestroyOptionsContainer(optionsContainer) {
    deregisterOptionsContainer(this, optionsContainer);
  }

  @action
  handleInsertSelectedOptionsContainer(selectedOptionsContainer) {
    registerSelectedOptionsContainer(this, selectedOptionsContainer);
  }

  @action
  handleDestroySelectedOptionsContainer(selectedOptionsContainer) {
    deregisterSelectedOptionsContainer(this, selectedOptionsContainer);
  }

  @action
  handleInsertInput(input) {
    registerInput(this, input);
  }

  @action
  handleDestroyInput(input) {
    deregisterInput(this, input);
  }

  @action
  handleInputText(text) {
    maybeSearch(this, text);
  }

  @action
  handleFocusIn(e) {
    focusIn(this, e);
  }

  @action
  handleFocusOut(e) {
    focusOut(this, e);
  }

  @action
  handleKeyPress(e) {
    keyPress(this, e);
  }

  @action
  handleKeyDown(e) {
    keyDown(this, e);
  }

  @action
  handlePressEnter(e) {
    if (!this.activeOption) {
      return;
    }

    if (shouldPreventDefault(this, e)) {
      e.preventDefault();
    }

    _selectOption(this.activeOption);
  }

  @action
  handleSelectOption(option) {
    return selectOption(this, option);
  }

  @action
  handleActivateOption(option) {
    activateOption(this, option);
  }

  @action
  handleActivateSelectedOption(selectedOption) {
    activateSelectedOption(this, selectedOption);
  }

  // Public API Actions

  @action
  select(value) {
    return selectValue(this, value);
  }

  @action
  update(value) {
    return updateValue(this, value);
  }

  @action
  selectActiveOption() {
    if (!this.activeOption) {
      return;
    }

    return _selectOption(this.activeOption);
  }

  @action
  open() {
    open(this);
  }

  @action
  close() {
    close(this);
  }

  @action
  toggle() {
    toggle(this);
  }

  @action
  search(query) {
    return search(this, query);
  }

  @action
  cancelSearch() {
    cancelSearch(this);
  }

  @action
  focusInput() {
    focusInput(this);
  }

  @action
  blurInput() {
    blurInput(this);
  }

  @action
  setInputValue(value) {
    setInputValue(this, value);
  }

  @action
  activateOptionForValue(value, config) {
    activateOptionForValue(this, value, config);
  }

  @action
  activateOptionAtIndex(index, config) {
    activateOptionAtIndex(this, index, config);
  }

  @action
  activateNextOption(config) {
    activateNextOption(this, config);
  }

  @action
  activatePreviousOption(config) {
    activatePreviousOption(this, config);
  }

  @action
  activateOptionForKeyCode(keyCode, config) {
    activateOptionForKeyCode(this, keyCode, config);
  }

  @action
  activateSelectedOptionAtIndex(index, config) {
    activateSelectedOptionAtIndex(this, index, config);
  }

  @action
  activateNextSelectedOption(config) {
    activateNextSelectedOption(this, config);
  }

  @action
  activatePreviousSelectedOption(config) {
    activatePreviousSelectedOption(this, config);
  }

  @action
  deactivateOptions() {
    deactivateOptions(this);
  }

  @action
  deactivateSelectedOptions() {
    deactivateSelectedOptions(this);
  }
}
