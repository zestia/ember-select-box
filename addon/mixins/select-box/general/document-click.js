import Mixin from 'ember-metal/mixin';
import run from 'ember-runloop';
import { guidFor } from 'ember-metal/utils';
import jQuery from 'jquery';

export default Mixin.create({
  $document: jQuery(document),

  clickDocument() {},

  init() {
    this._super(...arguments);
    const guid = guidFor(this);
    this.set('clickEventName', `click.${guid}`);
  },

  didInsertElement() {
    this._super(...arguments);
    this.$document.on(this.get('clickEventName'), (...args) => {
      if (this.get('isDestroyed')) {
        return;
      }
      run(this, 'clickDocument', ...args);
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    this.$document.off(this.get('clickEventName'));
  }
});
