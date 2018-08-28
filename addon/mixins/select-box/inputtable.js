import Mixin from '@ember/object/mixin';
import { scheduleOnce } from '@ember/runloop';

export default Mixin.create({
  _configureAsCombobox() {
    if (this.isDestroyed) {
      return;
    }

    this.set('tabIndex', -1);
    this.set('role', 'combobox');
  },

  actions: {
    setInputValue(value) {
      this.set('input.element.value', value);
    },

    focusInput() {
      this.input.element.focus();
    },

    blurInput() {
      this.input.element.blur();
    },

    _inputText() {},

    _registerInput() {
      this._super(...arguments);
      scheduleOnce('afterRender', this, '_configureAsCombobox');
    }
  }
});
