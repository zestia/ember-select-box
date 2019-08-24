import Component from '@ember/component';
import layout from '../../templates/components/select-box/option';
import Activatable from '../../mixins/select-box/option/activatable';
import BaseOption from '../../mixins/select-box/option/base';
import Disableable from '../../mixins/general/disableable';
import Indexable from '../../mixins/general/indexable';
import Registerable from '../../mixins/general/registerable';
import Selectable from '../../mixins/select-box/option/selectable';

const mixins = [
  Activatable,
  BaseOption,
  Disableable,
  Indexable,
  Registerable,
  Selectable
];

export default Component.extend(...mixins, {
  layout,
  tagName: '',

  actions: {
    _onmouseenter() {
      this._super(...arguments);
      this.send('activate');
    },

    _onclick() {
      this._super(...arguments);
      this.send('select');
    }
  }
});
