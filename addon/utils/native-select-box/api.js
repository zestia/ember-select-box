import { apiMacro } from '../component/api';

const publicProperties = {
  domElement: 'element',
  isBusy: true,
  isDisabled: true,
  isFulfilled: true,
  isMultiple: true,
  isPending: true,
  isRejected: true,
  isSettled: true,
  resolvedValue: 'value'
};

const publicActions = {
  select: true,
  update: true
};

export default function api() {
  return apiMacro(publicProperties, publicActions);
}
