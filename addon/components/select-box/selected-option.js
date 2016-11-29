import Component from 'ember-component';
import layout from '../../templates/components/select-box/option';
import BaseOption from '../../mixins/select-box/option/base';
import Styleable from '../../mixins/select-box/general/styleable';
import Indexable from '../../mixins/select-box/general/indexable';
import Activatable from '../../mixins/select-box/option/activatable';

export default Component.extend(
  BaseOption,
  Styleable,
  Indexable,
  Activatable, {

  layout,
  classNameSuffix: 'selected-option',
  attributeBindings: ['title', 'isActive:aria-current'],
  classNameBindings: ['isActive']
});
