/* eslint-disable ember/no-runloop */

import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { cached } from '@glimmer/tracking';
import { filter } from '@zestia/ember-select-box/utils';
import { hash } from '@ember/helper';
import { localCopy } from 'tracked-toolbox';
import { makeArray } from '@ember/array';
import { on } from '@ember/modifier';
import { scheduleOnce } from '@ember/runloop';
import {
  startsWithString,
  pressingModifier
} from '@zestia/ember-select-box/-private/utils';
import { task } from 'ember-concurrency';
import { tracked } from 'tracked-built-ins';
import Component from '@glimmer/component';
import lifecycle from '@zestia/ember-select-box/modifiers/lifecycle';
import SelectBoxGroup from '@zestia/ember-select-box/components/select-box/group';
import SelectBoxInput from '@zestia/ember-select-box/components/select-box/input';
import SelectBoxOption from '@zestia/ember-select-box/components/select-box/option';
import SelectBoxOptions from '@zestia/ember-select-box/components/select-box/options';
import SelectBoxTrigger from '@zestia/ember-select-box/components/select-box/trigger';
const { assign } = Object;

export default class SelectBox extends Component {
  @tracked _activeOption;
  @tracked _options = tracked([]);
  @tracked element;
  @tracked inputElements = tracked([]);
  @tracked isOpen = this.args.open ?? null;
  @tracked optionsElements = tracked([]);
  @tracked query = null;
  @tracked triggerElements = tracked([]);

  @localCopy('args.value') _value;
  @localCopy('args.options') results;

  chars = '';
  charTimer;
  lastMouseDownElement;

  Group;
  Input;
  Option;
  Options;
  Trigger;

  registerComponents = (components) => {
    assign(this, components);
  };

  constructor() {
    super(...arguments);
    this.args.onReady?.(this.api);
    scheduleOnce('afterRender', this, '_handleRender');
  }

