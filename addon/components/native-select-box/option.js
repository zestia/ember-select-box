import Component from '@ember/component';
import layout from '../../templates/components/native-select-box/option';
import BaseOption from '../../mixins/select-box/option/base';
import Indexable from '../../mixins/general/indexable';
import Registerable from '../../mixins/general/registerable';
import Selectable from '../../mixins/select-box/option/selectable';
import HasDomElement from '../../mixins/select-box/registration/has-dom-element';

const mixins = [BaseOption, Indexable, Registerable, Selectable, HasDomElement];

export default Component.extend(...mixins, {
  layout,
  tagName: ''
});
