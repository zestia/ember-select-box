import { setTabIndex } from './focus';

export function receiveDisabled(selectBox) {
  if (selectBox.args.disabled) {
    disable(selectBox);
  } else if (selectBox.previousTabIndex !== null) {
    enable(selectBox);
  }
}

function disable(selectBox) {
  setTabIndex(selectBox, '-1');
}

function enable(selectBox) {
  setTabIndex(selectBox, selectBox.previousTabIndex);
}
