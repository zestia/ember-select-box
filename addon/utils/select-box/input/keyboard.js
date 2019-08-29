import invokeAction from '../../shared/invoke-action';
import { getAPI } from '../shared/api';

export function input(input, e) {
  const text = input.domElement.value;

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
  if (e.keyCode === 8 && !input.domElement.value) {
    deletedText(input);
  }
}
