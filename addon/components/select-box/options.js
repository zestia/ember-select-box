import Component from '@ember/component';
import layout from '../../templates/components/select-box/options';
import Nameable from '../../mixins/general/nameable';
import Registerable from '../../mixins/general/registerable';

const mixins = [Nameable, Registerable];

export default Component.extend(...mixins, {
  layout,
  classNameSuffix: 'options',
  attributeBindings: ['role', 'style', 'aria-activedescendant'],
  role: 'listbox'
});
