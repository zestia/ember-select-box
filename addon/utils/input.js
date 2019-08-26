import invokeAction from './invoke-action';

export default function input(component) {
  const value = component.domElement.value;

  if (!value) {
    invokeAction(component, 'onClear', component._parentApi);
  }

  invokeAction(component, '_onInput', value);
  invokeAction(component, 'onInput', value, component._parentApi);
}
