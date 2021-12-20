import { helper } from '@ember/component/helper';
const { assign } = Object;

export function registerComponents(component) {
  return helper(function (_, components) {
    assign(component, components);
  });
}
