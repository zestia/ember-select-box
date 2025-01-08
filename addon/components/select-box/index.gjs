/* eslint-disable ember/no-runloop */

import { action } from '@ember/object';
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
import Dropdown from '@zestia/ember-select-box/components/dropdown/index';
import SelectBoxGroup from '@zestia/ember-select-box/components/select-box/group';
import SelectBoxInput from '@zestia/ember-select-box/components/select-box/input';
import SelectBoxOption from '@zestia/ember-select-box/components/select-box/option';
import SelectBoxOptions from '@zestia/ember-select-box/components/select-box/options';
const { assign } = Object;

const SELECTED = Symbol('SELECTED');

export default class SelectBox extends Component {
  @tracked _activeOption;
  @tracked _options = tracked([]);
  @tracked dropdown;
  @tracked element;
  @tracked inputElement;
  @tracked optionsElement;
  @tracked query = null;
  @tracked triggerElement;

  @localCopy('args.value') _value;
  @localCopy('args.options') results;

  chars = '';
  charTimer;

  Dropdown;
  Group;
  Input;
  Option;
  Options;
  Trigger;

  registerComponents = (components) => {
    assign(this, components);
  };

  get value() {
    return this.isMultiple ? makeArray(this._value) : this._value;
  }

  get isDisabled() {
    return 'disabled' in this.args ? !!this.args.disabled : null;
  }

  get isMultiple() {
    return 'multiple' in this.args ? !!this.args.multiple : null;
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

  get canAutoOpen() {
    return this.hasTrigger && !this.dropdown.isOpen;
  }

  get canAutoClose() {
    return this.isSingle && this.hasTrigger && this.dropdown.isOpen;
  }

  get canAutoSelect() {
    return this.isSingle && this.hasTrigger && !this.dropdown.isOpen;
  }

  get isBusy() {
    return this.hasSearch ? this.searchTask.isRunning : null;
  }

  get isTyping() {
    return this.chars.trim() !== '';
  }

  get hasOptions() {
    return !!this.optionsElement;
  }

  get hasTrigger() {
    return !!this.triggerElement;
  }

  get hasInput() {
    return !!this.inputElement;
  }

  get hasSearch() {
    return typeof this.args.onSearch === 'function';
  }

  get optionsTabIndex() {
    return this.isListBox ? '0' : '-1';
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
    return this.activeOption ? this.activeOption.index : null;
  }

  get previousOptionIndex() {
    const index = this.activeOptionIndex;

    return index === null ? this.options.length - 1 : index - 1;
  }

  get nextOptionIndex() {
    const index = this.activeOptionIndex;

    return index === null ? 0 : index + 1;
  }

  get previousOption() {
    return this.options[this.previousOptionIndex];
  }

  get nextOption() {
    return this.options[this.nextOptionIndex];
  }

  get optionElements() {
    return [...this.element.querySelectorAll('.select-box__option')];
  }

  get interactiveElement() {
    if (this.hasInput) {
      return this.inputElement;
    }

    if (this.hasTrigger) {
      return this.triggerElement;
    }

    return this.optionsElement;
  }

  get hasFocus() {
    return this.interactiveElement === document.activeElement;
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
    this.args.onReady?.(this.api);
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
    this.optionsElement = element;
  }

  @action
  handleDestroyOptions() {
    this.optionsElement = null;
  }

  @action
  handleInsertTrigger(element) {
    this.triggerElement = element;
  }

  @action
  handleDestroyTrigger() {
    this.triggerElement = null;
  }

  @action
  handleInsertInput(element) {
    this.inputElement = element;
  }

  @action
  handleDestroyInput() {
    this.inputElement = null;
  }

  @action
  registerDropdown(dropdown) {
    this.dropdown = dropdown;
  }

  @action
  handleDestroyDropdown() {
    this.dropdown = null;
  }

  @action
  handleInput() {
    this._search(this.inputElement.value);
  }

  @action
  handleMouseLeave() {
    if (this.hasFocus) {
      return;
    }

    this._forgetActiveOption();
  }

  @action
  handleMouseDown(event) {
    event.preventDefault();
    this._ensureFocus();
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
  handleMouseEnterOption(option) {
    this._activateOption(option);
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
  handleOpenDropdown() {
    this.activeOption?.scrollIntoView();
    this._ensureFocus();
  }

  @action
  handleCloseDropdown(reason) {
    this._forgetActiveOption();

    if (reason === SELECTED) {
      this._ensureFocus();
    }
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
      this.dropdown.open();
      return;
    }

    this._activateOption(this.previousOption, true);
  }

  _handleArrowDown(event) {
    event.preventDefault();

    if (this.canAutoOpen) {
      this.dropdown.open();
      return;
    }

    this._activateOption(this.nextOption, true);
  }

  _handleEnter(event) {
    if (this.isComboBox) {
      event.preventDefault();
    }

    this._handleEnterOrSpace();
  }

  _handleSpace(event) {
    if (event.target === this.inputElement) {
      return;
    }

    event.preventDefault();

    if (this.isTyping) {
      return;
    }

    this._handleEnterOrSpace();
  }

  _handleEnterOrSpace(event) {
    if (this.canAutoOpen) {
      this.dropdown.open();
      return;
    }

    this._selectActiveOption();
  }

  _handleSelected() {
    const close = this.args.onSelect?.(this.api) ?? this.canAutoClose;

    if (close) {
      this.dropdown.close(SELECTED);
    }
  }

  _handleSearched() {
    this.activeOption?.scrollIntoView();
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
    this.interactiveElement?.focus({
      focusVisible: this.interactiveElement === this.inputElement
    });
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
      Dropdown: this.Dropdown,
      Group: this.Group,
      Input: this.Input,
      Option: this.Option,
      Options: this.Options,
      Trigger: this.Trigger,
      Content: this.Content,
      // Properties
      element: this.element,
      isBusy: this.isBusy,
      options: this.results,
      query: this.query,
      value: this.value,
      dropdown: this.dropdown,
      // Actions
      search: this.search,
      select: this.select,
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
    {{~this.registerComponents
      (hash
        Input=(component
          SelectBoxInput
          disabled=this.isDisabled
          aria-busy=this.isBusy
          aria-activedescendant=this.activeOption.element.id
          aria-expanded=this.dropdown.isOpen
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
          onKeyDown=this.handleKeyDownOption
          onFocusIn=this.handleFocusInOption
        )
        Dropdown=(component
          Dropdown
          onReady=this.registerDropdown
          onOpenClosure=this.handleOpenDropdown
          onCloseClosure=this.handleCloseDropdown
          onDestroy=this.handleDestroyDropdown
        )
        Trigger=(component
          this.dropdown.Trigger
          role=this.triggerRole
          aria-busy=this.isBusy
          aria-disabled=this.isDisabled
          aria-activedescendant=this.triggerActiveDescendant
          aria-controls=this.optionsElement.id
          aria-haspopup=null
          tabindex=this.triggerTabIndex
          onInsertClosure=this.handleInsertTrigger
          onDestroy=this.handleDestroyTrigger
          onKeyDown=this.handleKeyDownTrigger
        )
        Content=(component this.dropdown.Content tabindex="-1")
      )
    ~}}
    <div
      class="select-box"
      data-busy="{{this.isBusy}}"
      data-disabled="{{this.isDisabled}}"
      {{on "mouseleave" this.handleMouseLeave}}
      {{on "mousedown" this.handleMouseDown}}
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
