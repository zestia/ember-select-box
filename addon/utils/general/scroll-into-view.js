import { assign } from '@ember/polyfills';

export function maybeScrollIntoView(element, config = {}) {
  if (config.scrollIntoView === false) {
    return;
  }

  const defaults = { block: 'nearest' };

  const options = assign(defaults, config.scrollIntoView);

  try {
    element.scrollIntoView(options);
  } catch (error) {
    // crap browser
  }
}
