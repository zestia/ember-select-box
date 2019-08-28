import apiMacro from '../shared/api';

const publicProperties = {
  'resolvedValue': 'value',
  'isPending': true,
  'isFulfilled': true,
  'isSettled': true,
  'isSelected': true,
  'isDisabled': true,
  'index': true
};

const publicActions = {
  // 'select': true,
  // 'update': true,
  // 'activate': true
};

export default function api() {
  return apiMacro(publicProperties, publicActions);
}
