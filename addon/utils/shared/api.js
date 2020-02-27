const { seal } = Object;

export default function buildAPI(component, members) {
  const api = {};

  members.forEach(member => {
    api[member] = component[member];
  });

  return seal(api);
}
