import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import {
  find,
  focus,
  render,
  rerender,
  triggerEvent,
  triggerKeyEvent,
  fillIn
} from '@ember/test-helpers';
import wait from 'dummy/utils/wait';
import { tracked } from '@glimmer/tracking';
import SelectBox from '@zestia/ember-select-box/components/select-box';
import { array } from '@ember/helper';

module('select-box (changing options)', function (hooks) {
  setupRenderingTest(hooks);

  test('changing available options (removing)', async function (assert) {
    assert.expect(2);

    const state = new (class {
      @tracked showThree = true;
    })();

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option />
          <sb.Option />

          {{#if state.showThree}}
            <sb.Option />
          {{/if}}
        </sb.Options>
      </SelectBox>
    </template>);

    await triggerEvent('.select-box__option:nth-child(3)', 'mouseenter');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');

    state.showThree = false;

    await rerender();

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute(
        'aria-current',
        'true',
        'active option was lost, so default chosen'
      );
  });

  test('changing available options recomputes active index (adding)', async function (assert) {
    assert.expect(2);

    const state = new (class {
      @tracked showOne = false;
    })();

    await render(<template>
      <SelectBox @value={{1}} as |sb|>
        <sb.Options>
          {{#if state.showOne}}
            <sb.Option />
          {{/if}}

          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    state.showOne = true;

    await rerender();

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute(
        'aria-current',
        'true',
        'originally activated option is still active'
      );
  });

  test('changing available options when searching', async function (assert) {
    assert.expect(10);

    await render(<template>
      {{! template-lint-disable no-forbidden-elements }}
      <style>
        .select-box__options { height: 1em; overflow: auto; }
        .select-box__option { line-height: 1em }
      </style>

      <SelectBox @options={{array "foo" "bar" "baz"}} as |sb|>
        <sb.Options>
          {{#each sb.options as |value|}}
            <sb.Option @value={{value}}>
              {{value}}
            </sb.Option>
          {{/each}}
        </sb.Options>
        <sb.Input />
      </SelectBox>
    </template>);

    await focus('.select-box__input');
    await triggerKeyEvent(
      '.select-box__option:nth-child(3)',
      'keydown',
      'ArrowUp'
    );
    assert.dom('.select-box__option').exists({ count: 3 });
    assert.ok(find('.select-box__options').scrollTop > 0);

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasText('baz')
      .hasAttribute('aria-current', 'true');

    await fillIn('.select-box__input', 'b');

    const expectedTop = find('.select-box__option:nth-child(2)').offsetTop;

    assert.dom('.select-box__option').exists({ count: 2 });

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasText('bar')
      .hasAttribute(
        'aria-current',
        'false',
        `we do not assume that the first option should be active, just
         because its the closest match for the query. because that assumes
         the input is rendered above the options. but if the input is rendered
         below the options then the first option is actually the last option.
         so we leave it up to the user to choose by pressing up/down.`
      );

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasText('baz')
      .hasAttribute(
        'aria-current',
        'true',
        'retains current option after search'
      );

    assert.strictEqual(
      find('.select-box__options').scrollTop,
      expectedTop,
      'the active option stays in view as the results change'
    );
  });

  test('changing available options (after re-render)', async function (assert) {
    assert.expect(3);

    const options = ['a', 'b', 'c'];

    const handleSearch = async () => {
      await wait(100);

      return options;
    };

    await render(<template>
      <SelectBox @options={{options}} @onSearch={{handleSearch}} as |sb|>
        <sb.Input />
        <sb.Options>
          {{#if sb.isBusy}}
            <sb.Option @disabled={{true}}>
              Please wait...
            </sb.Option>
          {{else}}
            {{#each sb.options as |value|}}
              <sb.Option @value={{value}}>
                {{value}}
              </sb.Option>
            {{/each}}
          {{/if}}
        </sb.Options>
      </SelectBox>
    </template>);

    await focus('.select-box__input');
    await triggerEvent('.select-box__option:nth-child(3)', 'mouseenter');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true')
      .hasText('c');

    await fillIn('.select-box__input', 'b');

    assert
      .dom('.select-box__option[aria-current="true"]')
      .doesNotExist('blown away');
  });

  test('changing available options (stable internals)', async function (assert) {
    assert.expect(5);

    const options = ['foo', 'bar', 'baz'];

    await render(<template>
      <SelectBox @options={{options}} as |sb|>
        <sb.Input />
        <sb.Options>
          {{#each sb.options as |value|}}
            <sb.Option @value={{value}} as |option|>
              {{value}}
              -
              {{option.index}}
            </sb.Option>
          {{/each}}
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__option:nth-child(1)').hasText('foo - 0');
    assert.dom('.select-box__option:nth-child(2)').hasText('bar - 1');
    assert.dom('.select-box__option:nth-child(3)').hasText('baz - 2');

    await fillIn('.select-box__input', 'b');

    assert.dom('.select-box__option:nth-child(1)').hasText('bar - 0');
    assert.dom('.select-box__option:nth-child(2)').hasText('baz - 1');
  });
});
