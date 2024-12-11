import { module, skip } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'dummy/tests/helpers';

module('Acceptance | performance', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    this.startTimer = () => (this.startTime = Date.now());

    this.stopTimer = () => (this.stopTime = Date.now());

    this.timeTaken = () => this.stopTime - this.startTime;
  });

  skip('rendering options', async function (assert) {
    assert.expect(7);

    await visit('/performance');

    assert.dom('.select-box__option').doesNotExist();

    this.startTimer();

    await click('.select-box .dropdown__trigger');

    this.stopTimer();

    assert.dom('.select-box__option').exists({ count: 10000 });

    assert.ok(this.timeTaken() > 500);
    assert.ok(this.timeTaken() < 2000);

    this.startTimer();

    await click('h1');

    this.stopTimer();

    assert.dom('.select-box__option').doesNotExist();

    assert.ok(this.timeTaken() > 500);
    assert.ok(this.timeTaken() < 2000);
  });
});
