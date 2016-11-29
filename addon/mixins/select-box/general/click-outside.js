import Mixin from 'ember-metal/mixin';
import DocumentClick from './document-click';
import jQuery from 'jquery';
const { contains } = jQuery;

export default Mixin.create(DocumentClick, {
  clickDocument(e) {
    this._super(...arguments);
    const el = this.get('element');
    const clickedSelf    = el === e.target;
    const clickedInside  = contains(el, e.target);
    const clickedOutside = !clickedSelf && !clickedInside;
    if (clickedOutside) {
      this.clickOutside();
    }
  },

  clickOutside() {}
});
