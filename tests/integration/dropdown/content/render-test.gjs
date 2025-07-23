import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import Dropdown from '@zestia/ember-select-box/components/dropdown';

module('dropdown/content', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <Dropdown as |dd|>
          <dd.Content />
        </Dropdown>
      </template>
    );

    assert.dom('.dropdown__content').hasTagName('div');
  });

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <Dropdown as |dd|>
          <dd.Content>
            Hello World
          </dd.Content>
        </Dropdown>
      </template>
    );

    assert.dom('.dropdown__content').hasText('Hello World');
  });

  test('splattributes', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <Dropdown as |dd|>
          <dd.Content class="foo" />
        </Dropdown>
      </template>
    );

    assert.dom('.dropdown__content').hasClass('foo');
  });

  test('tabindex', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <Dropdown as |dd|>
          <dd.Content />
        </Dropdown>
      </template>
    );

    assert.dom('.dropdown__content').doesNotHaveAttribute('tabindex');
  });

  test('tabindex (closure component)', async function (assert) {
    assert.expect(1);

    // So we can disable keyboard-focusable-scrollers

    await render(
      <template>
        <Dropdown as |dd|>
          {{component dd.Content tabindex="-1"}}
        </Dropdown>
      </template>
    );

    assert.dom('.dropdown__content').hasAttribute('tabindex', '-1');
  });
});
