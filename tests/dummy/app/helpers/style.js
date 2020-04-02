import Ember from 'ember';
import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';
const { escapeExpression } = Ember.Handlebars.Utils;

export default helper(function (args) {
  return htmlSafe(escapeExpression(...args));
});
