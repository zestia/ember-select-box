export function receiveDisabled(selectBox) {
  if (selectBox.args.disabled) {
    disable(selectBox);
  } else {
    enable(selectBox);
  }
}

function disable(selectBox) {
  selectBox.previousTabIndex = selectBox.tabIndex;
  selectBox.tabIndex = '-1';
}

function enable(selectBox) {
  selectBox.tabIndex =
    selectBox.previousTabIndex === undefined
      ? selectBox.tabIndex
      : selectBox.previousTabIndex;
}
