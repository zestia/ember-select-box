import { helper } from '@ember/component/helper';
const { assign } = Object;

export default helper(function ([component, components]) {
  assign(component._api, components);

  return component.api;
});
