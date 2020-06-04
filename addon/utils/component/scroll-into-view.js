import { scheduleOnce } from '@ember/runloop';

export function maybeScrollIntoView(component, config) {
  scheduleOnce(
    'afterRender',
    component,
    _maybeScrollIntoView,
    component,
    config
  );
}

function _maybeScrollIntoView(component, config = {}) {
  if (!config.scrollIntoView) {
    return;
  }

  component.element.scrollIntoView({
    block: 'nearest'
  });
}
