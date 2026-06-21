import { cached } from '@glimmer/tracking';
import { fn, concat } from '@ember/helper';
import { guidFor } from '@ember/object/internals';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import lifecycle from '../../modifiers/lifecycle.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class SelectBoxOption extends Component {
  element = null;
  id = guidFor(this);
  get index() {
    return this.args.selectBox.orderedOptions.indexOf(this);
  }
  get isDisabled() {
    return 'disabled' in this.args ? !!this.args.disabled : this.args.selectBox.isDisabled;
  }
  get isActive() {
    if (this.isDisabled) {
      return null;
    }
    return this.args.selectBox.activeOption === this;
  }
  static {
    n(this.prototype, "isActive", [cached]);
  }
  get isSelected() {
    if (this.args.selectBox.isMultiple) {
      return this.args.selectBox.value.includes(this.args.value);
    }
    return this.args.value === this.args.selectBox.value;
  }
  static {
    n(this.prototype, "isSelected", [cached]);
  }
  handleInsertElement = element => {
    this.element = element;
    this.args.onInsert?.(this);
  };
  handleDestroyElement = () => {
    this.element = null;
    this.args.onDestroy?.(this);
  };
  scrollIntoView() {
    this.element.scrollIntoView({
      block: 'nearest'
    });
  }
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
  static {
    n(this.prototype, "_api", [cached]);
  }
  api = new Proxy(this, {
    get(target, key) {
      return target._api[key];
    },
    set() {}
  });
  static {
    setComponentTemplate(precompileTemplate("{{!-- template-lint-disable no-positive-tabindex no-pointer-down-event-binding --}}\n<div id={{this.id}} aria-current=\"{{this.isActive}}\" aria-disabled=\"{{this.isDisabled}}\" aria-selected=\"{{this.isSelected}}\" class={{concat \"select-box__option\" (if @class (concat \" \" @class))}} role=\"option\" tabindex={{@tabindex}} {{on \"mouseenter\" (fn @onMouseEnter this)}} {{on \"keydown\" @onKeyDown}} {{on \"mouseup\" (fn @onMouseUp this)}} {{on \"focusin\" (fn @onFocusIn this)}} {{lifecycle onInsert=this.handleInsertElement onDestroy=this.handleDestroyElement}} ...attributes>\n  {{~yield this.api~}}\n</div>", {
      strictMode: true,
      scope: () => ({
        concat,
        on,
        fn,
        lifecycle
      })
    }), this);
  }
}

export { SelectBoxOption as default };
//# sourceMappingURL=option.js.map
