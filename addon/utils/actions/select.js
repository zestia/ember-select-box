import invokeAction from './invoke';

export default function select(component) {
  if (component.isDisabled) {
    return;
  }

  invokeAction(component, '_onSelect', component.resolvedValue);
  invokeAction(component, 'onSelect', component.resolvedValue, component.api());
}
