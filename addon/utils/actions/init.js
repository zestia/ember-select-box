import invokeAction from './invoke';

export default function initAction(component) {
  invokeAction(component, '_onInit', component);
  invokeAction(component, 'onInit', component.api());
}
