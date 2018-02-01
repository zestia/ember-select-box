import Component from '@ember/component';
import layout from '../../templates/components/select-box/option';
import BaseOption from '../../mixins/select-box/option/base';
import Styleable from '../../mixins/general/styleable';
import Indexable from '../../mixins/general/indexable';
import Activatable from '../../mixins/select-box/option/activatable';

const mixins = [
  BaseOption,
  Styleable,
  Indexable,
  Activatable
];

export default Component.extend(...mixins, {
  layout,
  classNameSuffix: 'selected-option',
  attributeBindings: ['title', 'isActive:aria-current'],
  classNameBindings: ['isActive']
});
