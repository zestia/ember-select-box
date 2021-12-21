import Component from '@glimmer/component';
import SelectBoxGroup from './group/index';
import SelectBoxInput from './input/index';
import SelectBoxOption from './option/index';
import SelectBoxOptions from './options/index';
import SelectBoxSelectedOption from './selected-option/index';
import SelectBoxSelectedOptions from './selected-options/index';
import {
  _selectOption,
  selectOption
} from '../../utils/select-box/option/select';
import {
  deactivateOptions,
  activateNextOption,
  activateOption,
  activateOptionAtIndex,
  activateOptionForKeyCode,
  activateOptionForValue,
  activatePreviousOption
} from '../../utils/select-box/option/activate';
import { blurInput, focusInput } from '../../utils/select-box/input/focus';
import {
  cancelSearch,
  maybeSearch,
  search
} from '../../utils/select-box/search';
import { close, open, toggle } from '../../utils/select-box/toggle';
import {
  deregisterElement,
  registerElement
} from '../../utils/registration/element';
import { deregisterInput, registerInput } from '../../utils/registration/input';
import {
  deregisterSelectedOption,
  registerSelectedOption
} from '../../utils/registration/selected-option';
import {
  deregisterSelectedOptions,
  registerSelectedOptions
} from '../../utils/registration/selected-options';
import {
  deregisterOption,
  registerOption
} from '../../utils/registration/option';
import {
  deregisterOptions,
  registerOptions
} from '../../utils/registration/options';
import { registerComponents } from '../../utils/registration/components';
import { focusOut } from '../../utils/select-box/focus';
import { keyDown, keyPress } from '../../utils/select-box/keyboard';
import { setInputValue } from '../../utils/select-box/input/value';
import buildAPI from '../../utils/shared/api';
import {
  receiveValue,
  selectValue,
  updateValue
} from '../../utils/shared/value';
import { ready } from '../../utils/shared/ready';
import { tracked } from '@glimmer/tracking';
import { lifecycleHooks } from '../../utils/component/lifecycle';

export default class SelectBox extends Component {
  // Misc state
  element = null;
  charState = null;
  previousValue = null;
  sealedAPI = {};
  searchId = 0;
  valueId = 0;

  // Tracked state
  @tracked activeOptionIndex = -1;
  @tracked isFulfilled = false;
  @tracked isOpen = false;
  @tracked isPending = true;
  @tracked isReady = false;
  @tracked isRejected = false;
  @tracked isSearching = false;
  @tracked isSettled = false;
  @tracked isSlowSearch = false;
  @tracked value = null;

  // Component classes
  SelectBoxGroup = SelectBoxGroup;
  SelectBoxInput = SelectBoxInput;
  SelectBoxOption = SelectBoxOption;
  SelectBoxOptions = SelectBoxOptions;
  SelectBoxSelectedOption = SelectBoxSelectedOption;
  SelectBoxSelectedOptions = SelectBoxSelectedOptions;

  // Component declarations
  Group = null;
  Input = null;
  Option = null;
  Options = null;
  SelectedOption = null;
  SelectedOptions = null;

  // Component instances
  @tracked input = null;
  @tracked option = [];
  @tracked options = null;
  @tracked selectedOption = [];
  @tracked selectedOptions = null;
  pendingOption = [];
  pendingSelectedOption = [];

  registerComponents = registerComponents(this);
  lifecycleHooks = lifecycleHooks(this);

  get api() {
    return buildAPI(this, [
      // Components
      'Group',
      'Input',
      'Option',
      'Options',
      'SelectedOption',
      'SelectedOptions',
      // Properties
      'element',
      'isBusy',
      'isDisabled',
      'isFulfilled',
      'isMultiple',
      'isOpen',
      'isPending',
      'isRejected',
      'isSearching',
      'isSettled',
      'isSlowSearch',
      'value',
      // Actions
      'activateNextOption',
      'activateOptionAtIndex',
      'activateOptionForKeyCode',
      'activateOptionForValue',
      'activatePreviousOption',
      'blurInput',
      'cancelSearch',
      'close',
      'deactivateOptions',
      'focusInput',
      'open',
      'search',
      'select',
      'selectActiveOption',
      'setInputValue',
      'toggle',
      'update'
    ]);
  }

