export default function invokeAction(object, name, ...args) {
  const action = object[name];

  if (typeof action === 'function') {
    return action(...args);
  }
}
