import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { find, render, setupOnerror, resetOnerror } from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box/options', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options />
      </SelectBox>
    </template>);

    assert.dom('.select-box__options').hasTagName('div');
  });

  test('splattributes', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options class="foo" />
      </SelectBox>
    </template>);

    assert.dom('.select-box__options').hasClass('foo');
  });

  test('role', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options />
      </SelectBox>
    </template>);

    assert.dom('.select-box__options').hasAttribute('role', 'listbox');
  });

  test('tabindex (listbox)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options />
      </SelectBox>
    </template>);

    assert
      .dom('.select-box__options')
      .hasAttribute(
        'tabindex',
        '0',
        'the main interactive element is the listbox'
      );
  });

  test('tabindex (combobox with input)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Input />
        <sb.Options />
      </SelectBox>
    </template>);

    assert.dom('.select-box__options').hasAttribute(
      'tabindex',
      '-1',
      `the main interactive element is the input (combobox)
       focus should not move to the listbox, which is
       aria controlled by the input.
       this prevents keyboard-focusable-scrollers from stealing focus,
       since options often overflows`
    );
  });

  test('tabindex (combobox with trigger)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Options />
      </SelectBox>
    </template>);

    assert.dom('.select-box__options').hasAttribute(
      'tabindex',
      '-1',
      `the main interactive element is the trigger (combobox)
       focus should not move to the listbox, which is
       aria controlled by the trigger`
    );
  });

  test('id', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options />
      </SelectBox>
    </template>);

    assert.ok(
      find('.select-box__options')
        .getAttribute('id')
        .match(/[\w\d]+/)
    );
  });

  test('whitespace', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options />
      </SelectBox>
    </template>);

    assert.strictEqual(find('.select-box__options').innerHTML, '');
  });

  test('single', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options />
      </SelectBox>
    </template>);

    assert
      .dom('.select-box__options')
      .doesNotHaveAttribute('aria-multiselectable');
  });

  test('multiple', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox @multiple={{true}} as |sb|>
        <sb.Options />
      </SelectBox>
    </template>);

    assert
      .dom('.select-box__options')
      .hasAttribute('aria-multiselectable', 'true');
  });

  test('multiple listboxes', async function (assert) {
    assert.expect(1);

    setupOnerror((error) => {
      assert.strictEqual(
        error.message,
        'Assertion Failed: can only have 1 listbox'
      );
    });

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options />
        <sb.Options />
      </SelectBox>
    </template>);

    resetOnerror();
  });

  test('no listbox', async function (assert) {
    assert.expect(1);

    setupOnerror((error) => {
      assert.strictEqual(
        error.message,
        'Assertion Failed: must have an interactive element'
      );
    });

    await render(<template><SelectBox /></template>);

    resetOnerror();
  });
});
