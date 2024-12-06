import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, click, triggerEvent } from '@ember/test-helpers';
import { on } from '@ember/modifier';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (clicking trigger)', function (hooks) {
  setupRenderingTest(hooks);

  test('clicking trigger toggles select box on mousedown', async function (assert) {
    assert.expect(7);

    // Mouse down makes the select box feel more responsive
    // than on click, which would open on mouse up.
    // It's also what would happen if you clicked on a
    // native select box.

    let event;

    const handleMouseDownTrigger = (_event) => (event = _event);

    await render(<template>
      <SelectBox as |sb|>
        {{! template-lint-disable no-pointer-down-event-binding }}
        <sb.Dropdown>
          <sb.Trigger {{on "mousedown" handleMouseDownTrigger}} />
        </sb.Dropdown>
      </SelectBox>
    </template>);

    assert.dom('.select-box__dropdown').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');

    await triggerEvent('.select-box__trigger', 'mousedown');

    assert.dom('.select-box__dropdown').hasAttribute('data-open', 'true');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'true');

    await triggerEvent('.select-box__trigger', 'mousedown');

    assert.dom('.select-box__dropdown').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');

    assert.true(
      event.defaultPrevented,
      `whilst mousing down on the trigger would ordinarily focus it,
       here we prevent that, so that we can manually control where
       focus moves to next. e.g. either remaining on the trigger,
       or advancing the a comobox's input`
    );
  });

  test('right clicking trigger does not open select box', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Dropdown>
          <sb.Trigger />
        </sb.Dropdown>
      </SelectBox>
    </template>);

    await click('.select-box__trigger', { button: 2 });

    assert.dom('.select-box__dropdown').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
  });
});
