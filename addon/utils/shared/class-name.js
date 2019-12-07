export function buildClassName(selectBox, element, state) {
  const build = selectBox && selectBox.onBuildClassName;

  if (typeof build === 'function') {
    return build(element, state);
  }

  let prefix = 'select-box';

  if (selectBox && selectBox.classNamePrefix) {
    prefix = selectBox.classNamePrefix;
  }

  return buildClassNameDefault(prefix, element, state);
}

function buildClassNameDefault(prefix, element, state) {
  let className = prefix;

  if (element) {
    className = `${className}__${element}`;
  }

  if (state) {
    className = `${className}--${state}`;
  }

  return className;
}
