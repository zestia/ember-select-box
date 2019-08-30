import { computed, get } from '@ember/object';
import { assign } from '@ember/polyfills';
const { seal, keys } = Object;

export function getAPI(component) {
  if (component.selectBox) {
    return component.selectBox.api;
  } else {
    return component.api;
  }
}

export function apiMacro(publicProperties, publicActions) {
  const propNames = keys(publicProperties);

  return computed(...propNames, function() {
    buildAPI(this, publicActions);
    updateAPI(this, publicProperties);

    return seal(this._api);
  });
}

function buildAPI(component, publicActions) {
  if (component._api) {
    return;
  }

  component._api = apiActions(component, publicActions);
}

function updateAPI(component, publicProperties) {
  const properties = apiProperties(component, publicProperties);
  component._api = assign(component._api, properties);
}

function apiProperties(component, publicProperties) {
  return keys(publicProperties).reduce((properties, key) => {
    const mappedName = publicProperties[key];
    const name = typeof mappedName === 'boolean' ? key : mappedName;

    properties[name] = get(component, key);

    return properties;
  }, {});
}

function apiActions(component, publicActions) {
  return keys(publicActions).reduce((actions, key) => {
    const mappedName = publicActions[key];
    const name = typeof mappedName === 'boolean' ? key : mappedName;

    actions[name] = component.actions[name].bind(component);

    return actions;
  }, {});
}
