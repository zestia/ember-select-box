import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { click, render, find } from '@ember/test-helpers';
import Dropdown from '@zestia/ember-select-box/components/dropdown';

module('dropdown (in-element)', function (hooks) {
  setupRenderingTest(hooks);

  const destination = () => find('.destination');

  test('a common scenario of rendering a dropdown in an external element works', async function (assert) {
    assert.expect(6);

    await render(
      <template>
        <Dropdown as |dd|>
          <dd.Trigger>
            Trigger
          </dd.Trigger>
          {{#if dd.isOpen}}
            <dd.Content @destination={{(destination)}}>
              Hello World
              <button type="button" class="test" />
            </dd.Content>
          {{/if}}
        </Dropdown>

        <div class="destination"></div>

        <button class="outside" type="button"></button>
      </template>
    );

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');
    assert.dom('.dropdown .dropdown__content').doesNotExist();
    assert.dom('.destination .dropdown__content').exists();

    await click('.test');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await click('.outside');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.dom('.outside').isFocused();
  });
});
