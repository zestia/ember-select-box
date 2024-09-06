/* eslint-disable ember/no-runloop */

import { later } from '@ember/runloop';

export default function wait(ms) {
  return new Promise((resolve) => later(resolve, ms));
}
