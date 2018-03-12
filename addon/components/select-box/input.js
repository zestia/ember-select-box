import Component from '@ember/component';
import Nameable from  '../../mixins/general/nameable';
import Registerable from  '../../mixins/general/registerable';
import invokeAction from '../../utils/invoke-action';

const mixins = [
  Nameable,
  Registerable
];

export default Component.extend(...mixins, {
  tagName: 'input',
  type: '',

  role: 'searchbox',

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

    const value = this.get('element.value');

    if (!value) {
      invokeAction(this, 'on-clear', this.get('-parent-api'));
    }

    invokeAction(this, '-on-input', value);
    invokeAction(this, 'on-input', value, this.get('-parent-api'));
  },

  keyDown(e) {
    this._super(...arguments);

    if (e.which === 8 && !this.get('element.value')) {
      invokeAction(this, 'on-delete', this.get('-parent-api'));
    }
  }
});
