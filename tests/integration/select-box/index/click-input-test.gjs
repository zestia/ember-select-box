import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { on } from '@ember/modifier';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (clicking input)', function (hooks) {
  setupRenderingTest(hooks);

  test('clicking an input is undefined behaviour', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown>
            <sb.Input />
            <sb.Trigger />
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box__input');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute('aria-expanded', 'false');
  });

  test('mouse down on input', async function (assert) {
    assert.expect(2);

    let event;

    const handleMouseDown = (_event) => (event = _event);

    await render(
      <template>
        {{! template-lint-disable no-pointer-down-event-binding }}
        <SelectBox as |sb|>
          <sb.Input {{on "mousedown" handleMouseDown}} />
        </SelectBox>
      </template>
    );

    await click('.select-box__input');

    assert.dom('.select-box__input').isFocused();
    assert.false(
      event.defaultPrevented,
      'selecting text is not accidentally prevented'
    );
  });
});
