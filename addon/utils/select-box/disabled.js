export function receiveDisabled(selectBox) {
  if (selectBox.args.disabled) {
    disable(selectBox);
  } else {
    enable(selectBox);
  }
}

function disable(selectBox) {
  selectBox.tabIndex = '-1';
}

function enable(selectBox) {
  selectBox.tabIndex = selectBox.previousTabIndex;
}
