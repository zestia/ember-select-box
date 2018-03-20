import Ember from 'ember';
import Mixin from '@ember/object/mixin';
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';
const { escapeExpression } = Ember.Handlebars.Utils;

export default Mixin.create({
  attributeBindings: ['customCSS:style'],

  customCSS: computed('style', function() {
    const css = this.get('style');

    if (css) {
      return htmlSafe(escapeExpression(css));
    }
  })
});
