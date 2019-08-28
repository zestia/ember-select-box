import { computed, get } from '@ember/object';
const { freeze, keys } = Object;

export default function apiMacro(publicProperties, publicActions) {
  const propNames = keys(publicProperties);

  return computed(...propNames, function() {
    return buildAPI(this, publicProperties, publicActions);
  })
}

function buildAPI(component, publicProperties, publicActions) {
  const properties = apiProperties(component, publicProperties);
  const actions = apiActions(component, publicActions);

  console.log('f', freeze({ ...properties, ...actions }));

  return freeze({ ...properties, ...actions });
}

function apiProperties(component, publicProperties) {
  return keys(publicProperties).reduce((properties, key) => {
    const mappedName = publicProperties[key];
    const name = (typeof mappedName === 'boolean') ? key : mappedName;

    properties[name] = get(component, key);

    return properties;
  }, {});
}

function apiActions(component, publicActions) {
  return keys(publicActions).reduce((actions, key) => {
    const mappedName = publicActions[key];
    const name = (typeof mappedName === 'boolean') ? key : mappedName;

    actions[name] = component.actions[name].bind(component);

    return actions;
  }, {});
}
