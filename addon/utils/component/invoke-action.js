export default function invokeAction(component, name, ...args) {
  const func = component.args[name];

  if (typeof func === 'function') {
    return func.apply(component, args);
  }
}
