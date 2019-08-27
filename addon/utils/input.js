import invokeAction from './invoke-action';

export default function input(selectBox) {
  const value = selectBox.domElement.value;

  if (!value) {
    invokeAction(selectBox, 'onClear', selectBox._parentApi);
  }

  invokeAction(selectBox, '_onInput', value);
  invokeAction(selectBox, 'onInput', value, selectBox._parentApi);
}
