import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, blur } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (clicking outside)', function(hooks) {
  setupRenderingTest(hooks);

  test('clicking outside', async function(assert) {
    assert.expect(4);

    let count = 0;

    this.set('clickedOutside', () => {
      count++;
    });

    await render(hbs`
      <div class="outside"></div>
      <SelectBox @onClickOutside={{this.clickedOutside}}>
        <div class="inside"></div>
      </SelectBox>
    `);

    await click('.select-box');

    assert.equal(count, 0, 'clicking the select box is not outside');

    await click('.inside');

    assert.equal(count, 0, 'clicking inside the select box is not outside');

    await click('.outside');

    assert.equal(
      count,
      1,
      'clicking outside the select box sends the onClickOutside action, when the select box was focused'
    );

    await blur('.select-box');

    await click('.outside');

    assert.equal(
      count,
      2,
      "clicking outside the select box still sends the onClickOutside action, even if it was wasn't in use"
    );
  });
});
