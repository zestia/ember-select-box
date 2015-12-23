export default function className(prefix = '', suffix = '') {
  let name = 'select-box';

  if (prefix) {
    name = `${prefix}-${name}`;
  }
  if (suffix) {
    name = `${name}-${suffix}`;
  }

  return name;
}
