import { later } from '@ember/runloop';

export default function sleep(ms) {
  return new Promise((resolve) => later(resolve, ms));
}
