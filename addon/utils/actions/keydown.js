import invokeAction from './invoke';

export default function keydownActions(input, e) {
  if (e.keyCode === 8 && !input.domElement.value) {
    invokeAction(input, 'onDelete', input._parentApi);
  }
}
