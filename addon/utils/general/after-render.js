import { schedule } from '@ember/runloop';

export default function afterRender() {
  return new Promise(resolve => {
    // todo once
    schedule('afterRender', resolve);
  });
}
