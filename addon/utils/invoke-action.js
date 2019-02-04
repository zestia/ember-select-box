export default function invokeAction(object, name, ...args) {
  const func = object[name];

  if (typeof func === 'function') {
    return func.apply(object, args);
  }
}
