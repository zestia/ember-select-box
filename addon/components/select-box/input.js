import Component from '@ember/component';
import Nameable from '../../mixins/general/nameable';
import Registerable from '../../mixins/general/registerable';
import invokeAction from '../../utils/invoke-action';

const mixins = [Nameable, Registerable];

export default Component.extend(...mixins, {
  tagName: 'input',
  type: '',

  role: 'searchbox',
  'aria-multiline': 'false',
  autocomplete: 'off',

  attributeBindings: [
    'accept',
    'aria-controls',
    'aria-multiline',
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
    'role',
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

    const value = this.element.value;

    if (!value) {
      invokeAction(this, 'on-clear', this._parentApi);
    }

    invokeAction(this, '_onInput', value);
    invokeAction(this, 'on-input', value, this._parentApi);
  },

  keyDown(e) {
    this._super(...arguments);

    if (e.keyCode === 8 && !this.element.value) {
      invokeAction(this, 'on-delete', this._parentApi);
    }
  }
});
