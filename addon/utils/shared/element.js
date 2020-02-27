import invokeAction from '../component/invoke-action';

export function insertElement(selectBox) {
  insertedElement(selectBox);
}

function insertedElement(selectBox) {
  invokeAction(selectBox, 'onInsertElement', selectBox.api);
}
