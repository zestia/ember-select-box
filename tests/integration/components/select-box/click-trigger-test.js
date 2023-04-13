import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (clicking trigger)', function (hooks) {
  setupRenderingTest(hooks);

  test('clicking trigger toggles select box on mousedown', async function (assert) {
    assert.expect(7);

    this.handleMouseDownTrigger = (event) => (this.event = event);

    await render(hbs`
      <SelectBox as |sb|>
        {{! template-lint-disable no-pointer-down-event-binding }}
        <sb.Trigger {{on "mousedown" this.handleMouseDownTrigger}} />
      </SelectBox>
    `);

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');

    await triggerEvent('.select-box__trigger', 'mousedown');

    assert.dom('.select-box').hasAttribute('data-open', 'true');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'true');

    await triggerEvent('.select-box__trigger', 'mousedown');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');

    assert.true(this.event.defaultPrevented);
  });

  test('right clicking trigger does not open select box', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Trigger />
      </SelectBox>
    `);

    await triggerEvent('.select-box__trigger', 'mousedown', { button: 2 });

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
  });
});
