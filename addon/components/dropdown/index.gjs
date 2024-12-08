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

const ESCAPE = Symbol('ESCAPE');
const FOCUS_LEAVE = Symbol('FOCUS_LEAVE');
const CLICK_ABORT = Symbol('CLICK_ABORT');
const TAP_OUTSIDE = Symbol('TAP_OUTSIDE');

export default class Dropdown extends Component {
  @tracked triggerElement;
  @tracked contentElement;
  @tracked element;
  @tracked _isOpen = this.args.open;

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
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('touchstart', this.handleTouchStart);

    return () => {
      document.removeEventListener('mouseup', this.handleMouseUp);
      document.removeEventListener('touchstart', this.handleTouchStart);
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
  }

  @action
  handleMouseDown(event) {
    this.lastMouseDownElement = event.target;
  }

  @action
  handleMouseUp(event) {
    this.lastMouseDownElement = null;

    if (this._isInside(event.target)) {
      return;
    }

    this._handleClickAbort();
  }

  @action
  handleTouchStart(event) {
    if (this._isInside(event.target)) {
      return;
    }

    this._handleTapOutside();
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
  handleFocusOut(event) {
    const interactiveEl = event.relatedTarget;
    const nonInteractiveEl = this.lastMouseDownElement;

    if (this._isInside(interactiveEl)) {
      return;
    }

    if (this._isInside(nonInteractiveEl)) {
      this._ensureFocus();
      return;
    }

    this._handleFocusLeave();
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

  _handleFocusLeave() {
    this.close(FOCUS_LEAVE);
  }

  _handleClickAbort() {
    this.close(CLICK_ABORT);
  }

  _handleTapOutside() {
    this.close(TAP_OUTSIDE);
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
    return this.element.contains(element);
  }

  _handleOpened() {
    this._ensureFocus();
    this.args.onOpenClosure?.();
    this.args.onOpen?.();
  }

  _handleClosed(reason) {
    this.args.onCloseClosure?.(reason);
    this.args.onClose?.(reason);
  }

  _ensureFocus() {
    this.triggerElement?.focus({
      focusVisible: false,
      preventScroll: true
    });
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
          onInsert=this.handleInsertContent
          onDestroy=this.handleDestroyContent
        )
      )
    ~}}
    <div
      class={{concat "dropdown" (if @class (concat " " @class))}}
      data-open="{{this.isOpen}}"
      {{on "focusout" this.handleFocusOut}}
      {{on "mousedown" this.handleMouseDown}}
      {{on "keydown" this.handleKeyDown}}
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
