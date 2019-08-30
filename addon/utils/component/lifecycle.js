import invokeAction from './invoke-action';
import { getAPI } from './api';
import { set } from '@ember/object';

export function initComponent(component) {
  invokeAction(component, 'onInit', getAPI(component));
}

export function _initComponent(component) {
  invokeAction(component, '_onInit', component);
}

export function destroyComponent(component) {
  invokeAction(component, 'onDestroy', getAPI(component));
}

export function _destroyComponent(component) {
  invokeAction(component, '_onDestroy', component);
}

export function initialise(component) {
  if (component.isDestroyed || component.initialised) {
    return;
  }

  initComponent(component);

  set(component, 'isInitialised', true);
}
