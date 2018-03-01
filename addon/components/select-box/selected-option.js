import Component from '@ember/component';
import layout from '../../templates/components/select-box/option';
import Activatable from '../../mixins/select-box/option/activatable';
import BaseOption from '../../mixins/select-box/option/base';
import Indexable from '../../mixins/general/indexable';
import Styleable from '../../mixins/general/styleable';

const mixins = [
  Activatable,
  BaseOption,
  Indexable,
  Styleable
];

export default Component.extend(...mixins, {
  layout,
  classNameSuffix: 'selected-option',
  attributeBindings: ['title', 'isActive:aria-current'],
  classNameBindings: ['isActive']
});
