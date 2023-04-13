import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, focus, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (mouseenter option)', function (hooks) {
  setupRenderingTest(hooks);

  test('mousing down on trigger but mousing up on an option', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value={{1}}>one</sb.Option>
          <sb.Option @value={{2}}>two</sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    await triggerEvent('.select-box__trigger', 'mousedown');
    await triggerEvent('.select-box__option:nth-child(2)', 'mouseup');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'true');
  });

  test('mousing down on trigger but mousing up outside the select box', async function (assert) {
    assert.expect(4);

    this.handleSelect = () => assert.step('select');

    await render(hbs`
      <SelectBox @onSelect={{this.handleSelect}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value={{1}}>one</sb.Option>
          <sb.Option @value={{2}}>two</sb.Option>
        </sb.Options>
      </SelectBox>

      <button class="outside" type="button"></button>
    `);

    await focus('.select-box__trigger');
    await triggerEvent('.select-box__trigger', 'mousedown');
    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');

    await triggerEvent('.select-box', 'mouseleave');
    await triggerEvent('.outside', 'mouseup');

    assert.dom('.select-box__option:nth-child(2)').hasAttribute(
      'aria-current',
      'true',
      `select box still has focus, so the current option is remembered,
       even though the select box may be closed.`
    );

    assert.dom('.select-box__trigger').isFocused();
    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.verifySteps([]);
  });
});
