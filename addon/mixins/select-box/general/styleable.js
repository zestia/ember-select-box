import Ember from 'ember';
import Mixin from 'ember-metal/mixin';
import { htmlSafe } from 'ember-string';
const { escapeExpression } = Ember.Handlebars.Utils;

export default Mixin.create({
  attributeBindings: ['customCSS:style'],

  didReceiveAttrs(...args) {
    this._super(...args);
    this._setStyle(this.getAttr('style'));
  },

  _setStyle(css) {
    css = escapeExpression(css);
    css = htmlSafe(css);
    this.set('customCSS', css);
  }
});
