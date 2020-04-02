const { seal } = Object;

export default function buildAPI(component, members) {
  if (component.isDestroying) {
    return;
  }

  members.forEach((member) => {
    component._api[member] = component[member];
  });

  return seal(component._api);
}
