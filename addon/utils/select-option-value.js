import invokeAction from './invoke-action';

export default function selectOptionValue(component, value) {
  if (component.isDisabled) {
    return;
  }

  invokeAction(component, '_onSelect', component.internalValue);
  invokeAction(component, 'onSelect', component.internalValue, component._parentApi);
}
