export default function invokeAction(object, name, ...args) {
  const func = object.args[name];

  if (typeof func === 'function') {
    return func.apply(object, args);
  }
}
