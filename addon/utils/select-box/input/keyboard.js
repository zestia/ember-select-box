import invokeAction from '../../component/invoke-action';

export function input(input, e) {
  const text = input.element.value;

  if (!text) {
    clearedInput(input);
  }

  _input(input, text);
}

function _input(input, text) {
  invokeAction(input, '_onInput', text);
}

function clearedInput(input) {
  invokeAction(input, 'onClear', input.args.selectBox.api);
}

function deletedText(input) {
  invokeAction(input, 'onDelete', input.args.selectBox.api);
}

export function keyDown(input, e) {
  if (e.keyCode === 8 && !input.element.value) {
    deletedText(input);
  }
}
