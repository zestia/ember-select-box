import Mixin from 'ember-metal/mixin';
import computed from 'ember-computed';

export default Mixin.create({
  isScrollable: computed('container', 'activeOption', function() {
    return this.get('container') && this.get('activeOption.element');
  }),

  navigateUp(e) {
    e.preventDefault();

    if (this.get('isScrollable')) {
      this._scrollUp();
    }
  },

  navigateDown(e) {
    e.preventDefault();

    if (this.get('isScrollable')) {
      this._scrollDown();
    }
  },

  _scrollUp() {
    let $container  = this.get('container').$();
    let $option     = this.get('activeOption').$();
    let optionTop   = $option.offset().top;
    let scrollerTop = $container.offset().top;
    let nextTop     = $container.scrollTop() + (optionTop - scrollerTop);
    let outOfView   = optionTop - scrollerTop < 0;

    if (outOfView) {
      $container.scrollTop(nextTop);
    }
  },

  _scrollDown() {
    let $container     = this.get('container').$();
    let $option        = this.get('activeOption').$();
    let optionBottom   = $option.offset().top + $option.outerHeight();
    let scrollerBottom = $container.offset().top + $container.outerHeight();
    let nextTop        = $container.scrollTop() + optionBottom - scrollerBottom;
    let outOfView      = optionBottom > scrollerBottom;

    if (outOfView) {
      $container.scrollTop(nextTop);
    }
  }
});
