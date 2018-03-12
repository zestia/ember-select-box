import { find } from '@ember/test-helpers';
const { from } = Array;

export function getSelectBoxValue(selector) {
  return from(find(selector).options).reduce((values, option) => {
    if (option.selected) {
      values.push(option.value);
    }
    return values;
  }, []);
}
