import Component from '@ember/component';
import Nameable from  '../../mixins/select-box/general/nameable';
import Registerable from  '../../mixins/select-box/general/registerable';
import invokeAction from '../../utils/invoke-action';

export default Component.extend(
  Nameable,
  Registerable, {

  tagName: 'input',
  classNameSuffix: 'input',
  attributeBindings: [
    'type',
    'value',
    'size',
    'autofocus',
    'placeholder',
    'readonly',
    'disabled',
    'autocomplete',
    'autocorrect',
    'autocapitalize',
    'spellcheck'
  ],

  input() {
    this._super(...arguments);
    const value = this.$().val();
    if (!value) {
      invokeAction(this, 'on-clear', this.get('-api'));
    }
    invokeAction(this, '-on-input', value);
    invokeAction(this, 'on-input', value, this.get('-api'));
  },

  keyDown(e) {
    this._super(...arguments);
    if (e.which === 8 && !this.$().val()) {
      invokeAction(this, 'on-delete', this.get('-api'));
    }
  }
});
