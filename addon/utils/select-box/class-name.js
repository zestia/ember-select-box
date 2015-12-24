export default function className(prefix, suffix) {

  let name = prefix || 'select-box';
  let array = [name];

  if (suffix) {
    array.push(suffix);
  }

  return array.join('-');
}
