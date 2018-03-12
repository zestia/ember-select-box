import { find, triggerEvent } from '@ember/test-helpers';
const { from } = Array;

export function selectOptionsByValue(selector, values) {
  from(find(selector).options).forEach(option => {
    if (values.includes(option.value)) {
      option.selected = true;
    }
  });

  return triggerEvent(selector, 'change');
}

export function selectOptionsByLabel(selector, labels) {
  const select = find(selector);

  from(select.options).forEach(option => {
    if (labels.includes(option.textContent)) {
      option.selected = true;
    }
  });

  return triggerEvent(selector, 'change');
}
