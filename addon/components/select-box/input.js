import Component from '@ember/component';
import Nameable from  '../../mixins/select-box/general/nameable';
import Registerable from  '../../mixins/select-box/general/registerable';
import invokeAction from '../../utils/invoke-action';

export default Component.extend(
  Nameable,
  Registerable, {

  tagName: 'input',
  type: '',

  attributeBindings: [
    'accept',
    'autocapitalize',
    'autocomplete',
    'autocorrect',
    'autofocus',
    'autosave',
    'dir',
    'disabled',
    'form',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'height',
    'inputmode',
    'lang',
    'list',
    'max',
    'maxlength',
    'min',
    'minlength',
    'multiple',
    'name',
    'pattern',
    'placeholder',
    'readonly',
    'required',
    'selectionDirection',
    'size',
    'spellcheck',
    'step',
    'tabindex',
    'title',
    'type',
    'value',
    'width'
  ],

  classNameSuffix: 'input',

  input() {
    this._super(...arguments);
    const value = this.get('element.value');
    if (!value) {
      invokeAction(this, 'on-clear', this.get('-api'));
    }
    invokeAction(this, '-on-input', value);
    invokeAction(this, 'on-input', value, this.get('-api'));
  },

  keyDown(e) {
    this._super(...arguments);
    if (e.which === 8 && !this.get('element.value')) {
      invokeAction(this, 'on-delete', this.get('-api'));
    }
  }
});
