import Mixin from '@ember/object/mixin';
import DocumentClick from './document-click';

export default Mixin.create(DocumentClick, {
  clickDocument(e) {
    this._super(...arguments);
    const el = this.get('element');
    const clickedSelf    = el === e.target;
    const clickedInside  = el.contains(e.target);
    const clickedOutside = !clickedSelf && !clickedInside;
    if (clickedOutside) {
      this.clickOutside();
    }
  },

  clickOutside() {}
});
