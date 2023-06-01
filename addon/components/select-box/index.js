import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { scheduleOnce } from '@ember/runloop';
import { makeArray } from '@ember/array';
import Component from '@glimmer/component';
import SelectBoxTrigger from '@zestia/ember-select-box/components/select-box/trigger';
import SelectBoxGroup from '@zestia/ember-select-box/components/select-box/group';
import SelectBoxOption from '@zestia/ember-select-box/components/select-box/option';
import SelectBoxOptions from '@zestia/ember-select-box/components/select-box/options';
import SelectBoxInput from '@zestia/ember-select-box/components/select-box/input';
import { task } from 'ember-concurrency';
import { cached } from '@glimmer/tracking';
import { tracked } from 'tracked-built-ins';
import { filter } from '@zestia/ember-select-box/utils';
import { startsWithString } from '@zestia/ember-select-box/-private/utils';
const { assign } = Object;

export default class SelectBox extends Component {
  @tracked _options = tracked([]);
  @tracked activeOption;
  @tracked element;
  @tracked inputElement;
  @tracked isOpen = this.args.open ?? null;
  @tracked optionsElement;
  @tracked triggerElement;
  @tracked value;
  @tracked results = this.args.options;
  @tracked query = null;

  chars = '';
  charTimer;
  initialRender = true;
  lastMouseDownElement;

  Group;
  Input;
  Option;
  Options;
  Trigger;

  SelectBoxGroup = SelectBoxGroup;
  SelectBoxInput = SelectBoxInput;
  SelectBoxOption = SelectBoxOption;
  SelectBoxOptions = SelectBoxOptions;
  SelectBoxTrigger = SelectBoxTrigger;

  registerComponents = (components) => {
    assign(this, components);
  };

  constructor() {
    super(...arguments);
    this._setValue(this.args.value);
    this.args.onReady?.(this.api);
    scheduleOnce('afterRender', this, '_handleRender');
  }

  get isDisabled() {
    return this.args.disabled;
  }

  get isMultiple() {
    return this.args.multiple;
  }

  get isSingle() {
    return !this.isMultiple;
  }

  get isComboBox() {
    return this.hasInput || this.hasTrigger;
  }

  get isListBox() {
    return !this.isComboBox;
  }

  get isClosed() {
    return !this.isOpen;
  }

  get isOpenAttr() {
    return this.isComboBox
      ? this.hasTrigger
        ? !!this.isOpen
        : this.isOpen
      : null;
  }

  get canOpen() {
    return this.isComboBox && this.isClosed;
  }

  get canClose() {
    return this.isComboBox && this.isOpen;
  }

  get canAutoOpen() {
    return this.hasTrigger && this.isClosed;
  }

  get canAutoClose() {
    return this.isSingle && this.isOpen;
  }

  get canAutoSelect() {
    return this.isSingle && this.isComboBox && this.isClosed;
  }

  get isBusy() {
    return this.hasSearch ? this.searchTask.isRunning : null;
  }

  get isTyping() {
    return this.chars.trim() !== '';
  }

  get hasInput() {
    return !!this.inputElement;
  }

  get hasTrigger() {
    return !!this.triggerElement;
  }

  get hasOptions() {
    return !!this.optionsElement;
  }

  get hasSearch() {
    return typeof this.args.onSearch === 'function';
  }

  get optionsTabIndex() {
    return this.isListBox ? '0' : null;
  }

  get triggerTabIndex() {
    return this.isDisabled || this.hasInput ? '-1' : '0';
  }

  get triggerRole() {
    return this.hasInput ? 'button' : 'combobox';
  }

  get triggerActiveDescendant() {
    return this.hasInput ? null : this.activeOption?.element.id;
  }

  get activeOptionIndex() {
    return this.activeOption ? this.activeOption.index : -1;
  }

  @cached
  get interactiveElements() {
    return [this.inputElement, this.triggerElement, this.optionsElement].filter(
      Boolean
    );
  }

