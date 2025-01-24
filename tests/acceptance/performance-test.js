import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'dummy/tests/helpers';

module('Acceptance | performance', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    this.startTimer = () => (this.startTime = performance.now());

    this.stopTimer = () => (this.stopTime = performance.now());

    this.timeTaken = () => this.stopTime - this.startTime;
  });

  test('rendering options', async function (assert) {
    assert.expect(5);

    await visit('/performance');

    assert.dom('.select-box__option').doesNotExist();

    this.startTimer();

    await click('.select-box .dropdown__trigger');

    this.stopTimer();

    assert.dom('.select-box__option').exists({ count: 10000 });

    assert.closeTo(this.timeTaken(), 3000, 1000);

    this.startTimer();

    await click('h1');

    this.stopTimer();

    assert.dom('.select-box__option').doesNotExist();

    assert.closeTo(this.timeTaken(), 3000, 1000);
  });
});
