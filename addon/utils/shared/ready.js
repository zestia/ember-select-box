import { scheduleOnce } from '@ember/runloop';

export function ready(selectBox) {
  selectBox.isReady = true;

  scheduleOnce('afterRender', selectBox, _ready, selectBox);
}

function _ready(selectBox) {
  selectBox.args.onReady?.(selectBox.api);
}
