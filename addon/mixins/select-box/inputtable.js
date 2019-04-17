import Mixin from '@ember/object/mixin';
import { set } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

export default Mixin.create({
  _configureAsCombobox() {
    if (this.isDestroyed) {
      return;
    }

    set(this, 'tabIndex', -1);
    set(this, 'role', 'combobox');
  },

  actions: {
    setInputValue(value) {
      if (this.isDestroyed) {
        return;
      }

      set(this, 'input.element.value', value);
    },

    focusInput() {
      if (this.isDestroyed) {
        return;
      }

      this.input.element.focus();
    },

    blurInput() {
      if (this.isDestroyed) {
        return;
      }

      this.input.element.blur();
    },

    _inputText() {},

    _registerInput() {
      this._super(...arguments);

      scheduleOnce('afterRender', this, '_configureAsCombobox');
    }
  }
});
