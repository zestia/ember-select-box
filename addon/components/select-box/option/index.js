import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { cached } from '@glimmer/tracking';

export default class SelectBoxOption extends Component {
  element = null;

  id = guidFor(this);

  get index() {
    return this.args.selectBox.options.indexOf(this);
  }

  get isDisabled() {
    return this.args.disabled ?? this.args.selectBox.args.disabled;
  }

  get isActive() {
    if (this.isDisabled) {
      return null;
    }

    return this.args.selectBox.activeOption === this;
  }

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
}
