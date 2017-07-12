import Ember from 'ember';
import Mixin from '@ember/object/mixin';
import { htmlSafe } from '@ember/string';
const { escapeExpression } = Ember.Handlebars.Utils;

export default Mixin.create({
  attributeBindings: ['customCSS:style'],

  didReceiveAttrs() {
    this._super(...arguments);
    this._updateStyle();
  },

  _updateStyle() {
    const style = this.get('style');
    if (!style) {
      return;
    }
    const css = htmlSafe(escapeExpression(style));
    this.set('customCSS', css);
  }
});
