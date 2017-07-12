import { get } from '@ember/object';

export default function invokeAction(object, name, ...args) {
  const action = get(object, name);

  if (typeof action === 'function') {
    action(...args);
  }
}
