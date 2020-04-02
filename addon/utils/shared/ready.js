import invokeAction from '../component/invoke-action';

export function ready(selectBox) {
  invokeAction(selectBox, 'onReady', selectBox.api);
}
