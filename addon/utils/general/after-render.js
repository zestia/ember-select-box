import { schedule } from '@ember/runloop';

export default function afterRender() {
  return new Promise(resolve => {
    schedule('afterRender', resolve);
  });
}
