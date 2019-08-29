import invokeAction from '../shared/invoke-action';

export function initComponent(component) {
  invokeAction(component, 'onInit', component.api);
}

export function _initComponent(component) {
  invokeAction(component, '_onInit', component);
}

export function destroyComponent(component) {
  invokeAction(component, 'onDestroy', component.api);
}

export function _destroyComponent(component) {
  invokeAction(component, '_onDestroy', component);
}
