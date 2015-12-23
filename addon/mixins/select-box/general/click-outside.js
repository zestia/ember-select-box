import Mixin from 'ember-metal/mixin';
import DocumentClick from './document-click';
import jQuery from 'jquery';
import Ember from 'ember';
const { contains } = jQuery;
const { K } = Ember;

export default Mixin.create(DocumentClick, {
  clickOutside: K,

  clickDocument(e) {
    this._super(...arguments);
    let el = this.get('element');
    let clickedSelf    = el === e.target;
    let clickedInside  = contains(el, e.target);
    let clickedOutside = !clickedSelf && !clickedInside;
    if (clickedOutside) {
      this.clickOutside();
    }
  }
});