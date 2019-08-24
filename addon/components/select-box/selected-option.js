import Component from '@ember/component';
import layout from '../../templates/components/select-box/option';
import Activatable from '../../mixins/select-box/option/activatable';
import BaseOption from '../../mixins/select-box/option/base';
import Indexable from '../../mixins/general/indexable';
import Registerable from '../../mixins/general/registerable';
import HasDomElement from '../../mixins/select-box/registration/has-dom-element';

const mixins = [Activatable, BaseOption, Indexable, Registerable, HasDomElement];

export default Component.extend(...mixins, {
  layout,
  tagName: ''
});