  get interactiveElement() {
    return this.interactiveElements[0];
  }

  get hasFocus() {
    return this.interactiveElement === document.activeElement;
  }

  get optionElements() {
    return [...this.element.querySelectorAll('.select-box__option')];
  }

  @cached
  get options() {
    if (!this.element) {
      return [];
    }

    const els = this.optionElements;

    return this._options
      .filter((option) => !option.isDisabled)
      .sort((a, b) => els.indexOf(a.element) - els.indexOf(b.element));
  }

  @action
  handleInsertElement(element) {
    this.element = element;
  }

  @action
  handleDestroyElement() {
    this.element = null;
  }

  @action
  handleUpdatedValue() {
    this._setValue(this.args.value);
  }

  @action
  handleUpdatedOptions() {
    this.results = this.args.options;
  }

  @action
  handleInsertOption(option) {
    this._options.push(option);
    scheduleOnce('afterRender', this, '_handleRenderedOptions');
  }

  @action
  handleDestroyOption(option) {
    // https://github.com/tracked-tools/tracked-built-ins/issues/405
    // https://stackoverflow.com/questions/30304719/javascript-fastest-way-to-remove-object-from-array
    const index = this._options.indexOf(option);
    this._options[index] = this._options.at(-1);
    this._options.pop();
    scheduleOnce('afterRender', this, '_handleRenderedOptions');
  }

  @action
  handleInsertOptions(element) {
    assert('can only have 1 listbox', !this.hasOptions);

    this.optionsElement = element;
  }

  @action
  handleDestroyOptions() {
    this.optionsElement = null;
  }

  @action
  handleInsertTrigger(element) {
    assert('can only have 1 trigger', !this.hasTrigger);

    this.triggerElement = element;
    this.isOpen = !!this.args.open;
  }

  @action
  handleDestroyTrigger() {
    this.triggerElement = null;
  }

  @action
  handleInsertInput(element) {
    assert('can only have 1 input', !this.hasInput);

    this.inputElement = element;
  }

  @action
  handleDestroyInput() {
    this.inputElement = null;
  }

  @action
  handleInput() {
    this._search(this.inputElement.value);
  }

  @action
  handleMouseDown(event) {
    this.lastMouseDownElement = event.target;

    document.addEventListener('mouseup', this.handleMouseUp, { once: true });
  }

  @action
  handleMouseUp(event) {
    if (!this.element || !this.lastMouseDownElement) {
      return;
    }

    this.lastMouseDownElement = null;

    if (this.element.contains(event.target)) {
      return;
    }

    this._handleClickAbort(event);
  }

  @action
  handleMouseLeave() {
    if (this.hasFocus) {
      return;
    }

    this._deactivateOptions();
  }

  @action
  handleFocusOut(event) {
    if (
      document.activeElement === this.interactiveElement ||
      this.element.contains(event.relatedTarget)
    ) {
      return;
    }

    if (
      !event.relatedTarget &&
      this.element.contains(this.lastMouseDownElement)
    ) {
      this._ensureFocus();
      return;
    }

    scheduleOnce('afterRender', this, '_handleFocusLeave', event);
  }

  @action
  handleKeyDownTrigger(event) {
    this._handleKeyDown(event);
    this._handleInputChar(event);
  }

  @action
  handleKeyDownInput(event) {
    this._handleKeyDown(event);
  }

  @action
  handleKeyDownOptions(event) {
    if (this.isComboBox) {
      return;
    }

    this._handleKeyDown(event);
    this._handleInputChar(event);
  }

  @action
  handleMouseDownTrigger(event) {
    if (this.isDisabled || event.button !== 0) {
      return;
    }

    event.preventDefault();

    this._toggle();
  }

  @action
  handleMouseEnterOption(option) {
    this._activateOption(option);
  }

  @action
  handleMouseDownOption(event) {
    event.preventDefault();
    this._ensureFocus();
  }

  @action
  handleMouseUpOption(option, event) {
    if (event.button !== 0) {
      return;
    }

    this._activateOption(option);
    this._selectOption(option, event);
  }

