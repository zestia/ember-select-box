import Mixin from '@ember/object/mixin';
import { set } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

export default Mixin.create({
  _configureAsCombobox() {
    if (this.isDestroyed) {
      return;
    }

    set(this, 'tabIndex', '-1');
    set(this, 'role', 'combobox');
  },

  _configureAsNotACombobox() {
    if (this.isDestroyed) {
      return;
    }

    set(this, 'tabIndex', '0');
    set(this, 'role', null);
  },

  actions: {
    setInputValue(value) {
      if (this.isDestroyed || !this.input) {
        return;
      }

      set(this, 'input.domElement.value', value);
    },

    focusInput() {
      if (this.isDestroyed || !this.input) {
        return;
      }

      this.input.domElement.focus();
    },

    blurInput() {
      if (this.isDestroyed || !this.input) {
        return;
      }

      this.input.domElement.blur();
    },

    _inputText() {},

    _registerInput() {
      this._super(...arguments);

      scheduleOnce('afterRender', this, '_configureAsCombobox');
    },

    _deregisterInput() {
      this._super(...arguments);

      scheduleOnce('afterRender', this, '_configureAsNotACombobox');
    }
  }
});
