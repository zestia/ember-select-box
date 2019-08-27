import invokeAction from './invoke';

export default function updateAction(component) {
  if (component.isDestroyed || component.isDestroying) {
    return;
  }

  invokeAction(component, 'onUpdate', component.resolvedValue, component.api());
}
