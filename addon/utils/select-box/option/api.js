import buildAPI from '../shared/api';

const publicProperties = {
  'resolvedValue': 'value',
  'isPending': true,
  'isFulfilled': true,
  'isSettled': true,
  'isSelected': true,
  'isDisabled': true,
  'index': true,
  'domElement': 'element'
};

const publicActions = {
  // 'select': true,
  // 'update': true,
  // 'activate': true
};

export default function api(option) {
  return buildAPI(option, publicProperties, publicActions);
}
