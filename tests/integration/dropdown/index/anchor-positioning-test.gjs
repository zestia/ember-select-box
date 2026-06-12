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
});
