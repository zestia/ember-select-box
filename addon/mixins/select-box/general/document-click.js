import Mixin from 'ember-metal/mixin';
import { bind } from 'ember-runloop';
import jQuery from 'jquery';
import Ember from 'ember';
const { K } = Ember;

export default Mixin.create({
  clickDocument: K,
  $document: jQuery(document),

  didInsertElement() {
    this._super(...arguments);
    let name = 'click.doc-' + this.get('elementId');
    this.$document.on(name, bind(this, 'clickDocument'));
  },

  willDestroyElement() {
    this._super(...arguments);
    this.$document.off('click.doc-' + this.get('elementId'));
  }
});