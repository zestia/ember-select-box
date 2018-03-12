import Mixin from '@ember/object/mixin';
import { scheduleOnce } from '@ember/runloop';

export default Mixin.create({
  _configureAsCombobox() {
    if (this.get('isDestroyed')) {
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
      this.get('input.element').focus();
    },

    blurInput() {
      this.get('input.element').blur();
    },

    _inputText() {},

    _registerInput() {
      this._super(...arguments);
      scheduleOnce('afterRender', this, '_configureAsCombobox');
    }
  }
});
