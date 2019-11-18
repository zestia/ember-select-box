import { scheduleOnce } from '@ember/runloop';
import scrollIntoView from '../general/scroll-into-view';

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
  if (config.scrollIntoView) {
    scrollIntoView(component.domElement);
  }
}
