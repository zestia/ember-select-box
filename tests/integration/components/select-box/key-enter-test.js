import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  focus,
  click,
  triggerKeyEvent,
  triggerEvent
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (enter)', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (assert) {
    this.handleChange = (value) => assert.step(value);
    this.handleKeyDown = (event) => (this.event = event);
  });

  test('enter on trigger of combobox', async function (assert) {
    assert.expect(10);

    await render(hbs`
      <SelectBox @onChange={{this.handleChange}} as |sb|>
        <sb.Trigger {{on "keydown" this.handleKeyDown}} />
        <sb.Options>
          <sb.Option @value="a" />
          <sb.Option @value="b" />
          <sb.Option @value="c" />
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__trigger');
    await triggerKeyEvent('.select-box__trigger', 'keydown', 'Enter');

    assert.verifySteps([], 'change event is not fired');
    assert.false(this.event.defaultPrevented);

    assert.dom('.select-box').hasAttribute('data-open', 'true');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'true');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'false')
      .hasAttribute('aria-selected', 'false');

    await triggerKeyEvent('.select-box__trigger', 'keydown', 'Enter');

    assert.verifySteps([], 'change event is not fired');
    assert.false(this.event.defaultPrevented);

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
  });

  test('enter in input of combobox', async function (assert) {
    assert.expect(12);

    await render(hbs`
      <SelectBox @onChange={{this.handleChange}} as |sb|>
        <sb.Input {{on "keydown" this.handleKeyDown}} />
        <sb.Options>
          <sb.Option @value="a" />
          <sb.Option @value="b" />
          <sb.Option @value="c" />
        </sb.Options>
      </SelectBox>
    `);

    // pressing enter whilst inside an input will submit the form
    // because there is no option active to be selected

    await focus('.select-box__input');
    await triggerKeyEvent('.select-box__input', 'keydown', 'Enter');

    assert.verifySteps([]);
    assert.false(this.event.defaultPrevented);
    assert.dom('.select-box').doesNotHaveAttribute('data-open');
    assert.dom('.select-box__input').doesNotHaveAttribute('aria-expanded');
    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();
    assert.dom('.select-box__option[aria-selected="true"]').doesNotExist();

    await triggerKeyEvent('.select-box__input', 'keydown', 'Enter');

    assert.verifySteps([]);
    assert.false(this.event.defaultPrevented);
    assert.dom('.select-box').doesNotHaveAttribute('data-open');
    assert.dom('.select-box__input').doesNotHaveAttribute('aria-expanded');
    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();
    assert.dom('.select-box__option[aria-selected="true"]').doesNotExist();
  });

  test('enter in input of combobox (with a trigger)', async function (assert) {
    assert.expect(12);

    await render(hbs`
      <SelectBox @value="b" @onChange={{this.handleChange}} as |sb|>
        <sb.Input {{on "keydown" this.handleKeyDown}} />
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value="a" />
          <sb.Option @value="b" />
          <sb.Option @value="c" />
        </sb.Options>
      </SelectBox>
    `);

    // pressing enter whilst inside an input would usually submit the form
    // but in this case, since there is a trigger, the select box will toggle

    await focus('.select-box__input');
    await triggerKeyEvent('.select-box__input', 'keydown', 'Enter');

    assert.verifySteps([]);
    assert.true(this.event.defaultPrevented);
    assert.dom('.select-box').hasAttribute('data-open', 'true');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'true');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true')
      .hasAttribute('aria-selected', 'true');

    await triggerKeyEvent('.select-box__input', 'keydown', 'Enter');

    assert.verifySteps([]);
    assert.true(this.event.defaultPrevented);
    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'false')
      .hasAttribute('aria-selected', 'true');
  });

  test('enter in input of combobox (with active option)', async function (assert) {
    assert.expect(5);

    await render(hbs`
      <SelectBox @onChange={{this.handleChange}} as |sb|>
        <sb.Input {{on "keydown" this.handleKeyDown}} />
        <sb.Options>
          <sb.Option @value="a" />
          <sb.Option @value="b" />
          <sb.Option @value="c" />
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__input');
    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');
    await triggerKeyEvent('.select-box__input', 'keydown', 'Enter');

    assert.verifySteps(['b']);

    assert.true(
      this.event.defaultPrevented,
      `pressing enter whilst inside an input will not submit the form
       because instead, it will select the active option`
    );

    assert.dom('.select-box').doesNotHaveAttribute('data-open');
    assert.dom('.select-box__input').doesNotHaveAttribute('aria-expanded');
  });

  test('enter in listbox', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <SelectBox
        @onChange={{this.handleChange}}
        {{on "keydown" this.handleKeyDown}}
        as |sb|
      >
        <sb.Options>
          <sb.Option @value="a" />
          <sb.Option @value="b" />
          <sb.Option @value="c" />
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__options');
    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');
    await triggerKeyEvent('.select-box__options', 'keydown', 'Enter');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute(
        'aria-selected',
        'true',
        'pressing enter with an active option selects that option'
      );

    assert.verifySteps(['b']);
    assert.false(this.event.defaultPrevented);
  });

  test('pressing enter on a child', async function (assert) {
    assert.expect(1);

    this.handleKeyDown = (event) => (this.event = event);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option>
            <a href="#" {{on "keydown" this.handleKeyDown}}>Link</a>
          </sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__options');
    await triggerKeyEvent('a', 'keydown', 'Enter');

    assert.false(this.event.defaultPrevented, 'ui still accessible');
  });

  test('pressing enter on a focusable option (listbox)', async function (assert) {
    assert.expect(2);

    this.handleChange = (value) => assert.step(value);

    await render(hbs`
      <SelectBox @onChange={{this.handleChange}} as |sb|>
        <sb.Options>
          <sb.Option @value="1" tabindex="0" />
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__option');
    await triggerKeyEvent('.select-box__option', 'keydown', 'Enter');

    assert.verifySteps(['1']);
  });

  test('pressing enter on a focusable option (combobox)', async function (assert) {
    assert.expect(2);

    this.handleChange = (value) => assert.step(value);

    await render(hbs`
      <SelectBox @onChange={{this.handleChange}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value="1" tabindex="0" />
        </sb.Options>
      </SelectBox>
    `);

    await click('.select-box__trigger');
    await focus('.select-box__option');
    await triggerKeyEvent('.select-box__option', 'keydown', 'Enter');

    assert.verifySteps(['1']);
  });
});
