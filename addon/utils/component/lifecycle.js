import invokeAction from './invoke-action';

export function _insertComponent(component) {
  invokeAction(component, '_onInsert', component);
}

export function _destroyComponent(component) {
  invokeAction(component, '_onDestroy', component);
}
