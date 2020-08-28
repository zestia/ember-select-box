import { module, skip, test } from 'qunit';
import { visit, focus, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('backtracking', function (hooks) {
  setupApplicationTest(hooks);

  // If you remove a focused element from the DOM, you will synchronously get a
  // focusout event, which means it can happed during a render, so render
  // backtracking comes into play.
  // It's generally not an issue with events that we handle with the `on`
  // modifier because they are almost never delivered during a render -
  // clicks etc all call their action during the actions run loop queue, and
  // then schedule renders for later if they modify tracked state.

  skip('backtrack rendering error minimal reproduction', async function (assert) {
    assert.expect(0);

    await visit('/backtrack-select');
    await focus('.repro input');
    await click('.repro div[role="button"]');
  });

  test('the addon does not error', async function (assert) {
    assert.expect(0);

    await visit('/backtrack-select');
    await focus('.select-box__input');
    await click('.select-box__option');
  });
});
