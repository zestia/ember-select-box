import { apiMacro } from '../shared/api';

const publicProperties = {
  apiValue: 'value',
  domElement: 'element',
  isBusy: true,
  isDisabled: true,
  isFulfilled: true,
  isMultiple: true,
  isPending: true,
  isRejected: true,
  isSettled: true
};

const publicActions = {
  // 'select': true,
  // 'update': true
};

export default function api() {
  return apiMacro(publicProperties, publicActions);
}
