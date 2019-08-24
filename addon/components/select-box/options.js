import Component from '@ember/component';
import layout from '../../templates/components/select-box/options';
import Registerable from '../../mixins/general/registerable';

const mixins = [Registerable];

export default Component.extend(...mixins, {
  layout,
  tagName: ''
});
