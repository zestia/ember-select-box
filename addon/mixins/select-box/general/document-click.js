import Mixin from 'ember-metal/mixin';
import run from 'ember-runloop';
import { guidFor } from 'ember-metal/utils';
import jQuery from 'jquery';
import computed from 'ember-computed';

export default Mixin.create({
  $document: computed(function() {
    return jQuery(document);
  }),

  clickDocument() {},

  init() {
    this._super(...arguments);
    const guid = guidFor(this);
    this.set('clickEventName', `click.${guid}`);
  },

  didInsertElement() {
    this._super(...arguments);
    this.get('$document').on(this.get('clickEventName'), (...args) => {
      if (this.get('isDestroyed')) {
        return;
      }
      run(this, 'clickDocument', ...args);
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    this.get('$document').off(this.get('clickEventName'));
  }
});
