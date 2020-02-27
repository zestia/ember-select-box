import { apiMacro } from '../component/api';

const publicProperties = [
  'element',
  'isBusy',
  'isDisabled',
  'isFulfilled',
  'isMultiple',
  'isPending',
  'isRejected',
  'isSettled',
  'value'
];

const publicActions = ['select', 'update'];

export default function api() {
  return apiMacro(publicProperties, publicActions);
}
