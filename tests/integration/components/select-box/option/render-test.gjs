import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { find, render, rerender } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box/option', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__option').hasTagName('div');
    assert.dom('.select-box__option').doesNotHaveAttribute('tabindex');
  });

  test('whitespace', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    assert.strictEqual(find('.select-box__option').innerHTML, '');
  });

  test('role', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__option').hasAttribute('role', 'option');
  });

  test('id', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option as |option|>
            <input type="checkbox" aria-labelledby={{option.id}} />
          </sb.Option>
        </sb.Options>
      </SelectBox>
    </template>);

    assert.ok(
      find('.select-box__option')
        .getAttribute('id')
        .match(/[\w\d]+/)
    );

    assert
      .dom('input[type="checkbox"]')
      .hasAttribute(
        'aria-labelledby',
        find('.select-box__option').getAttribute('id'),
        "can utilise the option's id"
      );
  });

  test('class (closure component)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          {{component sb.Option class="foo"}}
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__option').hasClass('foo');
  });

  test('tabindex (closure component)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          {{component sb.Option tabindex="3"}}
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__option').hasAttribute('tabindex', '3');
  });

  test('disabled', async function (assert) {
    assert.expect(2);

    const state = new (class {
      @tracked disableOne;
    })();

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option @disabled={{state.disableOne}} />
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__option').doesNotHaveAttribute('aria-disabled');

    state.disableOne = true;

    await rerender();

    assert.dom('.select-box__option').hasAttribute('aria-disabled', 'true');
  });

  test('disabled parent', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox @disabled={{true}} as |sb|>
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__option').hasAttribute('aria-disabled', 'true');
  });
});
