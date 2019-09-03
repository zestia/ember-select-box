import { destroyedElement, insertedElement } from '../shared/element';
import {
  addDocumentClickListener,
  removeDocumentClickListener
} from './document';

export function insertElement(selectBox) {
  addDocumentClickListener(selectBox);
  insertedElement(selectBox);
}

export function destroyElement(selectBox) {
  removeDocumentClickListener(selectBox);
  destroyedElement(selectBox);
}
