export function open(selectBox) {
  if (selectBox.isOpen) {
    return;
  }

  selectBox.isOpen = true;

  opened(selectBox);
}

export function close(selectBox) {
  if (!selectBox.isOpen) {
    return;
  }

  selectBox.isOpen = false;

  closed(selectBox);
}

function opened(selectBox) {
  selectBox.args.onOpen?.(selectBox.api);
}

function closed(selectBox) {
  selectBox.args.onClose?.(selectBox.api);
}

export function toggle(selectBox) {
  if (selectBox.isOpen) {
    close(selectBox);
  } else {
    open(selectBox);
  }
}
