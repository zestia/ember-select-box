import invokeAction from './invoke-action';

export default function keydown(input, e) {
  if (e.keyCode === 8 && !input.domElement.value) {
    invokeAction(input, 'onDelete', input._parentApi);
  }
}
