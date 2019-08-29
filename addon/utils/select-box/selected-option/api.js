import apiMacro from '../../shared/api';

const publicProperties = {
  resolvedValue: 'value',
  isPending: true,
  isFulfilled: true,
  isSettled: true,
  isActive: true,
  index: true,
  domElement: 'element'
};

const publicActions = {
  // 'update': true,
  // 'activate': true
};

export default function api() {
  return apiMacro(publicProperties, publicActions);
}
