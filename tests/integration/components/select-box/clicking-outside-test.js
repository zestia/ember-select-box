import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (clicking outside)', function(hooks) {
  setupRenderingTest(hooks);

  test('clicking outside', async function(assert) {
    assert.expect(3);

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

    assert.equal(count, 1, 'clicking outside the select box is outside');
  });
});
