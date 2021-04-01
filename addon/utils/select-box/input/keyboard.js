import invokeAction from '../../component/invoke-action';
import { getKeyName } from '../../../utils/general/keyboard';

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

export function keyUp(input, e) {
  const keyName = getKeyName(e);

  if (keyName === 'backspace' && !input.element.value) {
    deletedText(input);
  }
}
