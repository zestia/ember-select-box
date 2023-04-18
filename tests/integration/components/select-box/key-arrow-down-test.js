import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  focus,
  click,
  render,
  find,
  triggerEvent,
  triggerKeyEvent
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (down arrow key)', function (hooks) {
  setupRenderingTest(hooks);

  test('down on options cycles listbox', async function (assert) {
    assert.expect(6);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option />
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await focus('.select-box__options');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowDown');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowDown');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowDown');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowDown');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');
  });

  test('down on trigger cycles combobox', async function (assert) {
    assert.expect(7);

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

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await focus('.select-box__trigger');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await triggerKeyEvent('.select-box__trigger', 'keydown', 'ArrowDown');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__trigger', 'keydown', 'ArrowDown');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__trigger', 'keydown', 'ArrowDown');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__trigger', 'keydown', 'ArrowDown');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');

    assert
      .dom('.select-box__trigger')
      .hasAttribute(
        'aria-activedescendant',
        find('.select-box__option:nth-child(1)').getAttribute('id')
      );
  });

  test('down on input cycles combobox', async function (assert) {
    assert.expect(7);

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

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await focus('.select-box__input');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await triggerKeyEvent('.select-box__input', 'keydown', 'ArrowDown');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__input', 'keydown', 'ArrowDown');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__input', 'keydown', 'ArrowDown');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__input', 'keydown', 'ArrowDown');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');

    assert
      .dom('.select-box__input')
      .hasAttribute(
        'aria-activedescendant',
        find('.select-box__option:nth-child(1)').getAttribute('id')
      );
  });

  test('down will not scroll the page', async function (assert) {
    assert.expect(1);

    this.handleKeyDown = (event) => (this.event = event);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options {{on "keydown" this.handleKeyDown}} />
      </SelectBox>
    `);

    await focus('.select-box__options');
    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowDown');

    assert.true(this.event.defaultPrevented);
  });

  test('down scrolls the active option into view', async function (assert) {
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

      <SelectBox @value="B" as |sb|>
        <sb.Trigger />
        {{#if sb.isOpen}}
          <sb.Options>
            <sb.Option @value="A">a</sb.Option>
            <sb.Option @value="B">b</sb.Option>
            <sb.Option @value="C">c</sb.Option>
          </sb.Options>
        {{/if}}
      </SelectBox>
    `);

    await click('.select-box__trigger');

    const startTop = find('.select-box__option:nth-child(2)').offsetTop;
    const expectedTop = find('.select-box__option:nth-child(3)').offsetTop;

    assert.ok(startTop > 0);
    assert.strictEqual(find('.select-box__options').scrollTop, startTop);

    await triggerKeyEvent('.select-box__trigger', 'keydown', 'ArrowDown');

    assert.strictEqual(find('.select-box__options').scrollTop, expectedTop);
  });

  test('down on options will not open listbox', async function (assert) {
    assert.expect(1);

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
    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowDown');

    assert.dom('.select-box').doesNotHaveAttribute('data-open');
  });

  test('down on trigger will open combobox', async function (assert) {
    assert.expect(3);

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
    await triggerKeyEvent('.select-box__trigger', 'keydown', 'ArrowDown');

    assert
      .dom('.select-box')
      .hasAttribute('data-open', 'true', 'opens the select box');

    assert
      .dom('.select-box__trigger')
      .hasAttribute('aria-expanded', 'true', 'opens the combobox box');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true', 'activates the first option');
  });

  test('down on trigger will open combobox (with selected value)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox @value={{2}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value={{1}} />
          <sb.Option @value={{2}} />
          <sb.Option @value={{3}} />
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__trigger');
    await triggerKeyEvent('.select-box__trigger', 'keydown', 'ArrowDown');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true', 'the selected option is active');
  });

  test('down on input will not open combobox (behaviour undefined)', async function (assert) {
    assert.expect(3);

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
    await triggerKeyEvent('.select-box__input', 'keydown', 'ArrowDown');

    assert.dom('.select-box').doesNotHaveAttribute('data-open', 'false');

    assert
      .dom('.select-box__input')
      .doesNotHaveAttribute('aria-expanded', 'false');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true', 'still navigates options');
  });

  test('up on options of a listbox after making a selection', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option />
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    await click('.select-box__option:nth-child(2)');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true', 'precondition');

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowDown');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute(
        'aria-current',
        'true',
        'starts from the correct active option'
      );
  });

  test('clicking an option, but mousing out of the select box, then pressing down', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option />
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    await click('.select-box__option:nth-child(2)');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true', 'precondition');

    await triggerEvent('.select-box', 'mouseleave');

    assert.dom('.select-box__option:nth-child(2)').hasAttribute(
      'aria-current',
      'true',
      `active option is not forgotten - the select box still has focus
       and as such, is still receptive to use input - like pressing Enter
       to select the current option`
    );

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowDown');

    assert.dom('.select-box__option:nth-child(3)').hasAttribute(
      'aria-current',
      'true',
      `because there was a selected option,
       keyboard navigation starts from that point`
    );
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
    await triggerKeyEvent('.select-box__trigger', 'keydown', 'ArrowDown');

    assert.strictEqual(find('.select-box__options').scrollTop, 0);
  });
});
