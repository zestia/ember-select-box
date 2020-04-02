import { find, triggerEvent } from '@ember/test-helpers';

export function getNativeMultipleSelectBoxValue(selector) {
  return [...find(selector).options].reduce((values, option) => {
    if (option.selected) {
      values.push(option.value);
    }

    return values;
  }, []);
}

export function selectNativeOptionsByValue(selector, values) {
  [...find(selector).options].forEach((option) => {
    option.selected = values.includes(option.value);
  });

  return triggerEvent(selector, 'change');
}

export function selectNativeOptionsByLabel(selector, labels) {
  [...find(selector).options].forEach((option) => {
    option.selected = labels.includes(option.textContent.trim());
  });

  return triggerEvent(selector, 'change');
}
