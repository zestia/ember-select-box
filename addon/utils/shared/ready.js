import invokeAction from '../component/invoke-action';

export function ready(selectBox) {
  selectBox.isReady = true;

  invokeAction(selectBox, 'onReady', selectBox.api);
}
