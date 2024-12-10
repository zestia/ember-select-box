import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import {
  focus,
  click,
  render,
  find,
  triggerEvent,
  triggerKeyEvent
} from '@ember/test-helpers';
import { on } from '@ember/modifier';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (up arrow key)', function (hooks) {
  setupRenderingTest(hooks);

  test('up on options does not cycle listbox', async function (assert) {
    assert.expect(6);

    await render(<template>
      <SelectBox @value={{null}} as |sb|>
        <sb.Options>
          <sb.Option />
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await focus('.select-box__options');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await triggerEvent('.select-box__option:nth-child(3)', 'mouseenter');

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
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowUp');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');
  });

  test('up on trigger does not cycle combobox', async function (assert) {
    assert.expect(7);

    await render(<template>
      <SelectBox @value={{null}} as |sb|>
        <sb.Dropdown>
          <sb.Trigger />
          <sb.Content>
            <sb.Options>
              <sb.Option />
              <sb.Option />
              <sb.Option />
            </sb.Options>
          </sb.Content>
        </sb.Dropdown>
      </SelectBox>
    </template>);

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await focus('.select-box .dropdown__trigger');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await triggerKeyEvent(
      '.select-box .dropdown__trigger',
      'keydown',
      'ArrowUp'
    );

    assert
      .dom('.select-box__option[aria-current="true"]')
      .doesNotExist('the first up auto opens rather than navigating options');

    await triggerEvent('.select-box__option:nth-child(3)', 'mouseenter');

    await triggerKeyEvent(
      '.select-box .dropdown__trigger',
      'keydown',
      'ArrowUp'
    );

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent(
      '.select-box .dropdown__trigger',
      'keydown',
      'ArrowUp'
    );

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');

    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute(
        'aria-activedescendant',
        find('.select-box__option:nth-child(1)').getAttribute('id')
      );

    await triggerKeyEvent(
      '.select-box .dropdown__trigger',
      'keydown',
      'ArrowUp'
    );

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');
  });

  test('up on input cycles combobox', async function (assert) {
    assert.expect(6);

    await render(<template>
      <SelectBox @value={{null}} as |sb|>
        <sb.Input />
        <sb.Options>
          <sb.Option />
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await focus('.select-box__input');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await triggerEvent('.select-box__option:nth-child(3)', 'mouseenter');

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
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');

    assert
      .dom('.select-box__input')
      .hasAttribute(
        'aria-activedescendant',
        find('.select-box__option:nth-child(1)').getAttribute('id')
      );
  });

  test('up will not scroll the page', async function (assert) {
    assert.expect(1);

    let event;

    const handleKeyDown = (_event) => (event = _event);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options {{on "keydown" handleKeyDown}} />
      </SelectBox>
    </template>);

    await focus('.select-box__options');
    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowUp');

    assert.true(event.defaultPrevented, 'prevents window scrolling');
  });

  test('up scrolls the active option into view', async function (assert) {
    assert.expect(4);

    await render(<template>
      {{! template-lint-disable no-forbidden-elements }}
      <style>
        .select-box .dropdown__content { height: 1em; overflow: auto; }
        .select-box__option { line-height: 1; }
      </style>

      <SelectBox @value="B" as |sb|>
        <sb.Dropdown as |dd|>
          <sb.Trigger />
          {{#if dd.isOpen}}
            <sb.Content>
              <sb.Options>
                <sb.Option @value="A">a</sb.Option>
                <sb.Option @value="B">b</sb.Option>
                <sb.Option @value="C">c</sb.Option>
              </sb.Options>
            </sb.Content>
          {{/if}}
        </sb.Dropdown>
      </SelectBox>
    </template>);

    await click('.select-box .dropdown__trigger');

    const startTop = find('.select-box__option:nth-child(2)').offsetTop;
    const expectedTop = find('.select-box__option:nth-child(1)').offsetTop;

    assert.strictEqual(startTop, 16);
    assert.strictEqual(expectedTop, 0);
    assert.strictEqual(find('.dropdown__content').scrollTop, startTop);

    await triggerKeyEvent(
      '.select-box .dropdown__trigger',
      'keydown',
      'ArrowUp'
    );

    assert.strictEqual(find('.dropdown__content').scrollTop, expectedTop);
  });

  test('up on trigger will open combobox', async function (assert) {
    assert.expect(3);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Dropdown>
          <sb.Trigger />
          <sb.Content>
            <sb.Options>
              <sb.Option />
              <sb.Option />
              <sb.Option />
            </sb.Options>
          </sb.Content>
        </sb.Dropdown>
      </SelectBox>
    </template>);

    await focus('.select-box .dropdown__trigger');
    await triggerKeyEvent(
      '.select-box .dropdown__trigger',
      'keydown',
      'ArrowUp'
    );

    assert
      .dom('.select-box .dropdown')
      .hasAttribute('data-open', 'true', 'opens the select box');

    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute('aria-expanded', 'true', 'opens the combobox box');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true', 'activates the first option');
  });

  test('up on trigger will open combobox (with selected value)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox @value={{2}} as |sb|>
        <sb.Dropdown>
          <sb.Trigger />
          <sb.Content>
            <sb.Options>
              <sb.Option @value={{1}} />
              <sb.Option @value={{2}} />
              <sb.Option @value={{3}} />
            </sb.Options>
          </sb.Content>
        </sb.Dropdown>
      </SelectBox>
    </template>);

    await focus('.select-box .dropdown__trigger');
    await triggerKeyEvent(
      '.select-box .dropdown__trigger',
      'keydown',
      'ArrowDown'
    );

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true', 'the selected option is active');
  });

  test('up on input will not open combobox (behaviour undefined)', async function (assert) {
    assert.expect(2);

    // We can assume a Trigger is for opening/closing.
    // But if there's a dropdown and no trigger, then its
    // probably a custom select box, and we make no assumptions
    // The developer should probably just render both an input
    // and a trigger.

    await render(<template>
      <SelectBox as |sb|>
        <sb.Dropdown>
          <sb.Input />
          <sb.Content>
            <sb.Options>
              <sb.Option />
            </sb.Options>
          </sb.Content>
        </sb.Dropdown>
      </SelectBox>
    </template>);

    await focus('.select-box__input');
    await triggerKeyEvent('.select-box__input', 'keydown', 'ArrowUp');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
  });

  test('down on options of a listbox after making a selection', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option />
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    await click('.select-box__option:nth-child(2)');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true', 'precondition');

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowUp');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute(
        'aria-current',
        'true',
        'starts from the correct active option'
      );
  });

  test('clicking an option, but mousing out of the select box, then pressing up', async function (assert) {
    assert.expect(3);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option @value={{1}} />
          <sb.Option @value={{2}} />
          <sb.Option @value={{3}} />
        </sb.Options>
      </SelectBox>
    </template>);

    await click('.select-box__option:nth-child(2)');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true', 'precondition');

    await triggerEvent('.select-box', 'mouseleave');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowUp');

    assert.dom('.select-box__option:nth-child(1)').hasAttribute(
      'aria-current',
      'true',
      `because there was a selected option,
       keyboard navigation starts from that point`
    );
  });

  test('does not scroll the active option into view when closed', async function (assert) {
    assert.expect(1);

    // check this

    await render(<template>
      <SelectBox as |sb|>
        <sb.Dropdown>
          <sb.Trigger />
          <sb.Content>
            <sb.Options>
              <sb.Option @value="A">a</sb.Option>
              <sb.Option @value="B">b</sb.Option>
              <sb.Option @value="C">c</sb.Option>
            </sb.Options>
          </sb.Content>
        </sb.Dropdown>
      </SelectBox>
    </template>);

    await focus('.select-box .dropdown__trigger');
    await triggerKeyEvent(
      '.select-box .dropdown__trigger',
      'keydown',
      'ArrowUp'
    );

    assert.strictEqual(find('.select-box__options').scrollTop, 0);
  });
});
