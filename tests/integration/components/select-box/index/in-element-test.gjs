import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { click, render, find, fillIn, findAll } from '@ember/test-helpers';
import { array } from '@ember/helper';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (in-element)', function (hooks) {
  setupRenderingTest(hooks);

  const destination = () => find('.destination');

  test('a common scenario of rendering a dropdown in an external element works', async function (assert) {
    assert.expect(7);

    await render(<template>
      {{! template-lint-disable no-unnecessary-curly-strings }}
      <SelectBox @options={{array "foo" "bar" "baz"}} as |sb|>
        <sb.Dropdown>
          <sb.Input />
          <sb.Trigger>
            {{sb.value}}
          </sb.Trigger>
          <sb.Content @destination={{(destination)}}>
            <sb.Options>
              {{#each sb.options as |value|}}
                <sb.Option @value={{value}} as |option|>
                  {{option.index}}
                  {{~" "~}}
                  {{value}}
                </sb.Option>
              {{/each}}
            </sb.Options>
            <div class="wrapper">
              <sb.Option @value={{null}} as |option|>
                {{option.index}}
                {{~" "~}}
                qux
              </sb.Option>
              <sb.Option @value={{null}} as |option|>
                {{option.index}}
                {{~" "~}}
                norf
              </sb.Option>
            </div>
          </sb.Content>
        </sb.Dropdown>
      </SelectBox>

      <div class="destination"></div>

      <button class="outside" type="button"></button>
    </template>);

    // Dropdown behaviour...

    await click('.select-box .dropdown__trigger');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'true');
    assert.dom('.select-box .select-box__options').doesNotExist();
    assert.dom('.destination .select-box__options').exists();

    await click('.select-box__option:nth-child(2)');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');
    assert.dom('.select-box .dropdown__trigger').hasText('bar');

    await click('.outside');

    assert.dom('.outside').isFocused();

    // Searching...

    await click('.select-box .dropdown__trigger');
    await fillIn('.select-box__input', 'b');

    assert.deepEqual(
      findAll('.select-box__option').map((el) => el.textContent.trim()),
      ['0 bar', '1 baz', '2 qux', '3 norf'],
      'computes correct index when options elements are not direct children'
    );
  });
});
