import invokeAction from '../shared/invoke-action';
import { getAPI } from '../shared/api';
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

function insertedElement(selectBox) {
  invokeAction(selectBox, 'onInsertElement', getAPI(selectBox));
}

function destroyedElement(selectBox) {}
