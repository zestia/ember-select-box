import { findAll } from '@ember/test-helpers';

export function getOptions() {
  return findAll('.select-box__option').map((element) =>
    element.textContent.trim()
  );
}

export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
