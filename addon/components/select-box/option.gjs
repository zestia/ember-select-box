import { action } from '@ember/object';
import { cached } from '@glimmer/tracking';
import { concat, fn } from '@ember/helper';
import { guidFor } from '@ember/object/internals';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import lifecycle from '@zestia/ember-select-box/modifiers/lifecycle';

export default class SelectBoxOption extends Component {
  element = null;

  id = guidFor(this);

  get index() {
    return this.args.selectBox.options.indexOf(this);
  }

  get isDisabled() {
    return this.args.disabled ?? this.args.selectBox.args.disabled;
  }

  @cached
  get isActive() {
    if (this.isDisabled) {
      return null;
    }

    return this.args.selectBox.activeOption === this;
  }

  @cached
  get isSelected() {
    if (this.args.selectBox.isMultiple) {
      return this.args.selectBox.value.includes(this.args.value);
    }

    return this.args.value === this.args.selectBox.value;
  }

  @action
  handleInsertElement(element) {
    this.element = element;
    this.args.onInsert?.(this);
  }

  @action
  handleDestroyElement() {
    this.element = null;
    this.args.onDestroy?.(this);
  }

  scrollIntoView() {
    this.element.scrollIntoView({ block: 'nearest' });
  }

  @cached
  get _api() {
    return {
      id: this.id,
      index: this.index,
      isActive: this.isActive,
      isSelected: this.isSelected,
      isDisabled: this.isDisabled,
      value: this.args.value
    };
  }

  api = new Proxy(this, {
    get(target, key) {
      return target._api[key];
    },
    set() {}
  });

  <template>
    {{! template-lint-disable no-positive-tabindex no-pointer-down-event-binding }}
    <div
      id={{this.id}}
      aria-current="{{this.isActive}}"
      aria-disabled="{{this.isDisabled}}"
      aria-selected="{{this.isSelected}}"
      class={{concat "select-box__option" (if @class (concat " " @class))}}
      role="option"
      tabindex={{@tabindex}}
      {{on "mouseenter" (fn @onMouseEnter this)}}
      {{on "keydown" @onKeyDown}}
      {{on "mouseup" (fn @onMouseUp this)}}
      {{on "focusin" (fn @onFocusIn this)}}
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
