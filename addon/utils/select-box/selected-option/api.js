import { apiMacro } from '../../component/api';

const publicProperties = {
  element: true,
  index: true,
  isActive: true,
  isFulfilled: true,
  isPending: true,
  isSettled: true,
  value: true
};

const publicActions = {};

export default function api() {
  return apiMacro(publicProperties, publicActions);
}
