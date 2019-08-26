import invokeAction from './invoke-action';

export default function activate(component) {
  invokeAction(component, 'onActivate', component.internalValue, component._parentApi);
}
