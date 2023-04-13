import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { resolve } from 'rsvp';
import hbs from 'htmlbars-inline-precompile';

module('select-box (value)', function (hooks) {
  setupRenderingTest(hooks);

  test('undefined', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox
        @value={{this.value}}
        @onChange={{this.handleChange}}
        as |sb|
      >
        <sb.Options>
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .exists({ count: 2 }, 'undefined === undefined');
  });

  test('null', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox
        @value={{null}}
        @onChange={{this.handleChange}}
        as |sb|
      >
        <sb.Options>
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.select-box__option[aria-selected="true"]').doesNotExist();
  });

  test('unknown', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox
        @value="foo"
        @onChange={{this.handleChange}}
        as |sb|
      >
        <sb.Trigger>
          {{sb.value}}
        </sb.Trigger>
        <sb.Options />
      </SelectBox>
    `);

    assert
      .dom('.select-box__trigger')
      .hasText(
        'foo',
        "not a valid option, but that's still the value of the select box"
      );
  });

  test('non-primitive values', async function (assert) {
    assert.expect(2);

    this.foo = {};
    this.bar = {};
    this.baz = {};

    this.value = this.bar;

    await render(hbs`
      <SelectBox @value={{this.value}} as |sb|>
        <sb.Options>
          <sb.Option @value={{this.foo}} />
          <sb.Option @value={{this.bar}} />
          <sb.Option @value={{this.baz}} />
        </sb.Options>
      </SelectBox>
    `);

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .exists({ count: 1 });

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'true');
  });

  test('promise values not supported', async function (assert) {
    assert.expect(2);

    this.promiseForFoo = resolve('foo');

    await render(hbs`
      <SelectBox @value="foo" as |sb|>
        <sb.Options>
          <sb.Option @value="foo" />
          <sb.Option @value={{this.promiseForFoo}} />
        </sb.Options>
      </SelectBox>
    `);

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-selected', 'true');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'false');
  });

  test('setting value data flow', async function (assert) {
    assert.expect(4);

    this.value = 'a';

    this.handleChange = (value) => {
      this.set('value', value);
      assert.step(value);
    };

    await render(hbs`
      <SelectBox
        @value={{this.value}}
        @onChange={{this.handleChange}}
        as |sb|
      >
        <sb.Options>
          <sb.Option @value="a" />
          <sb.Option @value="b" />
        </sb.Options>
      </SelectBox>
    `);

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-selected', 'true');

    await click('.select-box__option:nth-child(2)');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'true');

    assert.verifySteps(['b']);
  });

  test('multiple (string value)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox
        @value="b"
        @multiple={{true}}
        as |sb|
      >
        <sb.Options>
          <sb.Option @value="a" />
          <sb.Option @value="b" />
          <sb.Option @value="c" />
        </sb.Options>
      </SelectBox>
    `);

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'true', 'coerced to an array');
  });

  test('multiple (null value)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox
        @value={{null}}
        @multiple={{true}}
        as |sb|
      >
        <sb.Options>
          <sb.Option @value="a" />
          <sb.Option @value="b" />
          <sb.Option @value="c" />
        </sb.Options>
      </SelectBox>
    `);

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .doesNotExist('does not blow up');
  });

  test('multiple (array reference)', async function (assert) {
    assert.expect(1);

    this.handleReady = (sb) => (this.api = sb);

    this.array = ['b', 'c'];

    await render(hbs`
      <SelectBox
        @value={{this.array}}
        @multiple={{true}}
        @onReady={{this.handleReady}}
        as |sb|
      >
        <sb.Options>
          <sb.Option @value="a" />
          <sb.Option @value="b" />
          <sb.Option @value="c" />
        </sb.Options>
      </SelectBox>
    `);

    assert.strictEqual(
      this.api.value,
      this.array,
      'does not manage a copy of the array internally.'
    );
  });

  test('changing value', async function (assert) {
    assert.expect(2);

    this.handleChange = (value) => assert.step(value);

    await render(hbs`
      <SelectBox
        @value={{this.value}}
        @onChange={{this.handleChange}}
        as |sb|
      >
        <sb.Options>
          <sb.Option @value="a" />
          <sb.Option @value="b" />
        </sb.Options>
      </SelectBox>
    `);

    assert.verifySteps([]);

    this.set('value', 'a');
    this.set('value', 'a');
    this.set('value', 'b');

    assert.verifySteps([]);
  });

  test('selected option, but disabled', async function (assert) {
    assert.expect(5);

    this.handleChange = (value) => assert.step(value);

    await render(hbs`
      <SelectBox
        @value={{this.value}}
        @onChange={{this.handleChange}}
        as |sb|
      >
        <sb.Options>
          <sb.Option @value="a" @disabled={{true}} />
        </sb.Options>
      </SelectBox>
    `);

    assert
      .dom('.select-box__option')
      .doesNotHaveAttribute('aria-current')
      .hasAttribute('aria-selected', 'false');

    this.set('value', 'a');

    assert
      .dom('.select-box__option')
      .doesNotHaveAttribute('aria-current')
      .hasAttribute(
        'aria-selected',
        'true',
        `like a native select box, you can style a disabled option
         which is also selected`
      );

    assert.verifySteps([]);
  });
});
