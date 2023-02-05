import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box/option', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.select-box__option').hasTagName('div');
    assert.dom('.select-box__option').doesNotHaveAttribute('tabindex');
  });

  test('whitespace', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    assert.strictEqual(find('.select-box__option').innerHTML, '');
  });

  test('role', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.select-box__option').hasAttribute('role', 'option');
  });

  test('id', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option as |option|>
            <input type="checkbox" aria-labelledby={{option.id}} />
          </sb.Option>
        </sb.Options>
      </SelectBox>
    `);

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

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          {{component sb.Option class="foo"}}
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.select-box__option').hasClass('foo');
  });

  test('tabindex (closure component)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          {{component sb.Option tabindex="3"}}
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.select-box__option').hasAttribute('tabindex', '3');
  });

  test('disabled', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option @disabled={{this.disableOne}} />
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.select-box__option').doesNotHaveAttribute('aria-disabled');

    this.set('disableOne', true);

    assert.dom('.select-box__option').hasAttribute('aria-disabled', 'true');
  });

  test('disabled parent', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox @disabled={{true}} as |sb|>
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.select-box__option').hasAttribute('aria-disabled', 'true');
  });
});
