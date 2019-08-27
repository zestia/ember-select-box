import invokeAction from './invoke';

export default function select(component) {
  if (component.isDisabled) {
    return;
  }

  invokeAction(component, '_onSelect', component.internalValue);
  invokeAction(component, 'onSelect', component.internalValue, component.api);
}
