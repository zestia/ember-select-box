import { findAll } from '@ember/test-helpers';

export default function getOptions(selector) {
  return findAll('.select-box__option').map((element) =>
    element.textContent.trim()
  );
}
