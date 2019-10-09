import Component from '@ember/component';
import layout from '../../templates/components/native-select-box/group';
import { className } from '../../utils/shared/attributes';

export default Component.extend({
  layout,
  tagName: '',

  // Arguments

  classNamePrefix: '',
  selectBox: null,

  // Computed state

  className: className()
});
