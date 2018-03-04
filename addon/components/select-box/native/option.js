import Component from '@ember/component';
import BaseOption from '../../../mixins/select-box/option/base';
import Selectable from '../../../mixins/select-box/option/selectable';
import Indexable from '../../../mixins/general/indexable';
import layout from '../../../templates/components/select-box/option';

const mixins = [
  BaseOption,
  Indexable,
  Selectable
];

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