  get value() {
    return this.isMultiple ? makeArray(this._value) : this._value;
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

  get hasTrigger() {
    return this.triggerElements.length === 1;
  }

  get hasInput() {
    return this.inputElements.length === 1;
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
    return this.hasInput ? null : this.activeOption?.element?.id;
  }

  @cached
  get activeOption() {
    return this.specificActiveOption || this.optionForValue;
  }

  get specificActiveOption() {
    return this.options.includes(this._activeOption)
      ? this._activeOption
      : null;
  }

  get optionForValue() {
    return this.options.find((option) => option.args.value === this.value);
  }

  get activeOptionIndex() {
    return this.activeOption ? this.activeOption.index : -1;
  }

  get previousOption() {
    const index = this.activeOptionIndex - 1;
    return this.options[index < 0 ? this.options.length - 1 : index];
  }

  get nextOption() {
    const index = this.activeOptionIndex + 1;
    return this.options[index >= this.options.length ? 0 : index];
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

  get optionsElement() {
    return this.optionsElements[0];
  }

  get triggerElement() {
    return this.triggerElements[0];
  }

  get inputElement() {
    return this.inputElements[0];
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
  handleInsertOption(option) {
    this._options.push(option);
  }

  @action
  handleDestroyOption(option) {
    // https://github.com/tracked-tools/tracked-built-ins/issues/405
    // https://stackoverflow.com/questions/30304719/javascript-fastest-way-to-remove-object-from-array
    // this._options.splice(this._options.indexOf(option), 1);
    const index = this._options.indexOf(option);
    this._options[index] = this._options[this._options.length - 1];
    this._options.pop();
  }

  @action
  handleInsertOptions(element) {
    this.optionsElements.push(element);
  }

  @action
  handleDestroyOptions() {
    this.optionsElements = tracked([]);
  }

  @action
  handleInsertTrigger(element) {
    this.triggerElements.push(element);
    this.isOpen = !!this.args.open;
  }

  @action
  handleDestroyTrigger() {
    this.triggerElements = tracked([]);
  }

  @action
  handleInsertInput(element) {
    this.inputElements.push(element);
  }

  @action
  handleDestroyInput() {
    this.inputElements = tracked([]);
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

    this._handleClickAbort();
  }

  @action
  handleMouseLeave() {
    if (this.hasFocus) {
      return;
    }

    this._forgetActiveOption();
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
    this._selectOption(option);
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

    this._activateOption(this.previousOption, true);
  }

  _handleArrowDown(event) {
    event.preventDefault();

    if (this.canAutoOpen) {
      this._open();
      return;
    }

    this._activateOption(this.nextOption, true);
  }

  _handleEnter(event) {
    if (this.isComboBox) {
      event.preventDefault();
    }

    this._handleEnterAndSpace();
  }

  _handleSpace(event) {
    if (event.target === this.inputElement) {
      return;
    }

    event.preventDefault();

    if (this.isTyping) {
      return;
    }

    this._handleEnterAndSpace();
  }

  _handleEnterAndSpace() {
    if (this.canAutoOpen) {
      this._open();
      return;
    }

    this._selectActiveOption();
  }

  _handleEscape(event) {
    if (this.canClose) {
      event.stopPropagation();
    }

    this._close(Symbol('ESCAPE'));
  }

  _handleFocusLeave() {
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
    this.activeOption?.scrollIntoView();
    this._ensureFocus();
  }

  _handleClosed({ description: reason } = {}) {
    if (reason !== 'FOCUS_LEAVE') {
      this._ensureFocus();
    }
  }

  _handleSearched() {
    this.activeOption?.scrollIntoView();
  }

  _handleRender() {
    assert('must have an interactive element', this.interactiveElement);
    assert('can only have 1 listbox', this.optionsElements.length <= 1);
    assert('can only have 1 input', this.inputElements.length <= 1);
    assert('can only have 1 trigger', this.triggerElements.length <= 1);
  }

  _handleInputChar(event) {
    const { key: char } = event;

    if (char.length > 1 || pressingModifier(event)) {
      return;
    }

    clearTimeout(this.charTimer);

    this.chars = this.chars.concat(char);
    this.charTimer = setTimeout(() => (this.chars = ''), 1000);

    let option = this.activeOption;

    const repeating = this.chars.split('').every((c) => c === char);
    const string = repeating ? char : this.chars;
    const offset = repeating ? 1 : 0;
    const index = (option ? option.index : -1) + offset;
    const before = this.options.slice(0, index);
    const after = this.options.slice(index);
    const options = after.concat(before);

    [option] = this._getOptionsByTextContent(options, string);

    this._activateOption(option, true);

    if (this.canAutoSelect) {
      this._selectActiveOption();
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
    this._forgetActiveOption();
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

  _forgetActiveOption() {
    this._activeOption = null;
  }

  _activateOption(option, scrollIntoView = false) {
    if (!option || option.isDisabled || option.isActive) {
      return;
    }

    this._activeOption = option;

    if (scrollIntoView) {
      this._activeOption.scrollIntoView();
    }

    this.args.onActivate?.(option.args.value, this.api);
  }

  _selectActiveOption() {
    this._selectOption(this.activeOption);
  }

  _selectOption(option) {
    if (!option || option.isDisabled) {
      return;
    }

    const value = this._buildSelection(option.args.value);

    this._selectValue(value);
  }

  _setValue(value) {
    this._value = value;
  }

  _valueChanged(value) {
    return this.value !== value;
  }

  _selectValue(value) {
    if (this._valueChanged(value)) {
      this._setValue(value);
      this.args.onChange?.(this.value, this.api);
    }

    this._handleSelected();
  }

  _ensureFocus() {
    this.interactiveElement?.focus({ focusVisible: false });
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

    scheduleOnce('afterRender', this, '_handleSearched');
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

  <template>
    {{! template-lint-disable no-invalid-interactive no-pointer-down-event-binding }}
    {{this.registerComponents
      (hash
        Trigger=(component
          SelectBoxTrigger
          role=this.triggerRole
          aria-busy=this.isBusy
          aria-disabled=this.isDisabled
          aria-activedescendant=this.triggerActiveDescendant
          aria-expanded=this.isOpenAttr
          aria-controls=this.optionsElement.id
          tabindex=this.triggerTabIndex
          onInsert=this.handleInsertTrigger
          onDestroy=this.handleDestroyTrigger
          onMouseDown=this.handleMouseDownTrigger
          onKeyDown=this.handleKeyDownTrigger
        )
        Input=(component
          SelectBoxInput
          disabled=this.isDisabled
          aria-busy=this.isBusy
          aria-activedescendant=this.activeOption.element.id
          aria-expanded=this.isOpenAttr
          aria-controls=this.optionsElement.id
          onInsert=this.handleInsertInput
          onDestroy=this.handleDestroyInput
          onInput=this.handleInput
          onKeyDown=this.handleKeyDownInput
        )
        Group=SelectBoxGroup
        Options=(component
          SelectBoxOptions
          aria-multiselectable=this.isMultiple
          tabindex=this.optionsTabIndex
          onInsert=this.handleInsertOptions
          onDestroy=this.handleDestroyOptions
          onKeyDown=this.handleKeyDownOptions
        )
        Option=(component
          SelectBoxOption
          selectBox=this
          onInsert=this.handleInsertOption
          onDestroy=this.handleDestroyOption
          onMouseEnter=this.handleMouseEnterOption
          onMouseUp=this.handleMouseUpOption
          onMouseDown=this.handleMouseDownOption
          onKeyDown=this.handleKeyDownOption
          onFocusIn=this.handleFocusInOption
        )
      )
    }}
    <div
      class="select-box"
      data-busy="{{this.isBusy}}"
      data-disabled="{{this.isDisabled}}"
      data-open="{{this.isOpenAttr}}"
      {{on "touchcancel" this.handleFocusOut}}
      {{on "mousedown" this.handleMouseDown}}
      {{on "mouseup" this.handleMouseUp}}
      {{on "mouseleave" this.handleMouseLeave}}
      {{lifecycle
        onInsert=this.handleInsertElement
        onDestroy=this.handleDestroyElement
      }}
      ...attributes
    >
      {{~yield this.api~}}
    </div>
  </template>
}
