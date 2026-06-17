import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import SelectBox from '#src/components/select-box';
import { htmlSafe } from '@ember/template';
import { concat } from '@ember/helper';

module('select-box (anchor positioning)', function (hooks) {
  setupRenderingTest(hooks);

  test('can position dropdown content relative to its trigger', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown>
            <sb.Trigger />
            <sb.Content>
              <sb.Options />
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
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
    assert.expect(3);

    await render(
      <template>
        {{! template-lint-disable no-inline-styles }}
        <SelectBox as |sb|>
          <sb.Dropdown @anchor={{false}} as |dd|>
            <div
              class="test-anchor"
              style={{htmlSafe (concat "anchor-name: " dd.anchorName)}}
            >
              <sb.Trigger />
            </div>
            <div
              class="test-content"
              style={{htmlSafe (concat "position-anchor: " dd.anchorName)}}
            >
              <sb.Content>
                <sb.Options />
              </sb.Content>
            </div>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box .dropdown__trigger').doesNotHaveAttribute('style');
    assert.dom('.select-box .dropdown__content').doesNotHaveAttribute('style');

    const [, id] = find('.test-anchor')
      .getAttribute('style')
      .match(/anchor-name: (--[a-zA-Z0-9]+)/);

    assert.dom('.test-content').hasAttribute('style', `position-anchor: ${id}`);
  });
});
