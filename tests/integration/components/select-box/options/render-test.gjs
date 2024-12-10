import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { find, render } from '@ember/test-helpers';
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

    assert.dom('.select-box__options').doesNotHaveAttribute(
      'tabindex',
      `the main interactive element is the input (combobox)
       focus should not move to the listbox, which is
       aria controlled virtually by the input.`
    );
  });

  test('tabindex (combobox with trigger)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Dropdown>
          <sb.Trigger />
          <sb.Content>
            <sb.Options />
          </sb.Content>
        </sb.Dropdown>
      </SelectBox>
    </template>);

    assert.dom('.select-box__options').doesNotHaveAttribute(
      'tabindex',
      `the main interactive element is the trigger (combobox)
       focus should not move to the listbox (options element), which is
       aria controlled virtually by the trigger`
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
});
