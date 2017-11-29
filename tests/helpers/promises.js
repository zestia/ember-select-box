import { Promise } from 'rsvp';
import { later } from '@ember/runloop';

export default function promise(resolveWith, rejectWith, delay = 0) {
  return new Promise((resolve, reject) => {
    if (typeof resolveWith === 'boolean') {
      later(() => resolve(), delay);
    } else if (resolveWith) {
      later(() => resolve(resolveWith), delay);
    } else if (typeof rejectWith === 'boolean') {
      later(() => reject(), delay);
    } else if (rejectWith) {
      later(() => reject(rejectWith), delay);
    }
  });
}
