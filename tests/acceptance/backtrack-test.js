import { module, test } from 'qunit';
import { visit, focus, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance', function (hooks) {
  setupApplicationTest(hooks);

  test('backtrack rendering error', async function (assert) {
    assert.expect(0);

    await visit('/backtrack-select');
    await focus('input');
    await click('.select-box__option');
  });
});
