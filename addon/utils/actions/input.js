import invokeAction from './invoke';

export default function inputActions(input) {
  const value = input.domElement.value;

  if (!value) {
    invokeAction(input, 'onClear', input.api());
  }

  invokeAction(input, '_onInput', value);
  invokeAction(input, 'onInput', value, input.api());
}
