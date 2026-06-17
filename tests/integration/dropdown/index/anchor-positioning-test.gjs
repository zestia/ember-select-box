import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import Dropdown from '#src/components/dropdown';

module('dropdown (anchor positioning)', function (hooks) {
  setupRenderingTest(hooks);

  test('can position dropdown content relative to its trigger', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <Dropdown as |dd|>
          <dd.Trigger />
          <dd.Content />
        </Dropdown>
      </template>
    );

    const [, id] = find('.dropdown__trigger')
      .getAttribute('style')
      .match(/anchor-name: (--[a-zA-Z0-9]+)/);

    assert
      .dom('.dropdown__content')
      .hasAttribute('style', `position-anchor: ${id}`);
  });

  test('opting out of anchor positioning', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <Dropdown @anchor={{false}} as |dd|>
          <div class="test-anchor" style="anchor-name: {{dd.anchorName}}">
            <dd.Trigger />
          </div>
          <div class="test-content" style="position-anchor: {{dd.anchorName}}">
            <dd.Content />
          </div>
        </Dropdown>
      </template>
    );

    assert.dom('.dropdown__trigger').doesNotHaveAttribute('style');

    const [, id] = find('.test-anchor')
      .getAttribute('style')
      .match(/anchor-name: (--[a-zA-Z0-9]+)/);

    assert.dom('.test-content').hasAttribute('style', `position-anchor: ${id}`);
  });
});
