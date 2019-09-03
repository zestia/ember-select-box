import { apiMacro } from '../../component/api';

const publicProperties = {
  domElement: 'element',
  index: true,
  isActive: true,
  isFulfilled: true,
  isPending: true,
  isSettled: true,
  resolvedValue: 'value'
};

const publicActions = {};

export default function api() {
  return apiMacro(publicProperties, publicActions);
}
