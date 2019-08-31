import invokeAction from './invoke-action';
import { set } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { getAPI } from './api';

export function initComponent(component) {
  generateId(component);
  invokeAction(component, 'onInit', getAPI(component));
}

export function _initComponent(component) {
  generateId(component);
  invokeAction(component, '_onInit', component);
}

export function destroyComponent(component) {
  invokeAction(component, 'onDestroy', getAPI(component));
}

export function _destroyComponent(component) {
  invokeAction(component, '_onDestroy', component);
}

function generateId(component) {
  set(component, 'id', componentId(component));
}

function componentId(component) {
  return guidFor(component).replace('ember', 'select-box-el-');
}
