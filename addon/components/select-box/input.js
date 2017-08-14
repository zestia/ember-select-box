import Ember from 'ember';
import Nameable from  '../../mixins/select-box/general/nameable';
import Registerable from  '../../mixins/select-box/general/registerable';
import invokeAction from '../../utils/invoke-action';
const { TextField } = Ember;

export default TextField.extend(
  Nameable,
  Registerable, {

  type: '',

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
