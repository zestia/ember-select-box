import Component from '@ember/component';
import Nameable from '../../mixins/general/nameable';
import layout from '../../templates/components/native-select-box/group';

const mixins = [Nameable];

export default Component.extend(...mixins, {
  layout,
  classNameSuffix: 'group',
  tagName: 'optgroup',
  attributeBindings: ['label', 'disabled']
});
