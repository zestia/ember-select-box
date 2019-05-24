import Component from '@ember/component';
import layout from '../../templates/components/select-box/option';
import Activatable from '../../mixins/select-box/option/activatable';
import BaseOption from '../../mixins/select-box/option/base';
import Disableable from '../../mixins/general/disableable';
import Indexable from '../../mixins/general/indexable';
import Nameable from '../../mixins/general/nameable';
import Registerable from '../../mixins/general/registerable';
import Selectable from '../../mixins/select-box/option/selectable';
import boolString from '../../utils/bool-string';

const mixins = [
  Activatable,
  BaseOption,
  Disableable,
  Indexable,
  Nameable,
  Registerable,
  Selectable
];

export default Component.extend(...mixins, {
  layout,
  classNameSuffix: 'option',

  role: 'option',

  attributeBindings: [
    'aria-busy',
    'aria-current',
    'aria-disabled',
    'aria-selected',
    'role',
    'title'
  ],

  classNameBindings: ['isActive', 'isDisabled', 'isSelected'],

  'aria-current': boolString('isActive'),
  'aria-disabled': boolString('isDisabled'),
  'aria-selected': boolString('isSelected'),
  'aria-busy': boolString('isPending'),

  mouseEnter() {
    this._super(...arguments);
    this.send('activate');
  },

  click() {
    this._super(...arguments);
    this.send('select');
  }
});
