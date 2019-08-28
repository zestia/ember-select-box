import resolveValue from './resolve-value';
import afterRender from '../general/after-render';
import invokeAction from '../shared/invoke-action';

export function updateValue(selectBox, value) {
  console.log(selectBox, value);

  return resolveValue(selectBox, value)
    .then(() => afterRender())
    .then(() => {
      if (selectBox.isDestroyed || selectBox.isDestroying) {
        return;
      }

      updatedValue(selectBox);
    });
}

export function updatedValue(selectBox) {
  invokeAction(selectBox, 'onUpdate', selectBox.resolvedValue, selectBox.api());
}

export function selectedValue(selectBox) {
  invokeAction(selectBox, 'onSelect', selectBox.resolvedValue, selectBox.api());
}
