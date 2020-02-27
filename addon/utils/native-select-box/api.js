import { apiMacro } from '../component/api';

const publicProperties = {
  element: true,
  isBusy: true,
  isDisabled: true,
  isFulfilled: true,
  isMultiple: true,
  isPending: true,
  isRejected: true,
  isSettled: true,
  value: true
};

const publicActions = {
  select: true,
  update: true
};

export default function api() {
  return apiMacro(publicProperties, publicActions);
}
