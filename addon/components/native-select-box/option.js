import Component from '@ember/component';
import layout from '../../templates/components/select-box/option';
import BaseOption from '../../mixins/select-box/option/base';
import Indexable from '../../mixins/general/indexable';
import Nameable from '../../mixins/general/nameable';
import Registerable from '../../mixins/general/registerable';
import Selectable from '../../mixins/select-box/option/selectable';

const mixins = [BaseOption, Indexable, Nameable, Registerable, Selectable];

export default Component.extend(...mixins, {
  layout,
  tagName: 'option',

  attributeBindings: [
    'isSelected:selected',
    'internalValue:value',
    'disabled',
    'title'
  ],

  classNameSuffix: 'option'
});
