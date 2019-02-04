import Component from '@ember/component';
import layout from '../../templates/components/select-box/option';
import Activatable from '../../mixins/select-box/option/activatable';
import BaseOption from '../../mixins/select-box/option/base';
import Disableable from '../../mixins/general/disableable';
import Indexable from '../../mixins/general/indexable';
import Nameable from '../../mixins/general/nameable';
import Registerable from '../../mixins/general/registerable';
import Selectable from '../../mixins/select-box/option/selectable';
import Styleable from '../../mixins/general/styleable';

const mixins = [
  Activatable,
  BaseOption,
  Disableable,
  Indexable,
  Nameable,
  Registerable,
  Selectable,
  Styleable
];

export default Component.extend(...mixins, {
  layout,
  classNameSuffix: 'option',
  role: 'option',

  attributeBindings: [
    'title',
    'role',
    'isActive:aria-current',
    'isDisabled:aria-disabled',
    'isSelected:aria-selected',
    'isPending:aria-busy'
  ],

  classNameBindings: ['isActive', 'isDisabled', 'isSelected'],

  mouseEnter() {
    this._super(...arguments);
    this.send('activate');
  },

  click() {
    this._super(...arguments);
    this.send('select');
  }
});
