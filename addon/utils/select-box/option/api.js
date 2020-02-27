import { apiMacro } from '../../component/api';

const publicProperties = [
  'element',
  'index',
  'isActive',
  'isDisabled',
  'isFulfilled',
  'isPending',
  'isRejected',
  'isSelected',
  'isSettled',
  'value'
];

const publicActions = [];

export default function api() {
  return apiMacro(publicProperties, publicActions);
}
