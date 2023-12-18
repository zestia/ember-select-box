import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, triggerEvent } from '@ember/test-helpers';
import { on } from '@ember/modifier';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (clicking trigger)', function (hooks) {
  setupRenderingTest(hooks);

  test('clicking trigger toggles select box on mousedown', async function (assert) {
    assert.expect(7);

    let event;

    const handleMouseDownTrigger = (_event) => (event = _event);

    await render(<template>
      <SelectBox as |sb|>
        {{! template-lint-disable no-pointer-down-event-binding }}
        <sb.Trigger {{on "mousedown" handleMouseDownTrigger}} />
      </SelectBox>
    </template>);

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');

    await triggerEvent('.select-box__trigger', 'mousedown');

    assert.dom('.select-box').hasAttribute('data-open', 'true');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'true');

    await triggerEvent('.select-box__trigger', 'mousedown');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');

    assert.true(event.defaultPrevented);
  });

  test('right clicking trigger does not open select box', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
      </SelectBox>
    </template>);

    await triggerEvent('.select-box__trigger', 'mousedown', { button: 2 });

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
  });
});
