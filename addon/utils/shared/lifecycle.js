import invokeAction from '../shared/invoke-action';

export function initComponent(component) {
  invokeAction(component, 'onInit', component);
}

export function _initComponent(component) {
  invokeAction(component, '_onInit', component);
}

export function destroyComponent(component) {
  invokeAction(component, 'onDestroy', component);
}

export function _destroyComponent(component) {
  invokeAction(component, '_onDestroy', component);
}
