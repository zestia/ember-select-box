import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import {
  find,
  focus,
  render,
  rerender,
  triggerEvent,
  fillIn
} from '@ember/test-helpers';
import wait from 'dummy/utils/wait';
import { tracked } from '@glimmer/tracking';
import { array } from '@ember/helper';
import SelectBox from '@zestia/ember-select-box/components/select-box';

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
    assert.expect(7);

    await render(<template>
      {{! template-lint-disable no-forbidden-elements }}
      <style>
        .select-box__options { height: 1em; overflow: auto; }
        .select-box__option { line-height: 1; }
      </style>

      <SelectBox @options={{array "a1" "b1" "b2"}} as |sb|>
        <sb.Input />
        <sb.Options>
          {{#each sb.options as |value|}}
            <sb.Option @value={{value}}>
              {{value}}
            </sb.Option>
          {{/each}}
        </sb.Options>
      </SelectBox>
    </template>);

    const expectedTop = find('.select-box__option').offsetHeight;

    assert.ok(expectedTop > 0);
    assert.strictEqual(find('.select-box__options').scrollTop, 0);

    await focus('.select-box__input');
    await triggerEvent('.select-box__option:nth-child(3)', 'mouseenter');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true')
      .hasText('b2');

    await fillIn('.select-box__input', 'b');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true')
      .hasText('b2', 'retains active option');

    assert.strictEqual(
      find('.select-box__options').scrollTop,
      expectedTop,
      'the active option stays in view as the results change'
    );
  });

  test('changing available options when searching (after re-render)', async function (assert) {
    assert.expect(4);

    const options = ['a1', 'b1', 'b2'];

    const handleSearch = async () => {
      await wait(100);

      return ['b1', 'b2'];
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
      .hasText('b2');

    await fillIn('.select-box__input', 'B');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true')
      .hasText('b2', 'retains active option');
  });
});
