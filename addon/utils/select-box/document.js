import invokeAction from '../component/invoke-action';
import { set } from '@ember/object';
import { getAPI } from '../component/api';

export function addDocumentClickListener(selectBox) {
  set(selectBox, 'documentClickHandler', e =>
    documentClickHandler(selectBox, e)
  );

  document.addEventListener('click', selectBox.documentClickHandler);
  document.addEventListener('touchstart', selectBox.documentClickHandler);
}

export function removeDocumentClickListener(selectBox) {
  document.removeEventListener('click', selectBox.documentClickHandler);
  document.removeEventListener('touchstart', selectBox.documentClickHandler);

  set(selectBox, 'documentClickHandler', null);
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
  const el = selectBox.domElement;
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
  invokeAction(selectBox, 'onClickOutside', e, getAPI(selectBox));
}
