import { apiMacro } from '../../component/api';

const publicProperties = {
  domElement: 'element',
  index: true,
  isActive: true,
  isDisabled: true,
  isFulfilled: true,
  isPending: true,
  isRejected: true,
  isSelected: true,
  isSettled: true,
  value: true
};

const publicActions = {};

export default function api() {
  return apiMacro(publicProperties, publicActions);
}
