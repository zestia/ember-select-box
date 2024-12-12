/* eslint-disable ember/no-runloop, ember/no-tracked-properties-from-args */

import { action } from '@ember/object';
import { cached, tracked } from '@glimmer/tracking';
import { concat, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import lifecycle from '@zestia/ember-select-box/modifiers/lifecycle';
import DropdownTrigger from '@zestia/ember-select-box/components/dropdown/trigger';
import DropdownContent from '@zestia/ember-select-box/components/dropdown/content';
import { scheduleOnce } from '@ember/runloop';
import { modifier } from 'ember-modifier';
const { assign } = Object;

const FOCUS_LEAVE = Symbol('FOCUS_LEAVE');
const CLICK_OUTSIDE = Symbol('CLICK_OUTSIDE');
const ESCAPE = Symbol('ESCAPE');

export default class Dropdown extends Component {
  @tracked triggerElement;
  @tracked contentElement;
  @tracked element;
  @tracked _isOpen = this.args.open;

  lastMouseDownElement;

  Trigger;
  Content;

  registerComponents = (components) => {
    assign(this, components);
  };

  get isOpen() {
    return !!this._isOpen;
  }

  get isClosed() {
    return !this.isOpen;
  }

  get canOpen() {
    return this.isClosed;
  }

  get canClose() {
    return this.isOpen;
  }

  documentListeners = modifier(() => {
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mouseup', this.handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', this.handleMouseDown);
      document.removeEventListener('mouseup', this.handleMouseUp);
    };
  });

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
  handleInsertTrigger(element) {
    this.triggerElement = element;
  }

  @action
  handleDestroyTrigger() {
    this.triggerElement = null;
  }

  @action
  handleInsertContent(element) {
    this.contentElement = element;
  }

  @action
  handleDestroyContent() {
    this.contentElement = null;
  }

  @action
  handleMouseDownTrigger(event) {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();

    this.toggle();

    this._ensureFocus();
  }

  @action
  handleMouseDown(event) {
    this.lastMouseDownElement = event.target;
  }

  @action
  handleMouseUp(event) {
    if (!this.lastMouseDownElement) {
      return;
    }

    this.lastMouseDownElement = null;

    if (this._isInside(event.target)) {
      return;
    }

    this._handleClickOutside();
  }

  @action
  handleFocusOut(event) {
    const element = event.relatedTarget || this.lastMouseDownElement;

    if (this._isInside(element)) {
      return;
    }

    this._handleFocusLeave();
  }

  @action
  handleKeyDownTrigger(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      this._handleEnterOrSpace(event);
    }
  }

  @action
  handleKeyDown(event) {
    if (event.key === 'Escape') {
      this._handleEscape(event);
    }
  }

  @action
  open() {
    if (!this.canOpen) {
      return;
    }

    this._isOpen = true;

    scheduleOnce('afterRender', this, '_handleOpened');
  }

  @action
  close(reason) {
    if (!this.canClose) {
      return;
    }

    this._isOpen = false;

    scheduleOnce('afterRender', this, '_handleClosed', reason);
  }

  @action
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  async _handleFocusLeave() {
    await Promise.resolve();
    this.close(FOCUS_LEAVE);
  }

  _handleClickOutside() {
    this.close(CLICK_OUTSIDE);
  }

  _handleEscape(event) {
    if (!this.canClose) {
      return;
    }

    event.stopPropagation();

    this.close(ESCAPE);
  }

  _handleEnterOrSpace(event) {
    this.toggle();
  }

  _isInside(element) {
    return (
      element !== this.element &&
      (this.element.contains(element) || this.contentElement?.contains(element))
    );
  }

  _handleOpened() {
    this.args.onOpenClosure?.();
    this.args.onOpen?.();
  }

  _handleClosed(reason) {
    this.args.onCloseClosure?.(reason);
    this.args.onClose?.(reason);
  }

  _ensureFocus() {
    this.triggerElement.focus({ focusVisible: false });
  }

  @cached
  get _api() {
    return {
      Trigger: this.Trigger,
      Content: this.Content,
      element: this.element,
      isOpen: this.isOpen,
      open: this.open,
      close: this.close,
      toggle: this.toggle
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
        Trigger=(component
          DropdownTrigger
          aria-expanded=this.isOpen
          onMouseDown=this.handleMouseDownTrigger
          onKeyDown=this.handleKeyDownTrigger
          onInsert=this.handleInsertTrigger
          onDestroy=this.handleDestroyTrigger
        )
        Content=(component
          DropdownContent
          onFocusOut=this.handleFocusOutContent
          onMouseDown=this.handleMouseDownContent
          onInsert=this.handleInsertContent
          onDestroy=this.handleDestroyContent
        )
      )
    ~}}
    <div
      class={{concat "dropdown" (if @class (concat " " @class))}}
      data-open="{{this.isOpen}}"
      {{on "keydown" this.handleKeyDown}}
      {{on "focusout" this.handleFocusOut}}
      {{this.documentListeners}}
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
