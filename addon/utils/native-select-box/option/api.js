import buildAPI from '../api/build';

const publicProperties = {
  'resolvedValue': 'value',
  'isPending': true,
  'isFulfilled': true,
  'isSettled': true,
  'isSelected': true,
  'isDisabled': true,
  'index': true
};

const publicActions = {
  // 'select': true,
  // 'update': true,
  // 'activate': true
};

export default function api(option) {
  return buildAPI(option, publicProperties, publicActions);
}
