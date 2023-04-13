import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  focus,
  click,
  find,
  triggerKeyEvent
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import sleep from 'dummy/utils/sleep';

module('select-box (jump to option)', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (assert) {
    this.handleChange = (value) => assert.step(value);
  });

  test('jump to options in a listbox', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <SelectBox @onChange={{this.handleChange}} as |sb|>
        <sb.Options>
          <sb.Option @value="1">a</sb.Option>
          <sb.Option @value="2">b1</sb.Option>
          <sb.Option @value="3">b2</sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__options');
    await triggerKeyEvent('.select-box__options', 'keydown', 'B');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    assert.verifySteps([], 'does not select the option');
  });

  test('jump to options in a combobox', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <SelectBox @onChange={{this.handleChange}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value="1">a</sb.Option>
          <sb.Option @value="2">b1</sb.Option>
          <sb.Option @value="3">b2</sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    await click('.select-box__trigger');
    await triggerKeyEvent('.select-box__trigger', 'keydown', 'B');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    assert.verifySteps([], 'does not select the option');
  });

  test('jump to when closed', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox @onChange={{this.handleChange}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value="1">a</sb.Option>
          <sb.Option @value="2">a1</sb.Option>
          <sb.Option @value="3">B</sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__trigger');
    await triggerKeyEvent('.select-box__trigger', 'keydown', 'A');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');

    assert.verifySteps(['1'], 'selects the option automatically');
  });

  test('jump to when closed (multiple)', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <SelectBox @onChange={{this.handleChange}} @multiple={{true}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value="1">a</sb.Option>
          <sb.Option @value="2">b</sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__trigger');
    await triggerKeyEvent('.select-box__trigger', 'keydown', 'B');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    assert.verifySteps([], 'does not select automatically');
  });

  test('jump to when input is focused', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Input />
        <sb.Options>
          <sb.Option>a</sb.Option>
          <sb.Option>b</sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await focus('.select-box__input');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await triggerKeyEvent('.select-box__input', 'keydown', 'B');

    assert.dom('.select-box__option:nth-child(2)').hasAttribute(
      'aria-current',
      'false',
      `does not jump to option, because the input is being used
       so the user is searching instead`
    );
  });

  test('has 1 second to find a match', async function (assert) {
    assert.expect(8);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option></sb.Option>
          <sb.Option>a1</sb.Option>
          <sb.Option>b</sb.Option>
          <sb.Option>b2</sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await focus('.select-box__options');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await triggerKeyEvent('.select-box__options', 'keydown', 'A');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__options', 'keydown', '1');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__options', 'keydown', 'B');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'false');

    await sleep(1000);

    await triggerKeyEvent('.select-box__options', 'keydown', 'B');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');

    await sleep(1000);

    await triggerKeyEvent('.select-box__options', 'keydown', 'A');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');
  });

  test('space character is included', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option>a 1</sb.Option>
          <sb.Option>a 2</sb.Option>
          <sb.Option>a 3</sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__options');
    await triggerKeyEvent('.select-box__options', 'keydown', 'A');
    await triggerKeyEvent('.select-box__options', 'keydown', ' ');
    await triggerKeyEvent('.select-box__options', 'keydown', '2');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');
  });

  test('text content is trimmed', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option>
            a
          </sb.Option>
          <sb.Option>
            b
          </sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__options');
    await triggerKeyEvent('.select-box__options', 'keydown', 'B');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');
  });

  test(`space character on trigger doesn't accidentally advance active option`, async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option>a</sb.Option>
          <sb.Option>b</sb.Option>
          <sb.Option>c</sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__trigger');
    await triggerKeyEvent('.select-box__trigger', 'keydown', ' ');
    await triggerKeyEvent('.select-box__trigger', 'keydown', ' ');
    await triggerKeyEvent('.select-box__trigger', 'keydown', ' ');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'false');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'false');
  });

  test('repeating characters cycles through ignoring timeout', async function (assert) {
    assert.expect(6);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option></sb.Option>
          <sb.Option>a1</sb.Option>
          <sb.Option>aa1</sb.Option>
          <sb.Option>a2</sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__options');
    await triggerKeyEvent('.select-box__options', 'keydown', 'A');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__options', 'keydown', 'A');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__options', 'keydown', 'A');

    assert
      .dom('.select-box__option:nth-child(4)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__options', 'keydown', 'A');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    await sleep(1000);

    await triggerKeyEvent('.select-box__options', 'keydown', 'A');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__options', 'keydown', '1');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute(
        'aria-current',
        'true',
        'not repeating any more so matches "a1"'
      );
  });

  test('jumping to an option starts from the current active option (listbox)', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox @value="A2" as |sb|>
        <sb.Options>
          <sb.Option @value="A1">a1</sb.Option>
          <sb.Option @value="A2">a2</sb.Option>
          <sb.Option @value="A3">a3</sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'false', 'precondition');

    await focus('.select-box__options');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'false');

    await triggerKeyEvent('.select-box__options', 'keydown', 'A');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');
  });

  test('jumping to an option starts from the current active option (combobox)', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox @value="A2" as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value="A1">a1</sb.Option>
          <sb.Option @value="A2">a2</sb.Option>
          <sb.Option @value="A3">a3</sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'false', 'precondition');

    await focus('.select-box__trigger');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'false');

    await triggerKeyEvent('.select-box__trigger', 'keydown', 'A');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');
  });

  test('jumping to an option starts from the current active option (repeating)', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <SelectBox @value="A2" as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value="A1">a1</sb.Option>
          <sb.Option @value="A2">a2</sb.Option>
          <sb.Option @value="A3">a3</sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'false');

    await triggerKeyEvent('.select-box__trigger', 'keydown', 'A');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__trigger', 'keydown', 'A');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__trigger', 'keydown', 'A');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');
  });

  test('jump to option continuous match', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option @value="fo">fo</sb.Option>
          <sb.Option @value="foo">foo</sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__options');
    await triggerKeyEvent('.select-box__options', 'keydown', 'F');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');

    await triggerKeyEvent('.select-box__options', 'keydown', 'O');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute(
        'aria-current',
        'true',
        'continues to match the first match, rather than moving to the next'
      );
  });

  test('jumping to an option scrolls it into view', async function (assert) {
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

      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option>a</sb.Option>
          <sb.Option>b</sb.Option>
          <sb.Option>c</sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    const expectedTop = find('.select-box__option:nth-child(3)').offsetTop;

    assert.ok(expectedTop > 0);
    assert.strictEqual(find('.select-box__options').scrollTop, 0);

    await focus('.select-box__options');
    await triggerKeyEvent('.select-box__options', 'keydown', 'C');

    assert.strictEqual(find('.select-box__options').scrollTop, expectedTop);
  });
});
