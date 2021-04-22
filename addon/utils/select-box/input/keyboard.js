import { getKeyName } from '../../../utils/general/keyboard';

export function input(input, e) {
  const text = input.element.value;

  if (!text) {
    clearedInput(input);
  }

  _input(input, text);
}

function _input(input, text) {
  input.args._onInput(text);
}

function clearedInput(input) {
  input.args.onClear?.(input.args.selectBox.api);
}

function deletedText(input) {
  input.args.onDelete?.(input.args.selectBox.api);
}

export function keyDown(input, e) {
  const keyName = getKeyName(e);

  if (keyName === 'backspace' && !input.element.value) {
    deletedText(input);
  }
}
