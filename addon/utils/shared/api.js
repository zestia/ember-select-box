const { isSealed, seal } = Object;

export default function buildAPI(component, keys) {
  if (component.isDestroying) {
    return;
  }

  keys.forEach((key) => {
    component._api[key] = component[key];
  });

  if (!isSealed(component._api)) {
    seal(component._api);
  }

  return component._api;
}
