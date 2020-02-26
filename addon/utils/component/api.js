import { computed } from '@ember/object';
const { seal, keys, assign } = Object;

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
  const propNames = keys(properties);

  return computed(...propNames, function() {
    buildAPI(this, actions);
    updateProperties(this, properties);

    return seal(this.memoisedAPI);
  });
}

function buildAPI(component, actions) {
  if (component.memoisedAPI) {
    return;
  }

  component.memoisedAPI = {};

  memoiseActions(component, actions);
}

function memoiseActions(component, actions) {
  assign(component.memoisedAPI, buildActions(component, actions));
}

function updateProperties(component, properties) {
  assign(component.memoisedAPI, buildProperties(component, properties));
}

function buildProperties(component, publicProperties) {
  return keys(publicProperties).reduce((properties, key) => {
    const name = publicName(publicProperties, key);

    properties[name] = component[key];

    return properties;
  }, {});
}

function buildActions(component, publicActions) {
  return keys(publicActions).reduce((actions, key) => {
    const name = publicName(publicActions, key);

    actions[name] = component.actions[name].bind(component);

    return actions;
  }, {});
}

function publicName(object, key) {
  const mappedName = object[key];
  return typeof mappedName === 'boolean' ? key : mappedName;
}
