import invokeAction from './invoke-action';

export function input(input, e) {
  const value = input.domElement.value;

  if (!value) {
    invokeAction(input, 'onClear', input.api());
  }

  invokeAction(input, '_onInput', value);
  invokeAction(input, 'onInput', value, input.api());
}

export function keyDown(input, e) {
  if (e.keyCode === 8 && !input.domElement.value) {
    invokeAction(input, 'onDelete', input.api());
  }
}
