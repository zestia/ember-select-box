import jQuery from 'jquery';

export default function scrollIntoView(element, parent) {
  if (!element || !parent) {
    return;
  }

  const $element          = jQuery(element);
  const $scroller         = jQuery(parent);
  const scroll            = $scroller.scrollTop();
  const elementTop        = $element.offset().top;
  const scrollerTop       = $scroller.offset().top;
  const elementBottom     = elementTop + $element.outerHeight();
  const scrollerBottom    = scrollerTop + $scroller.innerHeight();
  const outOfBoundsTop    = elementTop - scrollerTop < 0;
  const outOfBoundsBottom = elementBottom > scrollerBottom;

  if (outOfBoundsTop) {
    $scroller.scrollTop(scroll + (elementTop - scrollerTop));
  } else if (outOfBoundsBottom) {
    $scroller.scrollTop(scroll + (elementBottom - scrollerBottom));
  }
}
