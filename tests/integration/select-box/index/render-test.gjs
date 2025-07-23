import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Options />
        </SelectBox>
      </template>
    );

    assert.dom('.select-box').hasTagName('div');
  });

  test('splattributes', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox class="foo" as |sb|>
          <sb.Options />
        </SelectBox>
      </template>
    );

    assert.dom('.select-box').hasClass('foo');
  });

  test('whitespace', async function (assert) {
    assert.expect(1);

    await render(<template><SelectBox /></template>);

    assert.strictEqual(find('.select-box').innerHTML, '');
  });
});
