import invokeAction from '../component/invoke-action';
import { getAPI } from '../component/api';

export function ready(selectBox) {
  invokeAction(selectBox, 'onReady', getAPI(selectBox));
}
