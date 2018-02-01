import Component from '@ember/component';
import layout from '../../templates/components/select-box/options';
import Nameable from  '../../mixins/general/nameable';
import Styleable from '../../mixins/general/styleable';
import Registerable from  '../../mixins/general/registerable';

const mixins = [
  Nameable,
  Styleable,
  Registerable
];

export default Component.extend(...mixins, {
  layout,
  classNameSuffix: 'options',
  attributeBindings: ['aria-activedescendant']
});
