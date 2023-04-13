import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (clicking input)', function (hooks) {
  setupRenderingTest(hooks);

  test('clicking an input is undefined behaviour', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Input />
        <sb.Trigger />
      </SelectBox>
    `);

    await click('.select-box__input');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
  });
});
