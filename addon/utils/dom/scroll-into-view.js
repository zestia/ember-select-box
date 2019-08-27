export default function scrollIntoView(element) {
  const scroller = getScrollParent(element);

  if (!scroller) {
    return;
  }

  const scroll = scroller.scrollTop;
  const elementTop = getOffset(element).top;
  const scrollerTop = getOffset(scroller).top;
  const elementBottom = elementTop + element.offsetHeight;
  const scrollerBottom = scrollerTop + scroller.clientHeight;
  const outOfBoundsTop = elementTop - scrollerTop < 0;
  const outOfBoundsBottom = elementBottom > scrollerBottom;

  if (outOfBoundsTop) {
    scroller.scrollTop = scroll + (elementTop - scrollerTop);
  } else if (outOfBoundsBottom) {
    scroller.scrollTop = scroll + (elementBottom - scrollerBottom);
  }
}

function getOffset(element) {
  const rect = element.getBoundingClientRect();
  const win = element.ownerDocument.defaultView;

  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  };
}

function getScrollParent(element) {
  if (!element) {
    return;
  }

  if (element.scrollHeight > element.clientHeight) {
    return element;
  } else {
    return getScrollParent(element.parentNode);
  }
}
