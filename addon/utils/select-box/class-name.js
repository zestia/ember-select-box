export default function className(prefix, suffix) {

  const name = prefix || 'select-box';
  const array = [name];

  if (suffix) {
    array.push(suffix);
  }

  return array.join('-');
}
