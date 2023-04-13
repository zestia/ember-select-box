import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  focus,
  click,
  render,
  find,
  triggerKeyEvent
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (up arrow key)', function (hooks) {
  setupRenderingTest(hooks);

  test('up on options cycles listbox', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option />
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__options');
    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowUp');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowUp');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowUp');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowUp');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');
  });

  test('up on trigger cycles combobox', async function (assert) {
    assert.expect(5);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option />
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__trigger');
    await triggerKeyEvent('.select-box__trigger', 'keydown', 'ArrowUp');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__trigger', 'keydown', 'ArrowUp');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__trigger', 'keydown', 'ArrowUp');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__trigger', 'keydown', 'ArrowUp');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');

    assert
      .dom('.select-box__trigger')
      .hasAttribute(
        'aria-activedescendant',
        find('.select-box__option:nth-child(3)').getAttribute('id')
      );
  });

  test('up on input cycles combobox', async function (assert) {
    assert.expect(5);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Input />
        <sb.Options>
          <sb.Option />
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__input');
    await triggerKeyEvent('.select-box__input', 'keydown', 'ArrowUp');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__input', 'keydown', 'ArrowUp');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__input', 'keydown', 'ArrowUp');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__input', 'keydown', 'ArrowUp');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');

    assert
      .dom('.select-box__input')
      .hasAttribute(
        'aria-activedescendant',
        find('.select-box__option:nth-child(3)').getAttribute('id')
      );
  });

  test('up event will not scroll the page', async function (assert) {
    assert.expect(1);

    this.handleKeyDown = (event) => (this.event = event);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options {{on "keydown" this.handleKeyDown}} />
      </SelectBox>
    `);

    await focus('.select-box__options');
    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowUp');

    assert.true(this.event.defaultPrevented);
  });

  test('up scrolls the active option into view', async function (assert) {
    assert.expect(3);

    await render(hbs`
      {{! template-lint-disable no-forbidden-elements }}
      <style>
      .select-box__options {
        height: 1em;
        overflow: auto;
      }
      .select-box__option {
        line-height: 1;
      }
      </style>

      <SelectBox @value="C" as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value="A">a</sb.Option>
          <sb.Option @value="B">b</sb.Option>
          <sb.Option @value="C">c</sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    await click('.select-box__trigger');

    const startTop = find('.select-box__option:nth-child(3)').offsetTop;

    const expectedTop = find('.select-box__option:nth-child(2)').offsetTop;

    assert.ok(startTop > 0);
    assert.strictEqual(find('.select-box__options').scrollTop, startTop);

    await triggerKeyEvent('.select-box__trigger', 'keydown', 'ArrowUp');

    assert.strictEqual(find('.select-box__options').scrollTop, expectedTop);
  });

  test('does not scroll the active option into view when closed', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value="A">a</sb.Option>
          <sb.Option @value="B">b</sb.Option>
          <sb.Option @value="C">c</sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__trigger');
    await triggerKeyEvent('.select-box__trigger', 'keydown', 'ArrowUp');

    assert.strictEqual(find('.select-box__options').scrollTop, 0);
  });
});
