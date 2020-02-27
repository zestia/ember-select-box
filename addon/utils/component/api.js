const { seal } = Object;

export function getAPI(component) {
  if (component.isDestroyed) {
    return;
  }

  if (component.args.selectBox) {
    return component.args.selectBox.api;
  } else {
    return component.api;
  }
}

export function buildAPI(component, members) {
  const api = {};

  members.forEach(member => {
    api[member] = component[member];
  });

  return seal(api);
}
