import invokeAction from './invoke-action';

export default function inputText(input, e) {
  const value = input.domElement.value;

  if (!value) {
    invokeAction(input, 'onClear', input.api());
  }

  invokeAction(input, '_onInput', value);
  invokeAction(input, 'onInput', value, input.api());
}
