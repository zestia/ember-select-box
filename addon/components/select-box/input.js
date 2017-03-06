import Component from 'ember-component';
import Nameable from  '../../mixins/select-box/general/nameable';
import Registerable from  '../../mixins/select-box/general/registerable';

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
      this.sendAction('on-clear', this.getAttr('-api'));
    }
    this.sendAction('-on-input', value);
    this.sendAction('on-input', value, this.getAttr('-api'));
  },

  keyDown(e) {
    this._super(...arguments);
    if (e.which === 8 && !this.$().val()) {
      this.sendAction('on-delete', this.getAttr('-api'));
    }
  }
});
