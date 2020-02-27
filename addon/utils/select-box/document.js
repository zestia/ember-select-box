import invokeAction from '../component/invoke-action';

export function addDocumentClickListener(selectBox) {
  selectBox.documentClickHandler = e => documentClickHandler(selectBox, e);

  document.addEventListener('click', selectBox.documentClickHandler, {
    capture: true
  });

  document.addEventListener('touchstart', selectBox.documentClickHandler, {
    capture: true,
    passive: true
  });
}

export function removeDocumentClickListener(selectBox) {
  document.removeEventListener('click', selectBox.documentClickHandler, {
    capture: true
  });

  document.removeEventListener('touchstart', selectBox.documentClickHandler, {
    capture: true,
    passive: true
  });

  selectBox.documentClickHandler = null;
}

function documentClickHandler(selectBox, e) {
  if (selectBox.isDestroyed) {
    return;
  }

  clickDocument(selectBox, e);
}

function clickDocument(selectBox, e) {
  detectClickedOutside(selectBox, e);
}

function detectClickedOutside(selectBox, e) {
  const el = selectBox.element;
  const clickedSelf = el === e.target;
  const clickedInside = el.contains(e.target);
  const clickedOutside = !clickedSelf && !clickedInside;

  if (clickedOutside) {
    clickOutside(selectBox, e);
  }
}

function clickOutside(selectBox, e) {
  clickedOutside(selectBox);
}

function clickedOutside(selectBox, e) {
  invokeAction(selectBox, 'onClickOutside', e, selectBox.api);
}