  @action
  handleFocusInOption(option) {
    this._activateOption(option);
  }

  @action
  handleKeyDownOption(event) {
    this._handleKeyDown(event);
  }

  @action
  close() {
    this._close();
  }

  @action
  open() {
    this._open();
  }

  @action
  toggle() {
    this._toggle();
  }

  @action
  search(query) {
    return this._search(query);
  }

  @action
  update(value) {
    this._setValue(value);
  }

  @action
  select(value) {
    this._selectValue(value);
  }

  _handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
        this._handleArrowUp(event);
        break;
      case 'ArrowDown':
        this._handleArrowDown(event);
        break;
      case 'Escape':
        this._handleEscape(event);
        break;
      case 'Enter':
        this._handleEnter(event);
        break;
      case ' ':
        this._handleSpace(event);
        break;
    }
  }

  _handleArrowUp(event) {
    event.preventDefault();

    if (this.canAutoOpen) {
      this._open();
      return;
    }

    this._activatePreviousOption();
  }

  _handleArrowDown(event) {
    event.preventDefault();

    if (this.canAutoOpen) {
      this._open();
      return;
    }

    this._activateNextOption();
  }

  _handleEnter(event) {
    if (this.isComboBox) {
      event.preventDefault();
    }

    this._handleEnterAndSpace(event);
  }

  _handleSpace(event) {
    if (event.target === this.inputElement) {
      return;
    }

    event.preventDefault();

    if (this.isTyping) {
      return;
    }

    this._handleEnterAndSpace(event);
  }

  _handleEnterAndSpace(event) {
    if (this.canAutoOpen) {
      this._open();
      return;
    }

    this._selectActiveOption(event);
  }

  _handleEscape(event) {
    if (this.canClose) {
      event.stopPropagation();
    }

    this._close(Symbol('ESCAPE'));
  }

  _handleFocusLeave() {
    this._deactivateOptions();
    this._close(Symbol('FOCUS_LEAVE'));
  }

  _handleClickAbort() {
    this._close(Symbol('CLICK_ABORT'));
  }

  _handleSelected() {
    const close = this.args.onSelect?.(this.api) ?? this.canAutoClose;

    if (close) {
      this._close(Symbol('SELECTED'));
    }
  }

  _handleOpened() {
    this._activateInitialOption();
    this._ensureFocus();
  }

  _handleClosed({ description: reason } = {}) {
    if (reason !== 'FOCUS_LEAVE') {
      this._ensureFocus();
    }
  }

  _handleRender() {
    assert('must have an interactive element', this.interactiveElement);
  }

  _handleRenderedOptions() {
    if (this.initialRender) {
      this.initialRender = false;
    } else if (this.activeOption?.isDestroying) {
      this._activateOptionForValue(this.activeOption.args.value);
    } else if (this.activeOption) {
      this.activeOption.scrollIntoView();
    } else {
      this._activateInitialOption();
    }
  }

  _handleInputChar(event) {
    const { key: char } = event;

    if (char.length > 1) {
      return;
    }

    clearTimeout(this.charTimer);

    this.chars = this.chars.concat(char);
    this.charTimer = setTimeout(() => (this.chars = ''), 1000);

    let option = this.activeOption ?? this._getOptionForValue(this.value);

    const repeating = this.chars.split('').every((c) => c === char);
    const string = repeating ? char : this.chars;
    const offset = repeating ? 1 : 0;
    const index = (option ? option.index : -1) + offset;
    const before = this.options.slice(0, index);
    const after = this.options.slice(index);
    const options = after.concat(before);

    [option] = this._getOptionsByTextContent(options, string);

    if (!option) {
      return;
    }

    this._activateOption(option, {
      scrollIntoView: true
    });

    if (this.canAutoSelect) {
      this._selectActiveOption(event);
    }
  }

  _open() {
    if (!this.canOpen) {
      return;
    }

    this.isOpen = true;
    this.args.onOpen?.(this.api);

    scheduleOnce('afterRender', this, '_handleOpened');
  }

  _close(reason) {
    if (!this.canClose) {
      return;
    }

    this.isOpen = false;
    this._deactivateOptions();
    this.args.onClose?.(this.api);

    scheduleOnce('afterRender', this, '_handleClosed', reason);
  }

  _toggle() {
    if (this.isOpen) {
      this._close();
    } else {
      this._open();
    }
  }

  _deactivateOptions() {
    this.activeOption = null;
  }

  _activateOption(option, config = {}) {
    if (!option || option.isDisabled || option.isActive) {
      return;
    }

    this.activeOption = option;

    if (config.scrollIntoView) {
      option.scrollIntoView();
    }

    this.args.onActivate?.(option.args.value, this.api);
  }

  _activateInitialOption() {
    this._activateOptionForValue(this.value, {
      scrollIntoView: true
    });
  }

  _activateNextOption() {
    this._activateOptionAtIndex(this.activeOptionIndex + 1, {
      scrollIntoView: true
    });
  }

  _activatePreviousOption() {
    this._activateOptionAtIndex(this.activeOptionIndex - 1, {
      scrollIntoView: true
    });
  }

  _activateOptionForValue(value, config) {
    this._activateOption(this._getOptionForValue(value), config);
  }

  _activateOptionAtIndex(index, config) {
    if (index < 0) {
      index = this.options.length - 1;
    } else if (index >= this.options.length) {
      index = 0;
    }

    this._activateOption(this.options[index], config);
  }

  _selectActiveOption(event) {
    this._selectOption(this.activeOption, event);
  }

  _selectOption(option, event) {
    if (!option || option.isDisabled) {
      return;
    }

    const value = this._buildSelection(option.args.value);

    this._selectValue(value, event);
  }

  _setValue(value) {
    this.value = this.isMultiple ? makeArray(value) : value;
  }

  _selectValue(value, event) {
    if (this.value !== value) {
      this._setValue(value);
      this.args.onChange?.(this.value, this.api);
    }

    this._handleSelected(event);
  }

  _ensureFocus() {
    this.interactiveElement?.focus({ focusVisible: false });
  }

  _getOptionForValue(value) {
    return this.options.find((option) => option.args.value === value);
  }

  _getOptionsByTextContent(options, query) {
    return filter(options)
      .by((option) => option.element.textContent)
      .query(query)
      .using(startsWithString)
      .run();
  }

  _buildSelection(value) {
    const build =
      this.args.onBuildSelection ?? this._defaultBuildSelection.bind(this);

    return build(value, this.value);
  }

  _defaultBuildSelection(newValue, oldValue) {
    let value = newValue;

    if (this.isMultiple) {
      const temp = [...oldValue];

      if (temp.includes(newValue)) {
        temp.splice(temp.indexOf(newValue), 1);
      } else {
        temp.push(newValue);
      }

      value = temp;
    }

    return value;
  }

  _search(query) {
    this.searchTask?.cancelAll();
    return this.searchTask.perform(query);
  }

  searchTask = task(async (query) => {
    const string = query ?? '';
    const search = this.args.onSearch ?? this._defaultSearch.bind(this);

    this.results = await search(string, this.api);
    this.query = string;
  });

  _defaultSearch(query) {
    return filter(this.args.options).query(query).run();
  }

  get _api() {
    return {
      // Components
      Group: this.Group,
      Input: this.Input,
      Option: this.Option,
      Options: this.Options,
      Trigger: this.Trigger,
      // Properties
      close: this.close,
      element: this.element,
      isBusy: this.isBusy,
      isOpen: this.isOpen,
      options: this.results,
      query: this.query,
      value: this.value,
      // Actions
      open: this.open,
      search: this.search,
      select: this.select,
      toggle: this.toggle,
      update: this.update
    };
  }

  api = new Proxy(this, {
    get(target, key) {
      return target._api[key];
    },
    set() {}
  });
}