  get activeOption() {
    return this.option[this.activeOptionIndex];
  }

  get role() {
    return this.input ? 'combobox' : 'listbox';
  }

  get isListbox() {
    return this.role === 'listbox';
  }

  get isCombobox() {
    return this.role === 'combobox';
  }

  get tabIndex() {
    return this.isDisabled || this.isCombobox ? '-1' : '0';
  }

  get isBusy() {
    return this.isPending || this.isSearching;
  }

  get isDisabled() {
    return !!this.args.disabled;
  }

  get isMultiple() {
    return !!this.args.multiple;
  }

  get isMultiSelectable() {
    return this.isListbox ? this.isMultiple : null;
  }

  get labelledBy() {
    if (this.selectedOptions) {
      return this.selectedOptions.id;
    } else if (this.selectedOption.length > 0) {
      return this.selectedOption[0].id;
    } else if (this.input) {
      return this.input.id;
    } else {
      return null;
    }
  }

  get searchDelayTime() {
    return this.args.searchDelayTime ?? 100;
  }

  get searchMinChars() {
    return this.args.searchMinChars ?? 1;
  }

  get searchSlowTime() {
    return this.args.searchSlowTime ?? 500;
  }

  constructor() {
    super(...arguments);
    receiveValue(this);
    ready(this);
  }

  handleInsertElement = (element) => {
    registerElement(this, element);
  };

  handleUpdatedValue = () => {
    receiveValue(this);
  };

  handleDestroyElement = () => {
    deregisterElement(this);
  };

  handleInsertOption = (option) => {
    registerOption(this, option);
  };

  handleDestroyOption = (option) => {
    deregisterOption(this, option);
  };

  handleInsertOptions = (options) => {
    registerOptions(this, options);
  };

  handleDestroyOptions = (options) => {
    deregisterOptions(this, options);
  };

  handleInsertSelectedOption = (selectedOption) => {
    registerSelectedOption(this, selectedOption);
  };

  handleDestroySelectedOption = (selectedOption) => {
    deregisterSelectedOption(this, selectedOption);
  };

  handleInsertSelectedOptions = (selectedOptions) => {
    registerSelectedOptions(this, selectedOptions);
  };

  handleDestroySelectedOptions = (selectedOptions) => {
    deregisterSelectedOptions(this, selectedOptions);
  };

  handleInsertInput = (input) => {
    registerInput(this, input);
  };

  handleDestroyInput = (input) => {
    deregisterInput(this, input);
  };

  handleInputText = (text) => {
    maybeSearch(this, text);
  };

  handleFocusOut = (e) => {
    focusOut(this, e);
  };

  handleKeyPress = (e) => {
    keyPress(this, e);
  };

  handleKeyDown = (e) => {
    keyDown(this, e);
  };

  handleSelectOption = (option) => {
    selectOption(this, option);
  };

  handleActivateOption = (option) => {
    activateOption(this, option);
  };

  select = (value) => {
    return selectValue(this, value);
  };

  update = (value) => {
    return updateValue(this, value);
  };

  selectActiveOption = () => {
    if (!this.activeOption) {
      return;
    }

    return _selectOption(this.activeOption);
  };

  open = () => {
    open(this);
  };

  close = () => {
    close(this);
  };

  toggle = () => {
    toggle(this);
  };

  search = (query) => {
    return search(this, query);
  };

  cancelSearch = () => {
    cancelSearch(this);
  };

  focusInput = () => {
    focusInput(this);
  };

  blurInput = () => {
    blurInput(this);
  };

  setInputValue = (value) => {
    setInputValue(this, value);
  };

  activateOptionForValue = (value, config) => {
    activateOptionForValue(this, value, config);
  };

  activateOptionAtIndex = (index, config) => {
    activateOptionAtIndex(this, index, config);
  };

  activateNextOption = (config) => {
    activateNextOption(this, config);
  };

  activatePreviousOption = (config) => {
    activatePreviousOption(this, config);
  };

  activateOptionForKeyCode = (keyCode, config) => {
    activateOptionForKeyCode(this, keyCode, config);
  };

  deactivateOptions = () => {
    deactivateOptions(this);
  };
}
