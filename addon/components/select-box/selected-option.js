import Component from '@ember/component';
import layout from '../../templates/components/select-box/option';
import Activatable from '../../mixins/select-box/option/activatable';
import BaseOption from '../../mixins/select-box/option/base';
import Indexable from '../../mixins/general/indexable';
import Nameable from '../../mixins/general/nameable';
import Registerable from '../../mixins/general/registerable';
import boolString from '../../utils/bool-string';

const mixins = [Activatable, BaseOption, Indexable, Nameable, Registerable];

export default Component.extend(...mixins, {
  layout,
  classNameSuffix: 'selected-option',
  attributeBindings: ['title', 'aria-current'],
  classNameBindings: ['isActive'],

  'aria-current': boolString('isActive')
});
