import buildAPI from '../shared/api';

const publicProperties = {
  'resolvedValue': 'value',
  'isPending': true,
  'isFulfilled': true,
  'isSettled': true,
  'isDisabled': true,
  'isMultiple': true,
  'domElement': 'element'
};

const publicActions = {
  // 'select': true,
  // 'update': true
};

export default function api(option) {
  return buildAPI(option, publicProperties, publicActions);
}
