import Mixin from '@ember/object/mixin';
import { run } from '@ember/runloop';
import { guidFor } from '@ember/object/internals';
import jQuery from 'jquery';
import computed from 'ember-improved-cp/read-only';

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
