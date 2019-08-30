import { scheduleOnce } from '@ember/runloop';

export default function afterRender() {
  return new Promise(resolve => {
    scheduleOnce('afterRender', resolve);
  });
}
