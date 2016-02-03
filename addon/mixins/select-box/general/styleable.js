import Ember from 'ember';
import Mixin from 'ember-metal/mixin';
import { htmlSafe } from 'ember-string';
const { escapeExpression } = Ember.Handlebars.Utils;

export default Mixin.create({
  attributeBindings: ['customCSS:style'],

  didReceiveAttrs() {
    this._super(...arguments);
    this._updateStyle();
  },

  _updateStyle() {
    let style = this.getAttr('style');
    if (!style) { return; }
    let css = htmlSafe(escapeExpression(style));
    this.set('customCSS', css);
  }
});