import invokeAction from './invoke';

export default function initAction(component) {
  invokeAction(component, 'onInit', component);
}

export function _initAction(component) {
  invokeAction(component, '_onInit', component);
}

export function destroyAction(component) {
  invokeAction(component, 'onDestroy', component);
}

export function _destroyAction(component) {
  invokeAction(component, '_onDestroy', component);
}
