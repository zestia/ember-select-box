import Component from 'ember-component';
import BaseOption from '../../../mixins/select-box/option/base';
import Selectable from '../../../mixins/select-box/option/selectable';
import layout from '../../../templates/components/select-box/native/option';

export default Component.extend(
  BaseOption,
  Selectable, {

  layout,
  tagName: 'option',
  attributeBindings: ['isSelected:selected', 'value', 'disabled', 'title'],
  classNameSuffix: 'option'
});
