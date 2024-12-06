import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import Dropdown from '@zestia/ember-select-box/components/dropdown';

module('dropdown/content', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(<template>
      <Dropdown as |dd|>
        <dd.Content />
      </Dropdown>
    </template>);

    assert.dom('.dropdown__content').hasTagName('div');
  });

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(<template>
      <Dropdown as |dd|>
        <dd.Content>
          Hello World
        </dd.Content>
      </Dropdown>
    </template>);

    assert.dom('.dropdown__content').hasText('Hello World');
  });

  test('splattributes', async function (assert) {
    assert.expect(1);

    await render(<template>
      <Dropdown as |dd|>
        <dd.Content class="foo" />
      </Dropdown>
    </template>);

    assert.dom('.dropdown__content').hasClass('foo');
  });
});
