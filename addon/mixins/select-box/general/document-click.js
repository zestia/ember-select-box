import Mixin from 'ember-metal/mixin';
import run from 'ember-runloop';
import { guidFor } from 'ember-metal/utils';
import jQuery from 'jquery';

export default Mixin.create({
  $document: jQuery(document),

  clickDocument() {},

  init() {
    this._super(...arguments);
    this.set('clickEventName', 'click.' + guidFor(this));
  },

  didInsertElement() {
    this._super(...arguments);
    this.$document.on(this.get('clickEventName'), (...args) => {
      run(this, 'clickDocument', ...args);
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    this.$document.off(this.get('clickEventName'));
  }
});