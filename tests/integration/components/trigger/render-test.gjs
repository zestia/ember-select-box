import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import {
  render,
  find,
  setupOnerror,
  resetOnerror,
  triggerEvent
} from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box/trigger', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
      </SelectBox>
    </template>);

    assert.dom('.select-box__trigger').hasTagName('div');
  });

  test('splattributes', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger class="foo" />
      </SelectBox>
    </template>);

    assert.dom('.select-box__trigger').hasClass('foo');
  });

  test('aria defaults', async function (assert) {
    assert.expect(6);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
      </SelectBox>
    </template>);

    assert.dom('.select-box__trigger').doesNotHaveAttribute('aria-busy');
    assert.dom('.select-box__trigger').doesNotHaveAttribute('aria-controls');
    assert.dom('.select-box__trigger').doesNotHaveAttribute('aria-disabled');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
    assert
      .dom('.select-box__trigger')
      .doesNotHaveAttribute('aria-activedescendant');

    assert
      .dom('.select-box__trigger')
      .doesNotHaveAttribute(
        'aria-haspopup',
        'listbox',
        'spec says this is implicit due to role of combobox'
      );
  });

  test('aria controls', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Options />
      </SelectBox>
    </template>);

    assert.ok(
      find('.select-box__trigger')
        .getAttribute('aria-controls')
        .match(/[\w\d]+/)
    );

    assert
      .dom('.select-box__options')
      .hasAttribute(
        'id',
        find('.select-box__trigger').getAttribute('aria-controls')
      );
  });

  test('role', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
      </SelectBox>
    </template>);

    assert.dom('.select-box__trigger').hasAttribute('role', 'combobox');
  });

  test('role (with input)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Input />
        <sb.Trigger />
      </SelectBox>
    </template>);

    assert
      .dom('.select-box__trigger')
      .hasAttribute(
        'role',
        'button',
        'the trigger is not the primary interactive element'
      );
  });

  test('whitespace', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
      </SelectBox>
    </template>);

    assert.strictEqual(find('.select-box__trigger').innerHTML, '');
  });

  test('multiple triggers', async function (assert) {
    assert.expect(1);

    setupOnerror((error) => {
      assert.strictEqual(
        error.message,
        'Assertion Failed: can only have 1 trigger'
      );
    });

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Trigger />
      </SelectBox>
    </template>);

    resetOnerror();
  });

  test('active descendant (with input)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Input />
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    await triggerEvent('.select-box__option', 'mouseenter');

    assert
      .dom('.select-box__trigger')
      .doesNotHaveAttribute('aria-activedescendant');
  });
});
