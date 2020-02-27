import { computed } from '@ember/object';
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

export function apiMacro(properties, actions) {
  return computed(...properties, function() {
    const api = {};

    properties.forEach(p => {
      api[p] = this[p];
    });

    actions.forEach(a => {
      api[a] = this[a];
    });

    return seal(api);
  });
}
