export function buildClassName(selectBox, child, state) {
  const build = selectBox && selectBox.args.onBuildClassName;

  if (typeof build === 'function') {
    return build(child, state);
  }

  let prefix = 'select-box';

  if (selectBox && selectBox.args.classNamePrefix) {
    prefix = selectBox.args.classNamePrefix;
  }

  return buildClassNameDefault(prefix, child, state);
}

function buildClassNameDefault(prefix, child, state) {
  let className = prefix;

  if (child) {
    className = `${className}__${child}`;
  }

  if (state) {
    className = `${className}--${state}`;
  }

  return className;
}
