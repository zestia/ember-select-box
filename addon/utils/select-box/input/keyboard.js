import invokeAction from '../../component/invoke-action';
import { getAPI } from '../../component/api';

export function input(input, e) {
  const text = input.element.value;

  if (!text) {
    clearedInput(input);
  }

  _input(input, text);

  inputText(input, text);
}

function _input(input, text) {
  invokeAction(input, '_onInput', text);
}

function clearedInput(input) {
  invokeAction(input, 'onClear', getAPI(input));
}

function inputText(input, text) {
  invokeAction(input, 'onInput', text, getAPI(input));
}

function deletedText(input) {
  invokeAction(input, 'onDelete', getAPI(input));
}

export function keyDown(input, e) {
  if (e.keyCode === 8 && !input.element.value) {
    deletedText(input);
  }
}
