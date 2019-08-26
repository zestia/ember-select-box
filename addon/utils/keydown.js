import invokeAction from './invoke-action';

export default function keydown(component, e) {
  if (e.keyCode === 8 && !component.domElement.value) {
    invokeAction(component, 'onDelete', component._parentApi);
  }
}
