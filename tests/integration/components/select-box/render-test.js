import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options />
      </SelectBox>
    `);

    assert.dom('.select-box').hasTagName('div');
  });

  test('splattributes', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox class="foo" as |sb|>
        <sb.Options />
      </SelectBox>
    `);

    assert.dom('.select-box').hasClass('foo');
  });

  test('expanded (listbox)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options />
      </SelectBox>
    `);

    assert.dom('.select-box').doesNotHaveAttribute('data-open');
  });

  test('expanded (combobox)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Trigger />
      </SelectBox>
    `);

    assert.dom('.select-box').hasAttribute('data-open', 'false');
  });
});
