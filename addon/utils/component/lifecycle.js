import invokeAction from './invoke-action';

export function _initComponent(component) {
  invokeAction(component, '_onInit', component);
}

export function _destroyComponent(component) {
  invokeAction(component, '_onDestroy', component);
}
