import Component from '@ember/component';
import layout from '../../templates/components/select-box/option';
import BaseOption from '../../mixins/select-box/option/base';
import Styleable from '../../mixins/select-box/general/styleable';
import Selectable from '../../mixins/select-box/option/selectable';
import Activatable from '../../mixins/select-box/option/activatable';
import Indexable from '../../mixins/select-box/general/indexable';
import invokeAction from '../../utils/invoke-action';

export default Component.extend(
  BaseOption,
  Selectable,
  Styleable,
  Indexable,
  Activatable, {

  layout,
  classNameSuffix: 'option',
  ariaRole: 'option',
  attributeBindings: [
    'title',
    'isSelected:aria-selected',
    'isActive:aria-current'
  ],
  classNameBindings: [
    'isActive',
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
