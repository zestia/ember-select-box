import Mixin from 'ember-metal/mixin';
import DocumentClick from './document-click';
import jQuery from 'jquery';
const { contains } = jQuery;

export default Mixin.create(DocumentClick, {
  clickDocument(e) {
    this._super(...arguments);
    let el = this.get('element');
    let clickedSelf    = el === e.target;
    let clickedInside  = contains(el, e.target);
    let clickedOutside = !clickedSelf && !clickedInside;
    if (clickedOutside) {
      this.clickOutside();
    }
  },

  clickOutside() {}
});