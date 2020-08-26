import { module, test } from 'qunit';
import { visit, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance', function (hooks) {
  setupApplicationTest(hooks);

  test('backtrack rendering error', async function (assert) {
    await visit('/backtrack-select');
    await fillIn('input', 'a');
    await click('.select-box__option:nth-child(1)');

    return new Promise(() => {});
  });
});
