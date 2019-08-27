import invokeAction from './invoke-action';

export default function updated(component) {
  if (component.isDestroyed || component.isDestroying) {
    return;
  }

  invokeAction(component, 'onUpdate', component.internalValue, component.api);
}
