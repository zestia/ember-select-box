import invokeAction from '../component/invoke-action';
import { modifier } from 'ember-modifier';

export function ready(selectBox) {
  selectBox.isReady = true;

  invokeAction(selectBox, 'onReady', selectBox.api);
}

export default function (selectBox) {
  return modifier(() => {
    selectBox.isReady = true;
    selectBox.args.onReady?.(selectBox.api);
  });
}
