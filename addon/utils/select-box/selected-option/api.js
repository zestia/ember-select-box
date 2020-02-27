import { apiMacro } from '../../component/api';

const publicProperties = [
  'element',
  'index',
  'isActive',
  'isFulfilled',
  'isPending',
  'isSettled',
  'value'
];

const publicActions = [];

export default function api() {
  return apiMacro(publicProperties, publicActions);
}
