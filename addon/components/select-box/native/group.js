import Component from 'ember-component';
import Nameable from '../../../mixins/select-box/general/nameable';
import layout from '../../../templates/components/select-box/native/group';

export default Component.extend(Nameable, {
  layout,
  classNameSuffix: 'group',
  tagName: 'optgroup',
  attributeBindings: ['label', 'disabled']
});
