import invokeAction from '../component/invoke-action';
import { getAPI } from '../component/api';

export function insertElement(selectBox) {
  insertedElement(selectBox);
}

function insertedElement(selectBox) {
  invokeAction(selectBox, 'onInsertElement', getAPI(selectBox));
}
