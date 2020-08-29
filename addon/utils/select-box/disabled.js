import { setTabIndex } from './focus';

export function receiveDisabled(selectBox) {
  if (selectBox.args.disabled) {
    disable(selectBox);
  } else if (selectBox.isReady) {
    enable(selectBox);
  }
}

function disable(selectBox) {
  setTabIndex(selectBox, '-1');
}

function enable(selectBox) {
  setTabIndex(selectBox, selectBox.previousTabIndex);
}
