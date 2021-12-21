const { isSealed, seal } = Object;

export default function buildAPI(component, keys) {
  if (component.isDestroying) {
    return;
  }

  keys.forEach((key) => {
    component.stableAPI[key] = component[key];
  });

  if (!isSealed(component.stableAPI)) {
    seal(component.stableAPI);
  }

  return component.stableAPI;
}
