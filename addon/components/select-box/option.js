import Component from '@ember/component';
import layout from '../../templates/components/select-box/option';
import BaseOption from '../../mixins/select-box/option/base';
import Styleable from '../../mixins/general/styleable';
import Selectable from '../../mixins/select-box/option/selectable';
import Activatable from '../../mixins/select-box/option/activatable';
import Disableable from '../../mixins/general/disableable';
import Indexable from '../../mixins/general/indexable';
import invokeAction from '../../utils/invoke-action';

const mixins = [
  BaseOption,
  Selectable,
  Styleable,
  Indexable,
  Activatable,
  Disableable
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
  },

  actions: {
    select() {
      this._super(...arguments);
      invokeAction(this, 'on-select', this.get('value'), this.get('-api'));
    }
  }
});
