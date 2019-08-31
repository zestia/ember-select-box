import invokeAction from '../component/invoke-action';
import { getAPI } from '../component/api';

export function insertedElement(selectBox) {
  invokeAction(selectBox, 'onInsertElement', getAPI(selectBox));
}

export function destroyedElement(selectBox) {}
