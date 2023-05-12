import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, setupOnerror, resetOnerror } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box/options', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options />
      </SelectBox>
    `);

    assert.dom('.select-box__options').hasTagName('div');
  });

  test('splattributes', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options class="foo" />
      </SelectBox>
    `);

    assert.dom('.select-box__options').hasClass('foo');
  });

  test('role', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options />
      </SelectBox>
    `);

    assert.dom('.select-box__options').hasAttribute('role', 'listbox');
  });

  test('tabindex (listbox)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options />
      </SelectBox>
    `);

    assert.dom('.select-box__options').hasAttribute('tabindex', '0');
  });

  test('tabindex (combobox with input)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Input />
        <sb.Options />
      </SelectBox>
    `);

    assert.dom('.select-box__options').doesNotHaveAttribute('tabindex');
  });

  test('tabindex (combobox with trigger)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Input />
        <sb.Options />
      </SelectBox>
    `);

    assert.dom('.select-box__options').doesNotHaveAttribute('tabindex');
  });

  test('id', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options />
      </SelectBox>
    `);

    assert.ok(
      find('.select-box__options')
        .getAttribute('id')
        .match(/[\w\d]+/)
    );
  });

  test('whitespace', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options />
      </SelectBox>
    `);

    assert.strictEqual(find('.select-box__options').innerHTML, '');
  });

  test('single', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options />
      </SelectBox>
    `);

    assert
      .dom('.select-box__options')
      .doesNotHaveAttribute('aria-multiselectable');
  });

  test('multiple', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox @multiple={{true}} as |sb|>
        <sb.Options />
      </SelectBox>
    `);

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

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options />
        <sb.Options />
      </SelectBox>
    `);

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

    await render(hbs`<SelectBox />`);

    resetOnerror();
  });
});
