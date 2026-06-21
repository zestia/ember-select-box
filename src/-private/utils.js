// Taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function pressingModifier(event) {
  return event.ctrlKey || event.altKey || event.shiftKey || event.metaKey;
}

function removeDiacritics(string) {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function normalise(string) {
  if (string === undefined || string === null) {
    return '';
  }

  return `${string}`.toLowerCase();
}

function collapseWhitespace(string) {
  return string
    .replace(/[\t\r\n]/g, ' ')
    .replace(/ +/g, ' ')
    .replace(/^ /, '')
    .replace(/ $/, '');
}

export function containsString(string, query) {
  const a = collapseWhitespace(removeDiacritics(normalise(string)));
  const b = collapseWhitespace(removeDiacritics(normalise(query)));
  return new RegExp(escapeRegExp(b)).test(a);
}

export function startsWithString(string, query) {
  const a = collapseWhitespace(removeDiacritics(normalise(string)));
  const b = removeDiacritics(normalise(query));
  return a.startsWith(b);
}
