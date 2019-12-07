export function buildClassName(selectBox, element, state) {
  const build = selectBox.onBuildClassName;

  if (typeof build === 'function') {
    return build(element, state);
  }

  return buildClassNameDefault(selectBox.classNamePrefix, element, state);
}

function buildClassNameDefault(namespace, element, state) {
  let className = namespace || 'select-box';

  if (element) {
    className = `${className}__${element}`;
  }

  if (state) {
    className = `${className}--${state}`;
  }

  return className;
}
