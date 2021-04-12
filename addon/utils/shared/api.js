const { isSealed, seal } = Object;

export default function buildAPI(component, keys) {
  if (component.isDestroying) {
    return;
  }

  keys.forEach((key) => {
    component.sealedAPI[key] = component[key];
  });

  if (!isSealed(component.sealedAPI)) {
    seal(component.sealedAPI);
  }

  return component.sealedAPI;
}
