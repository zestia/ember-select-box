function _getOffset(element) {
  const rect = element.getBoundingClientRect();
  const win = element.ownerDocument.defaultView;

  return {
    top:  rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  };
}

function _getScrollParent(element) {
  if (!element) {
    return;
  }
  if (element.scrollHeight > element.clientHeight) {
    return element;
  } else {
    return _getScrollParent(element.parentNode);
  }
}

/**
 * - Scrolls the element into view
 * - Only supports Up and Down currently.
 * - Left and Right todo.
 */
export default function scrollIntoView(element) {
  const scroller = _getScrollParent(element);

  if (!scroller) {
    return;
  }

  const scroll            = scroller.scrollTop;
  const elementTop        = _getOffset(element).top;
  const scrollerTop       = _getOffset(scroller).top;
  const elementBottom     = elementTop + element.offsetHeight;
  const scrollerBottom    = scrollerTop + scroller.clientHeight;
  const outOfBoundsTop    = elementTop - scrollerTop < 0;
  const outOfBoundsBottom = elementBottom > scrollerBottom;

  if (outOfBoundsTop) {
    scroller.scrollTop = scroll + (elementTop - scrollerTop);
  } else if (outOfBoundsBottom) {
    scroller.scrollTop = scroll + (elementBottom - scrollerBottom);
  }
}
