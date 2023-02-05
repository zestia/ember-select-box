import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  triggerKeyEvent,
  focus,
  triggerEvent
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (space)', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (assert) {
    this.handleChange = (value) => assert.step(value);
    this.handleKeyDown = (event) => (this.event = event);
  });

  test('space on trigger of combobox', async function (assert) {
    assert.expect(11);

    await render(hbs`
      <SelectBox @onChange={{this.handleChange}} as |sb|>
        <sb.Trigger {{on "keydown" this.handleKeyDown}} />
        <sb.Options>
          <sb.Option @value="A" />
          <sb.Option @value="B" />
          <sb.Option @value="C" />
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__trigger');
    await triggerKeyEvent('.select-box__trigger', 'keydown', ' ');

    assert.verifySteps([], 'change event is not fired');
    assert.true(this.event.defaultPrevented);
    assert.dom('.select-box').hasAttribute('data-open', 'true');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute(
        'aria-current',
        'true',
        'first option is activated when the select box opens'
      );

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-selected', 'false', 'precondition');

    await triggerKeyEvent('.select-box__trigger', 'keydown', ' ');

    assert.verifySteps(['A'], 'change event is fired');
    assert.true(this.event.defaultPrevented);

    assert
      .dom('.select-box')
      .hasAttribute(
        'data-open',
        'false',
        'select box closes when space is pressed'
      );

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute(
        'aria-current',
        'true',
        'option remains active, because the select box is still focused'
      );

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-selected', 'true', 'enter on an option selects it');
  });

  test('space in input of combobox', async function (assert) {
    assert.expect(5);

    await render(hbs`
      <SelectBox @onChange={{this.handleChange}} as |sb|>
        <sb.Input {{on "keydown" this.handleKeyDown}} />
        <sb.Options>
          <sb.Option @value="A" />
          <sb.Option @value="B" />
          <sb.Option @value="C" />
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__input');
    await triggerKeyEvent('.select-box__input', 'keydown', ' ');

    assert.verifySteps([], 'change event is not fired');
    assert.false(this.event.defaultPrevented, 'can type spaces still');

    assert.dom('.select-box').doesNotHaveAttribute(
      'data-open',
      `does not open, because the space character is typed into the input
       also there is no trigger present to imply its openable`
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

    await render(hbs`
      <SelectBox
        @onChange={{this.handleChange}}
        {{on "keydown" this.handleKeyDown}}
        as |sb|
      >
        <sb.Options>
          <sb.Option @value="A" />
          <sb.Option @value="B" />
          <sb.Option @value="C" />
        </sb.Options>
      </SelectBox>
    `);

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
    assert.true(this.event.defaultPrevented, 'will not scroll');
  });

  test('space on trigger of combobox whilst typing', async function (assert) {
    assert.expect(8);

    await render(hbs`
      {{! template-lint-disable no-whitespace-for-layout }}
      <SelectBox @onChange={{this.handleChange}} as |sb|>
        <sb.Trigger {{on "keydown" this.handleKeyDown}} />
        <sb.Options>
          <sb.Option @value="A">a</sb.Option>
          <sb.Option @value="A1">a1</sb.Option>
          <sb.Option @value="A 2">a  2</sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await focus('.select-box__trigger');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await triggerKeyEvent('.select-box__trigger', 'keydown', 'A');
    await triggerKeyEvent('.select-box__trigger', 'keydown', ' ');
    await triggerKeyEvent('.select-box__trigger', 'keydown', '2');

    assert.verifySteps(['A', 'A 2'], 'change event fires');
    assert.false(this.event.defaultPrevented);

    assert.dom('.select-box').hasAttribute(
      'data-open',
      'false',
      `space usually toggles a select box open/closed. but in this case
       we are in the middle of jumping to an option. (this is how native
       select boxes behave).`
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
