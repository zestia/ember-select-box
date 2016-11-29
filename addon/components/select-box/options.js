import Component from 'ember-component';
import layout from '../../templates/components/select-box/options';
import Nameable from  '../../mixins/select-box/general/nameable';
import Styleable from '../../mixins/select-box/general/styleable';
import Registerable from  '../../mixins/select-box/general/registerable';

export default Component.extend(
  Nameable,
  Styleable,
  Registerable, {

  layout,
  classNameSuffix: 'options',
  attributeBindings: ['aria-activedescendant']
});
