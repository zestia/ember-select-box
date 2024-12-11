import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { click, render, find } from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (in-element)', function (hooks) {
  setupRenderingTest(hooks);

  const destination = () => find('.destination');

  test('a common scenario of rendering a dropdown in an external element works', async function (assert) {
    assert.expect(6);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Dropdown as |dd|>
          <sb.Trigger>
            {{sb.value}}
          </sb.Trigger>
          {{#if dd.isOpen}}
            {{#in-element (destination) insertBefore=null}}
              <sb.Content>
                <sb.Options>
                  <sb.Option @value="foo" />
                  <sb.Option @value="bar" />
                </sb.Options>
              </sb.Content>
            {{/in-element}}
          {{/if}}
        </sb.Dropdown>
      </SelectBox>

      <div class="destination"></div>

      <button class="outside" type="button"></button>
    </template>);

    await click('.select-box .dropdown__trigger');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'true');
    assert.dom('.select-box .select-box__options').doesNotExist();
    assert.dom('.destination .select-box__options').exists();

    await click('.select-box__option:nth-child(2)');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');
    assert.dom('.select-box .dropdown__trigger').hasText('bar');

    await click('.outside');

    assert.dom('.outside').isFocused();
  });
});
