import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box/input', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Input />
        </SelectBox>
      </template>
    );

    assert.dom('.select-box__input').hasTagName('input');
  });

  test('splattributes', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Input class="foo" />
        </SelectBox>
      </template>
    );

    assert.dom('.select-box__input').hasClass('foo');
  });

  test('role', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Input />
        </SelectBox>
      </template>
    );

    assert.dom('.select-box__input').hasAttribute('role', 'combobox');
  });

  test('role with trigger', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown>
            <sb.Input />
            <sb.Trigger />
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    assert
      .dom('.select-box__input')
      .hasAttribute(
        'role',
        'combobox',
        'input is still the primary interactive element'
      );
  });

  test('type', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Input />
        </SelectBox>
      </template>
    );

    assert
      .dom('.select-box__input')
      .doesNotHaveAttribute('type', 'text')
      .doesNotHaveAttribute('type', 'search');
  });
});
