/* eslint-disable ember/no-runloop */

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
  @tracked _options = tracked(Set);
  @tracked dropdown;
  @tracked element;
  @tracked inputElement;
  @tracked optionsElement;
  @tracked query = null;
  @tracked triggerElement;

  @tracked keyboard;

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
    return this.isDisabled ? '-1' : this.isListBox ? '0' : '-1';
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

  get optionsActiveDescendant() {
    return this.isListBox ? this.activeOption?.element?.id : null;
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
    return [...this._options]
      .filter((option) => !option.isDisabled)
      .sort((a, b) => {
        return a.element.compareDocumentPosition(b.element) ===
          Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1;
      });
  }

  handleInsertElement = (element) => {
    this.element = element;
    this.args.onReady?.(this.api);
  };

  handleDestroyElement = () => {
    this.element = null;
  };

  handleInsertOption = (option) => {
    this._options.add(option);
  };

  handleDestroyOption = (option) => {
    this._options.delete(option);
  };

  handleInsertOptions = (element) => {
    this.optionsElement = element;
  };

  handleDestroyOptions = () => {
    this.optionsElement = null;
  };

  handleInsertTrigger = (element) => {
    this.triggerElement = element;
  };

  handleDestroyTrigger = () => {
    this.triggerElement = null;
  };

  handleInsertInput = (element) => {
    this.inputElement = element;
  };

  handleDestroyInput = () => {
    this.inputElement = null;
  };

  registerDropdown = (dropdown) => {
    this.dropdown = dropdown;
  };

  handleDestroyDropdown = () => {
    this.dropdown = null;
  };

  handleInput = () => {
    this.#search(this.inputElement.value);
  };

  handleMouseLeave = () => {
    if (this.hasFocus) {
      return;
    }

    this.#forgetActiveOption();
  };

  handleMouseDown = (event) => {
    if (event.target === this.interactiveElement) {
      return;
    }

    event.preventDefault();
    this.#ensureFocus();
  };

  handleKeyDownTrigger = (event) => {
    this.#handleKeyDown(event);
    this.#handleInputChar(event);
  };

  handleKeyDownInput = (event) => {
    this.#handleKeyDown(event);
  };

  handleKeyDownOptions = (event) => {
    if (this.isComboBox) {
      return;
    }

    this.#handleKeyDown(event);
    this.#handleInputChar(event);
  };

  handleMouseEnterOption = (option) => {
    if (this.keyboard) {
      return;
    }

    this.#activateOption(option);
  };

  handleMouseUpOption = (option, event) => {
    if (event.button !== 0) {
      return;
    }

    this.#activateOption(option);
    this.#selectOption(option);
  };

  handleFocusInOption = (option) => {
    this.#activateOption(option);
  };

  handleKeyDownOption = (event) => {
    this.#handleKeyDown(event);
  };

  handleOpenDropdown = () => {
    this.activeOption?.scrollIntoView();
    this.#ensureFocus();
  };

  handleCloseDropdown = (reason) => {
    this.#forgetActiveOption();

    if (reason === SELECTED) {
      this.#ensureFocus();
    }
  };

  search = (query) => {
    return this.#search(query);
  };

  update = (value) => {
    this.#setValue(value);
  };

  select = (value) => {
    this.#selectValue(value);
  };

  #handleKeyDown(event) {
    clearTimeout(this.keyboard);
    this.keyboard = setTimeout(() => (this.keyboard = false), 0);

    switch (event.key) {
      case 'ArrowUp':
        this.#handleArrowUp(event);
        break;
      case 'ArrowDown':
        this.#handleArrowDown(event);
        break;
      case 'Enter':
        this.#handleEnter(event);
        break;
      case ' ':
        this.#handleSpace(event);
        break;
    }
  }

  #handleArrowUp(event) {
    event.preventDefault();

    if (this.canAutoOpen) {
      this.dropdown.open();
      return;
    }

    this.#activateOption(this.previousOption, true);
  }

  #handleArrowDown(event) {
    event.preventDefault();

    if (this.canAutoOpen) {
      this.dropdown.open();
      return;
    }

    this.#activateOption(this.nextOption, true);
  }

  #handleEnter(event) {
    if (this.isComboBox) {
      event.preventDefault();
    }

    this.#handleEnterOrSpace();
  }

  #handleSpace(event) {
    if (event.target === this.inputElement) {
      return;
    }

    event.preventDefault();

    if (this.isTyping) {
      return;
    }

    this.#handleEnterOrSpace();
  }

  #handleEnterOrSpace() {
    if (this.canAutoOpen) {
      this.dropdown.open();
      return;
    }

    this.#selectActiveOption();
  }

  #handleSelected() {
    this.args.onSelect?.(this.api);

    if (this.canAutoClose) {
      this.dropdown.close(SELECTED);
    }
  }

  _handleSearched() {
    this.activeOption?.scrollIntoView();
  }

  #handleInputChar(event) {
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

    [option] = this.#getOptionsByTextContent(options, string);

    this.#activateOption(option, true);

    if (this.canAutoSelect) {
      this.#selectActiveOption();
    }
  }

  #forgetActiveOption() {
    this._activeOption = null;
  }

  #activateOption(option, scrollIntoView = false) {
    if (!option || option.isDisabled || option.isActive) {
      return;
    }

    this._activeOption = option;

    if (scrollIntoView) {
      this._activeOption.scrollIntoView();
    }

    this.args.onActivate?.(option.args.value, this.api);
  }

  #selectActiveOption() {
    this.#selectOption(this.activeOption);
  }

  #selectOption(option) {
    if (!option || option.isDisabled) {
      return;
    }

    const value = this.#buildSelection(option.args.value);

    this.#selectValue(value);
  }

  #setValue(value) {
    this._value = value;
  }

  #valueChanged(value) {
    return this.value !== value;
  }

  #selectValue(value) {
    if (this.#valueChanged(value)) {
      this.#setValue(value);
      this.args.onChange?.(this.value, this.api);
    }

    this.#handleSelected();
  }

  #ensureFocus() {
    this.interactiveElement?.focus({
      focusVisible: this.interactiveElement === this.inputElement
    });
  }

  #getOptionsByTextContent(options, query) {
    return filter(options)
      .by((option) => option.element.textContent)
      .query(query)
      .using(startsWithString)
      .run();
  }

  #buildSelection(value) {
    const build =
      this.args.onBuildSelection ?? this.#defaultBuildSelection.bind(this);

    return build(value, this.value);
  }

  #defaultBuildSelection(newValue, oldValue) {
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

  #search(query) {
    return this.searchTask.perform(query);
  }

  searchTask = task({ restartable: true }, async (query) => {
    const string = query ?? '';
    const search = this.args.onSearch ?? this.#defaultSearch.bind(this);

    this.results = await search(string, this.api);
    this.query = string;

    scheduleOnce('afterRender', this, '_handleSearched');
  });

  #defaultSearch(query) {
    return filter(this.args.options).query(query).run();
  }

  get #api() {
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
      return target.#api[key];
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
          aria-activedescendant=this.optionsActiveDescendant
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
          disabled=this.isDisabled
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
