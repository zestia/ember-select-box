import { find, triggerEvent } from '@ember/test-helpers';
const { from } = Array;

export function getNativeSelectBoxValue(selector) {
  return from(find(selector).options).reduce((values, option) => {
    if (option.selected) {
      values.push(option.value);
    }
    return values;
  }, []);
}

export function selectNativeOptionsByValue(selector, values) {
  from(find(selector).options).forEach(option => {
    if (values.includes(option.value)) {
      option.selected = true;
    }
  });

  return triggerEvent(selector, 'change');
}

export function selectNativeOptionsByLabel(selector, labels) {
  from(find(selector).options).forEach(option => {
    if (labels.includes(option.textContent)) {
      option.selected = true;
    }
  });

  return triggerEvent(selector, 'change');
}
