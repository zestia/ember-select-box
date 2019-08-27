import invokeAction from './invoke-action';

export default function select(selectBox) {
  invokeAction(selectBox, 'onSelect', selectBox.internalValue, selectBox.api);
}
