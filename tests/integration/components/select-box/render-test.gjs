import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, find } from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options />
      </SelectBox>
    </template>);

    assert.dom('.select-box').hasTagName('div');
  });

  test('splattributes', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox class="foo" as |sb|>
        <sb.Options />
      </SelectBox>
    </template>);

    assert.dom('.select-box').hasClass('foo');
  });

  test('expanded (listbox)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options />
      </SelectBox>
    </template>);

    assert.dom('.select-box').doesNotHaveAttribute('data-open');
  });

  test('expanded (combobox)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
      </SelectBox>
    </template>);

    assert.dom('.select-box').hasAttribute('data-open', 'false');
  });
});
