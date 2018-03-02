import Component from '@ember/component';
import layout from '../../templates/components/select-box/option';
import Activatable from '../../mixins/select-box/option/activatable';
import BaseOption from '../../mixins/select-box/option/base';
import Disableable from '../../mixins/general/disableable';
import Indexable from '../../mixins/general/indexable';
import Selectable from '../../mixins/select-box/option/selectable';
import Styleable from '../../mixins/general/styleable';

const mixins = [
  Activatable,
  BaseOption,
  Disableable,
  Indexable,
  Selectable,
  Styleable
];

export default Component.extend(...mixins, {
  layout,
  classNameSuffix: 'option',
  ariaRole: 'option',
  attributeBindings: [
    'isActive:aria-current',
    'isDisabled:aria-disabled',
    'isSelected:aria-selected',
    'title'
  ],
  classNameBindings: [
    'isActive',
    'isDisabled',
    'isSelected'
  ],

  mouseEnter() {
    this.send('activate');
  },

  click() {
    this.send('select');
  }
});
