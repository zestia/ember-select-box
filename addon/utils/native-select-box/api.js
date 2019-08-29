import apiMacro from '../shared/api';

const publicProperties = {
  'apiValue': 'value',
  'index': true,
  'isPending': true,
  'isFulfilled': true,
  'isSettled': true,
  'isDisabled': true,
  'isMultiple': true,
  'domElement': 'element'
};

const publicActions = {
  // 'select': true,
  // 'update': true
};

export default function api() {
  return apiMacro(publicProperties, publicActions);
}
