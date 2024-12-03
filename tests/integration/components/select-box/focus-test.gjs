import { module, test, todo } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import {
  render,
  click,
  triggerEvent,
  blur,
  focus,
  waitFor,
  settled,
  triggerKeyEvent
} from '@ember/test-helpers';
import { on } from '@ember/modifier';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (focus)', function (hooks) {
  setupRenderingTest(hooks);

  test('focus after clicking an option (listbox)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    await triggerEvent('.select-box__option', 'mousedown');

    assert
      .dom('.select-box__options')
      .isFocused('the listbox is focused when an option is clicked');
  });

  test('focus after clicking an option (input combobox)', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Input />
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__input').isNotFocused('does not steal focus');

    await triggerEvent('.select-box__option', 'mousedown');

    assert
      .dom('.select-box__input')
      .isFocused('the input is the main interactive element');
  });

  test('focus after clicking an option (trigger combobox)', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__trigger').isNotFocused('does not steal focus');

    await triggerEvent('.select-box__option', 'mousedown');

    assert
      .dom('.select-box__trigger')
      .isFocused('the trigger is the main interactive element');
  });

  test('focus after clicking an option (input & trigger combobox)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Input />
        <sb.Trigger />
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    await click('.select-box__option');

    assert
      .dom('.select-box__input')
      .isFocused('the input is the main interactive element');
  });

  test('combobox with input', async function (assert) {
    assert.expect(2);

    let event;

    const handleMouseDown = (_event) => (event = _event);

    await render(<template>
      {{! template-lint-disable no-pointer-down-event-binding }}
      <SelectBox {{on "mousedown" handleMouseDown}} as |sb|>
        <sb.Input />
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    await focus('.select-box__input');
    await click('.select-box__option');

    assert.dom('.select-box__input').isFocused(`
      clicking an option does not steal focus from the input,
      otherwise the select box would close (due to focus out
      of the main interactive element)
    `);

    assert.true(event.defaultPrevented);
  });

  test('focus leaving listbox does not forget active option', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    await focus('.select-box__options');
    await triggerEvent('.select-box__option', 'mouseenter');

    assert.dom('.select-box__option').hasAttribute('aria-current', 'true');

    await blur('.select-box__options');

    assert.dom('.select-box__option').hasAttribute('aria-current', 'true');
  });

  test('focus leaving combobox does not forget active option (trigger)', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    await focus('.select-box__trigger');
    await triggerEvent('.select-box__option', 'mouseenter');

    assert.dom('.select-box__option').hasAttribute('aria-current', 'true');

    await blur('.select-box__trigger');

    assert.dom('.select-box__option').hasAttribute('aria-current', 'true');
  });

  test('focus leaving combobox does not forgets active option (input)', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Input />
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    await focus('.select-box__input');
    await triggerEvent('.select-box__option', 'mouseenter');

    assert.dom('.select-box__option').hasAttribute('aria-current', 'true');

    await blur('.select-box__input');

    assert.dom('.select-box__option').hasAttribute('aria-current', 'true');
  });

  test('focusing trigger does not open the combobox', async function (assert) {
    assert.expect(3);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Input />
      </SelectBox>
    </template>);

    await focus('.select-box__trigger');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
  });

  test('a focused input going away retains focus in the select box (mouse)', async function (assert) {
    assert.expect(3);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
        {{#if sb.isOpen}}
          <sb.Options>
            <sb.Input />
            <sb.Option />
          </sb.Options>
        {{/if}}
      </SelectBox>
    </template>);

    await click('.select-box__trigger');

    assert.dom('.select-box__input').isFocused('focus advances to input');

    await click('.select-box__option');

    assert.dom('.select-box__option').doesNotExist('precondition (closed)');
    assert.dom('.select-box__trigger').isFocused('focus restored to trigger');
  });

  test('a focused input going due to focus leaving', async function (assert) {
    assert.expect(3);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
        {{#if sb.isOpen}}
          <sb.Options>
            <sb.Input />
            <sb.Option />
          </sb.Options>
        {{/if}}
      </SelectBox>

      <button type="button" class="outside"></button>
    </template>);

    await click('.select-box__trigger');

    assert.dom('.select-box__input').isFocused('focus advances to input');

    await click('.outside');

    assert.dom('.select-box__option').doesNotExist('precondition (closed)');
    assert.dom('.select-box__trigger').isNotFocused(`
      if focus is leaving the select box, this will cause it to close,
      closing should never steal focus. focus should be allowed to leave.
    `);
  });

  test('a focused input going away retains focus in the select box (keyboard)', async function (assert) {
    assert.expect(3);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
        {{#if sb.isOpen}}
          <sb.Options>
            <sb.Input />
            <sb.Option />
          </sb.Options>
        {{/if}}
      </SelectBox>
    </template>);

    await focus('.select-box__trigger');
    await triggerKeyEvent('.select-box__trigger', 'keydown', 'Enter');

    assert.dom('.select-box__input').isFocused('focus advances to input');

    await triggerKeyEvent('.select-box__input', 'keydown', 'ArrowDown');
    await triggerKeyEvent('.select-box__input', 'keydown', 'Enter');

    assert.dom('.select-box__input').doesNotExist('precondition (closed)');
    assert.dom('.select-box__trigger').isFocused('focus restored to trigger');
  });

  test('a focused input going away with no trigger', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox @open={{true}} as |sb|>
        {{#if sb.isOpen}}
          <sb.Options>
            <sb.Input />
            <sb.Option />
          </sb.Options>
        {{/if}}
      </SelectBox>
    </template>);

    await focus('.select-box__input');
    await click('.select-box__option');

    assert.dom(document.body).isFocused(`
      no attempt is made to retain focus on the trigger,
      because there isn't one.
      this is an unlikely scenario since a trigger should be
      used to open the combobox in the first place
    `);
  });

  test('focus leaving combobox (trigger)', async function (assert) {
    assert.expect(4);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
      </SelectBox>
      <button type="button" class="outside"></button>
    </template>);

    await click('.select-box__trigger');

    assert.dom('.select-box').hasAttribute('data-open', 'true', 'precondition');

    focus('.outside');

    await waitFor('.select-box__trigger');

    assert.dom('.select-box__trigger').isNotFocused('focus is not stolen');

    await settled();

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.outside').isFocused();
  });

  test('focus leaving combobox (input)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Input />
      </SelectBox>
      <button type="button" class="outside"></button>
    </template>);

    await focus('.select-box__input');
    await click('.outside');

    assert.dom('.outside').isFocused('focus is not stolen');
  });

  test('focus leaving listbox', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options />
      </SelectBox>
      <button type="button" class="outside"></button>
    </template>);

    await focus('.select-box__options');
    await click('.outside');

    assert.dom('.outside').isFocused('focus is not stolen');
  });

  test('focus leaving input will skip the trigger', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Input />
        <sb.Trigger />
      </SelectBox>
    </template>);

    assert.dom('.select-box__trigger').hasAttribute(
      'tabindex',
      '-1',
      `because the input is the focused element for this combobox,
       pressing tab should skip over the trigger and move to the next
       interactive element`
    );
  });

  test('focus moving to somewhere else inside the combo box (none interactive element)', async function (assert) {
    assert.expect(3);

    let event;

    const handleMouseDown = (_event) => (event = _event);

    await render(<template>
      {{! template-lint-disable no-pointer-down-event-binding }}
      <SelectBox {{on "mousedown" handleMouseDown}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <span class="inside"></span>
        </sb.Options>
      </SelectBox>
    </template>);

    await click('.select-box__trigger');
    await click('.inside');

    assert
      .dom('.select-box')
      .hasAttribute(
        'data-open',
        'true',
        'remains open if mouse lands on a non interactive element inside the select box'
      );

    assert.dom('.select-box__trigger').isFocused(`
      focus must be maintained on the interactive element, regardless
      of where is clicked inside the select box, otherwise the
      select box will not be receptive to user actions, which is the
      same as how any other native component would behave
    `);

    // Note
    // we use tabindex="-1" on the listbox to prevent
    // keyboard-focusable-scrollers from stealing focus, but
    // this has a down side of actually allowing the listbox
    // to be focusable on click, so we must prevent that.
    // https://issues.chromium.org/issues/376718258
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1930662

    assert.true(event.defaultPrevented);
  });

  test('focus moving to somewhere else inside the combo box', async function (assert) {
    assert.expect(3);

    let event;

    const handleMouseDown = (_event) => (event = _event);

    await render(<template>
      {{! template-lint-disable no-pointer-down-event-binding }}
      <SelectBox {{on "mousedown" handleMouseDown}} as |sb|>
        <sb.Trigger />
        <button type="button" class="inside"></button>
      </SelectBox>
    </template>);

    await click('.select-box__trigger');
    await click('.inside');

    assert.dom('.select-box').hasAttribute(
      'data-open',
      'true',
      `focus is free to move about inside an open select box
       it will not be receptive to user actions, but the interactive
       elements inside it will, and that's ok. unusual, but at least
       allows flexibility for the developer if designing a highly
       custom select box`
    );

    assert.dom('.inside').isFocused();

    assert.false(event.defaultPrevented);
  });

  test('focus moving to somewhere else inside the combo box then leaving', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
        <button type="button" class="inside"></button>
      </SelectBox>
      <button type="button" class="outside"></button>
    </template>);

    await click('.select-box__trigger');
    await click('.inside');

    assert.dom('.select-box').hasAttribute('data-open', 'true');

    await focus('.outside');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
  });

  test('focusable options', async function (assert) {
    assert.expect(1);

    // This behaviour may be removed in future versions
    // to reduce API surface and align more with native behaviour,
    // Kind of depends where this goes:
    // https://open-ui.org/components/customizableselect/

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option class="looks-like-an-option" tabindex="0">
            Choose
          </sb.Option>
          <a href="#" class="looks-like-an-option">
            Choose
          </a>
        </sb.Options>
      </SelectBox>
    </template>);

    await focus('.select-box__option');

    assert.dom('.select-box__option').hasAttribute(
      'aria-current',
      'true',
      `focusing an option is not necessary in normal scenarios,
       because focus is managed virtually using aria-activedescendant.
       however, in some custom cases, you may wish to mix select box
       options with buttons, and therefore tabbing through these
       should be allowed.`
    );
  });

  test('focusing something inside an option', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option>
            <a href="#">Hyperlink</a>
          </sb.Option>
        </sb.Options>
      </SelectBox>
    </template>);

    await focus('a');

    assert.dom('.select-box__option').hasAttribute(
      'aria-current',
      'true',
      `focusing moving into an option activates that option
       (not technically valid to have nested interactive elements)`
    );
  });

  todo('focus-visible', async function (assert) {
    assert.expect(1);

    await render(<template>
      {{! template-lint-disable no-forbidden-elements }}
      <style>
        .select-box__trigger:focus-visible { outline: 2px solid red; }
      </style>
      <SelectBox @value="foo" as |sb|>
        <sb.Trigger>
          {{sb.value}}
        </sb.Trigger>
        <sb.Options>
          <sb.Option @value="foo">foo</sb.Option>
          <sb.Option @value="bar">bar</sb.Option>
          <sb.Option @value="baz">baz</sb.Option>
        </sb.Options>
      </SelectBox>
    </template>);

    await click('.select-box__trigger');

    assert.dom('.select-box__trigger').doesNotHaveStyle(
      { outline: 'rgb(255, 0, 0) solid 2px' },
      `the select box's focus management does not accidentally cause
       focus-visible styles to apply. (here, the trigger was clicked,
       whereas the styles should only apply if the user had navigated
       to the element using the keyboard`
    );
  });
});
