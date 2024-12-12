import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import {
  render,
  triggerKeyEvent,
  focus,
  triggerEvent
} from '@ember/test-helpers';
import { on } from '@ember/modifier';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (space)', function (hooks) {
  setupRenderingTest(hooks);

  let event;
  let handleChange;

  const handleKeyDown = (_event) => (event = _event);

  hooks.beforeEach(function (assert) {
    handleChange = (value) => assert.step(value);
  });

  test('space on trigger of combobox', async function (assert) {
    assert.expect(10);

    await render(<template>
      <SelectBox @onChange={{handleChange}} as |sb|>
        <sb.Dropdown>
          <sb.Trigger {{on "keydown" handleKeyDown}} />
          <sb.Content>
            <sb.Options>
              <sb.Option @value="A" />
              <sb.Option @value="B" />
              <sb.Option @value="C" />
            </sb.Options>
          </sb.Content>
        </sb.Dropdown>
      </SelectBox>
    </template>);

    await focus('.select-box .dropdown__trigger');
    await triggerKeyEvent('.select-box .dropdown__trigger', 'keydown', ' ');

    assert.verifySteps([], 'change event is not fired');
    assert.true(event.defaultPrevented);

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'true');
    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute('aria-expanded', 'true');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'false')
      .hasAttribute('aria-selected', 'false');

    await triggerKeyEvent('.select-box .dropdown__trigger', 'keydown', ' ');

    assert.verifySteps([], 'change event is not fired');
    assert.true(event.defaultPrevented);

    // Does not close (no option was active)
    // This is counter to a normal dropdown, which toggles.

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'true');
    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute('aria-expanded', 'true');
  });

  test('space in input of combobox', async function (assert) {
    assert.expect(5);

    await render(<template>
      <SelectBox @onChange={{handleChange}} as |sb|>
        <sb.Dropdown>
          <sb.Input {{on "keydown" handleKeyDown}} />
          <sb.Content>
            <sb.Options>
              <sb.Option @value="A" />
              <sb.Option @value="B" />
              <sb.Option @value="C" />
            </sb.Options>
          </sb.Content>
        </sb.Dropdown>
      </SelectBox>
    </template>);

    await focus('.select-box__input');
    await triggerKeyEvent('.select-box__input', 'keydown', ' ');

    assert.verifySteps([], 'change event is not fired');
    assert.false(event.defaultPrevented, 'can type spaces still');

    assert
      .dom('.select-box .dropdown')
      .hasAttribute(
        'data-open',
        'false',
        'does not open, because the space character is typed into the input'
      );

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'false');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-selected', 'false');
  });

  test('space in listbox', async function (assert) {
    assert.expect(4);

    await render(<template>
      <SelectBox
        @onChange={{handleChange}}
        {{on "keydown" handleKeyDown}}
        as |sb|
      >
        <sb.Options>
          <sb.Option @value="A" />
          <sb.Option @value="B" />
          <sb.Option @value="C" />
        </sb.Options>
      </SelectBox>
    </template>);

    await focus('.select-box__options');
    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');
    await triggerKeyEvent('.select-box__options', 'keydown', ' ');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute(
        'aria-selected',
        'true',
        'pressing space with an active option selects that option'
      );

    assert.verifySteps(['B']);
    assert.true(event.defaultPrevented, 'will not scroll');
  });

  test('space on trigger of combobox whilst typing', async function (assert) {
    assert.expect(11);

    await render(<template>
      {{! template-lint-disable no-whitespace-for-layout }}
      <SelectBox @onChange={{handleChange}} as |sb|>
        <sb.Dropdown>
          <sb.Trigger {{on "keydown" handleKeyDown}} />
          <sb.Content>
            <sb.Options>
              <sb.Option @value="A">a</sb.Option>
              <sb.Option @value="A1">a1</sb.Option>
              <sb.Option @value="A 2">a 2</sb.Option>
            </sb.Options>
          </sb.Content>
        </sb.Dropdown>
      </SelectBox>
    </template>);

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await focus('.select-box .dropdown__trigger');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await triggerKeyEvent('.select-box .dropdown__trigger', 'keydown', 'A');

    assert.false(event.defaultPrevented);

    assert.verifySteps(['A'], 'change event fires');

    await triggerKeyEvent('.select-box .dropdown__trigger', 'keydown', ' ');

    assert.true(
      event.defaultPrevented,
      'will not scroll if space is pressed whilst typing to jump to an option'
    );

    await triggerKeyEvent('.select-box .dropdown__trigger', 'keydown', '2');

    assert.false(event.defaultPrevented);

    assert.verifySteps(['A 2'], 'change event fires');

    assert.dom('.select-box .dropdown').hasAttribute(
      'data-open',
      'false',
      `space usually toggles a select box open/closed. but in this case
       we are in the middle of jumping to an option and so that character
       should form part of the 'search' for the option
       (this is how native select boxes behave).`
    );

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute(
        'aria-current',
        'true',
        'activates the correct option containing a space character'
      );
  });
});
