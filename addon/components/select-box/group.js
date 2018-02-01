import Component from '@ember/component';
import Nameable from '../../mixins/general/nameable';
import layout from '../../templates/components/select-box/group';

const mixins = [
  Nameable
];

export default Component.extend(...mixins, {
  layout,
  classNameSuffix: 'group'
});
