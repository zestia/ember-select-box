import jQuery from 'jquery';

export default function scrollIntoView(element, parent) {
  if (!element || !parent) { return; }

  let $element          = jQuery(element);
  let $scroller         = jQuery(parent);
  let scroll            = $scroller.scrollTop();
  let elementTop        = $element.offset().top;
  let scrollerTop       = $scroller.offset().top;
  let elementBottom     = elementTop + $element.height();
  let scrollerBottom    = scrollerTop + $scroller.height();
  let outOfBoundsTop    = elementTop - scrollerTop < 0;
  let outOfBoundsBottom = elementBottom > scrollerBottom;

  if (outOfBoundsTop) {
    $scroller.scrollTop(scroll + (elementTop - scrollerTop));
  } else if (outOfBoundsBottom) {
    $scroller.scrollTop(scroll + (elementBottom - scrollerBottom));
  }
}