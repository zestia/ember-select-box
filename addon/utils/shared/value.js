import resolveValue from './resolve-value';
import afterRender from '../general/after-render';
import invokeAction from '../shared/invoke-action';

export function updateValue(selectBox, value) {
  return resolveValue(selectBox, value)
    .then(() => afterRender())
    .then(() => updatedValue(selectBox));
}

export function updatedValue(selectBox) {
  if (selectBox.isDestroyed || selectBox.isDestroying) {
    return;
  }

  invokeAction(selectBox, 'onUpdate', selectBox.resolvedValue, selectBox.api);
}

export function selectedValue(selectBox) {
  invokeAction(selectBox, 'onSelect', selectBox.resolvedValue, selectBox.api);
}
