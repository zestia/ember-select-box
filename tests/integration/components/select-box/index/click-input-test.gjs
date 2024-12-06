import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, click } from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (clicking input)', function (hooks) {
  setupRenderingTest(hooks);

  test('clicking an input is undefined behaviour', async function (assert) {
    assert.expect(3);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Dropdown>
          <sb.Input />
          <sb.Trigger />
        </sb.Dropdown>
      </SelectBox>
    </template>);

    await click('.select-box__input');

    assert.dom('.select-box__dropdown').hasAttribute('data-open', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
  });
});
