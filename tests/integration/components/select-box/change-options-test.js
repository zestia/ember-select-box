import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, focus, render, triggerEvent, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import sleep from 'dummy/utils/sleep';

module('select-box (changing options)', function (hooks) {
  setupRenderingTest(hooks);

  test('changing available options (removing)', async function (assert) {
    assert.expect(2);

    this.showThree = true;

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option />
          <sb.Option />

          {{#if this.showThree}}
            <sb.Option />
          {{/if}}
        </sb.Options>
      </SelectBox>
    `);

    await triggerEvent('.select-box__option:nth-child(3)', 'mouseenter');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'true');

    this.set('showThree', false);

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

    this.showOne = false;

    await render(hbs`
      <SelectBox @value={{1}} as |sb|>
        <sb.Options>
          {{#if this.showOne}}
            <sb.Option />
          {{/if}}

          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');

    this.set('showOne', true);

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

    await render(hbs`
      {{! template-lint-disable no-forbidden-elements }}
      <style>
      .select-box__options {
        height: 1em;
        overflow: auto;
      }
      .select-box__option {
        line-height: 1;
      }
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
    `);

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

    this.options = ['a1', 'b1', 'b2'];

    this.handleSearch = async () => {
      await sleep(100);

      return ['b1', 'b2'];
    };

    await render(hbs`
      <SelectBox
        @options={{this.options}}
        @onSearch={{this.handleSearch}}
        as |sb|
      >
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
    `);

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
