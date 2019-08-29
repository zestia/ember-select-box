import apiMacro from '../../shared/api';

const publicProperties = {
  domElement: 'element',
  index: true,
  isDisabled: true,
  isFulfilled: true,
  isPending: true,
  isRejected: true,
  isSelected: true,
  isSettled: true,
  resolvedValue: 'value'
};

const publicActions = {
  // 'select': true,
  // 'update': true,
  // 'activate': true
};

export default function api() {
  return apiMacro(publicProperties, publicActions);
}
