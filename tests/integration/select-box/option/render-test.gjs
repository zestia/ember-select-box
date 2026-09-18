import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, rerender } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import SelectBox from '#src/components/select-box';

module('select-box/option', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Options>
            <sb.Option />
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box__option').hasTagName('div');
    assert.dom('.select-box__option').doesNotHaveAttribute('tabindex');
  });

  test('whitespace', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Options>
            <sb.Option />
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert.strictEqual(find('.select-box__option').innerHTML, '');
  });

  test('role', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Options>
            <sb.Option />
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box__option').hasAttribute('role', 'option');
  });

  test('id', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Options>
            <sb.Option as |option|>
              <input type="checkbox" aria-labelledby={{option.id}} />
            </sb.Option>
          </sb.Options>
        </SelectBox>
      </template>
    );

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

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Options>
            {{component sb.Option class="foo"}}
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box__option').hasClass('foo');
  });

  test('tabindex (closure component)', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Options>
            {{component sb.Option tabindex="3"}}
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box__option').hasAttribute('tabindex', '3');
  });

  test('disabled (no arg)', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Options>
            <sb.Option />
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box__option').doesNotHaveAttribute('aria-disabled');
  });

  test('disabled', async function (assert) {
    assert.expect(2);

    const state = new (class {
      @tracked disableOne;
    })();

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Options>
            <sb.Option @disabled={{state.disableOne}} />
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box__option').doesNotHaveAttribute('aria-disabled');

    state.disableOne = true;

    await rerender();

    assert.dom('.select-box__option').hasAttribute('aria-disabled', 'true');
  });

  test('disabled (non boolean)', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Options>
            <sb.Option @disabled="foo" />
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box__option').hasAttribute('aria-disabled', 'true');
  });

  test('disabled parent', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox @disabled={{true}} as |sb|>
          <sb.Options>
            <sb.Option />
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box__option').hasAttribute('aria-disabled', 'true');
  });

  test('disabled (explicitly false)', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Options>
            <sb.Option @disabled={{false}} />
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert
      .dom('.select-box__option')
      .hasAttribute(
        'aria-disabled',
        'false',
        'an explicit false is a value, and is not the same as no value'
      );
  });

  test('disabled (explicitly false, disabled parent)', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox @disabled={{true}} as |sb|>
          <sb.Options>
            <sb.Option @disabled={{false}} />
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert
      .dom('.select-box__option')
      .hasAttribute(
        'aria-disabled',
        'true',
        'a disabled select box disables its options regardless'
      );
  });

  test('disabled (null)', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox @disabled={{true}} as |sb|>
          <sb.Options>
            <sb.Option @disabled={{null}} />
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert
      .dom('.select-box__option')
      .hasAttribute(
        'aria-disabled',
        'true',
        'null is not a value, so the disabled parent still applies'
      );
  });

  test('disabled (passed through)', async function (assert) {
    assert.expect(1);

    // An app wrapping the select box. Writing `@disabled=` here must not be
    // mistaken for supplying a value.
    const PassThrough = <template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option @disabled={{@disabled}} />
        </sb.Options>
      </SelectBox>
    </template>;

    await render(<template><PassThrough /></template>);

    assert
      .dom('.select-box__option')
      .doesNotHaveAttribute(
        'aria-disabled',
        'passing an argument through is not the same as supplying it'
      );
  });

  test('disabled parent (passed through)', async function (assert) {
    assert.expect(1);

    const PassThrough = <template>
      <SelectBox @disabled={{true}} as |sb|>
        <sb.Options>
          <sb.Option @disabled={{@disabled}} />
        </sb.Options>
      </SelectBox>
    </template>;

    await render(<template><PassThrough /></template>);

    assert
      .dom('.select-box__option')
      .hasAttribute(
        'aria-disabled',
        'true',
        'option still inherits from the disabled parent'
      );
  });
});
