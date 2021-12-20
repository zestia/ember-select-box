import { helper } from '@ember/component/helper';
const { assign } = Object;

// Temporarily using a global helper until local helpers are supported

export default helper(function ([component], components) {
  assign(component, components);
});
