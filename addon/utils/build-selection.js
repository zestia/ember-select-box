import { A as emberA } from '@ember/array';
import { get } from '@ember/object';
const { isArray, from } = Array;

export default function buildSelection(component, value1) {
  const value2 = component.internalValue;
  const build = component.onBuildSelection;

  if (typeof build === 'function') {
    return build(value1, value2);
  }

  return buildSelectionDefault(component, value1, value2);
}

function buildSelectionDefault(component, value1, value2) {
  let value = value1;

  if (get(component, 'isMultiple') && !isArray(value1)) {
    const temp = emberA(from(value2));

    if (temp.includes(value1)) {
      temp.removeObject(value1);
    } else {
      temp.addObject(value1);
    }

    value = temp.toArray();
  }

  return value;
}
