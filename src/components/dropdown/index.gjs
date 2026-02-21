/* eslint-disable ember/no-runloop, ember/no-tracked-properties-from-args */

import { tracked } from '@glimmer/tracking';
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

  get isDisabled() {
    return this.args.disabled;
  }

  get canOpen() {
    return this.isClosed && !this.isDisabled;
  }

  get canClose() {
    return this.isOpen;
  }

  get triggerTabIndex() {
    return this.isDisabled ? '-1' : '0';
  }

  documentListeners = modifier(() => {
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mouseup', this.handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', this.handleMouseDown);
      document.removeEventListener('mouseup', this.handleMouseUp);
    };
  });

  handleInsertElement = (element) => {
    this.element = element;
    this.args.onReady?.(this.api);
  };

  handleDestroyElement = () => {
    this.element = null;
  };

  handleInsertTrigger = (element) => {
    this.triggerElement = element;
  };

  handleDestroyTrigger = () => {
    this.triggerElement = null;
  };

  handleInsertContent = (element) => {
    this.contentElement = element;
  };

  handleDestroyContent = () => {
    this.contentElement = null;
  };

  handleMouseDownTrigger = (event) => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();

    this.toggle();

    this.#ensureFocus();
  };

  handleMouseDown = (event) => {
    this.lastMouseDownElement = event.target;
  };

  handleMouseUp = (event) => {
    if (!this.lastMouseDownElement) {
      return;
    }

    this.lastMouseDownElement = null;

    if (this.#isInside(event.target)) {
      return;
    }

    this.#handleClickOutside();
  };

  handleFocusOut = (event) => {
    const element = event.relatedTarget || this.lastMouseDownElement;

    if (this.#isInside(element)) {
      return;
    }

    this.#handleFocusLeave();
  };

  handleKeyDownTrigger = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      this.#handleEnterOrSpace(event);
    }
  };

  handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      this.#handleEscape(event);
    }
  };

  open = () => {
    if (!this.canOpen) {
      return;
    }

    this._isOpen = true;

    scheduleOnce('afterRender', this, '_handleOpened');
  };

  close = (reason) => {
    if (!this.canClose) {
      return;
    }

    this._isOpen = false;

    scheduleOnce('afterRender', this, '_handleClosed', reason);
  };

  toggle = () => {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  };

  async #handleFocusLeave() {
    await Promise.resolve();
    this.close(FOCUS_LEAVE);
  }

  #handleClickOutside() {
    this.close(CLICK_OUTSIDE);
  }

  #handleEscape(event) {
    if (!this.canClose) {
      return;
    }

    event.stopPropagation();

    this.close(ESCAPE);
  }

  #handleEnterOrSpace() {
    this.toggle();
  }

  #isInside(element) {
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

  #ensureFocus() {
    this.triggerElement.focus({ focusVisible: false });
  }

  get #api() {
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
      return target.#api[key];
    },
    set() {}
  });

  <template>
    {{! template-lint-disable no-invalid-interactive no-pointer-down-event-binding }}
    {{~this.registerComponents
      (hash
        Trigger=(component
          DropdownTrigger
          aria-disabled=this.isDisabled
          aria-expanded=this.isOpen
          aria-haspopup="true"
          role="button"
          tabindex=this.triggerTabIndex
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
      data-disabled="{{this.isDisabled}}"
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
