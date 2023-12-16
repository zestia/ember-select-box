import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, rerender, click } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (value)', function (hooks) {
  setupRenderingTest(hooks);

  test('undefined', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox @value={{undefined}} as |sb|>
        <sb.Options>
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .exists({ count: 2 }, 'undefined === undefined');
  });

  test('null', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox @value={{null}} as |sb|>
        <sb.Options>
          <sb.Option />
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__option[aria-selected="true"]').doesNotExist();
  });

  test('unknown', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox @value="foo" as |sb|>
        <sb.Trigger>
          {{sb.value}}
        </sb.Trigger>
        <sb.Options />
      </SelectBox>
    </template>);

    assert
      .dom('.select-box__trigger')
      .hasText(
        'foo',
        "not a valid option, but that's still the value of the select box"
      );
  });

  test('non-primitive values', async function (assert) {
    assert.expect(2);

    const foo = {};
    const bar = {};
    const baz = {};

    const value = bar;

    await render(<template>
      <SelectBox @value={{value}} as |sb|>
        <sb.Options>
          <sb.Option @value={{foo}} />
          <sb.Option @value={{bar}} />
          <sb.Option @value={{baz}} />
        </sb.Options>
      </SelectBox>
    </template>);

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .exists({ count: 1 });

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'true');
  });

  test('promise values not supported', async function (assert) {
    assert.expect(2);

    const promiseForFoo = Promise.resolve('foo');

    await render(<template>
      <SelectBox @value="foo" as |sb|>
        <sb.Options>
          <sb.Option @value="foo" />
          <sb.Option @value={{promiseForFoo}} />
        </sb.Options>
      </SelectBox>
    </template>);

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-selected', 'true');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'false');
  });

  test('setting value data flow', async function (assert) {
    assert.expect(5);

    const state = new (class {
      value = 'a';
    })();

    const handleChange = (value) => {
      assert.step(value);
    };

    await render(<template>
      <SelectBox @value={{state.value}} @onChange={{handleChange}} as |sb|>
        <sb.Options>
          <sb.Option @value="a" />
          <sb.Option @value="b" />
        </sb.Options>
      </SelectBox>
    </template>);

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-selected', 'true');

    await click('.select-box__option:nth-child(2)');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'true');

    assert.strictEqual(state.value, 'a', 'does not mutate');

    assert.verifySteps(['b']);
  });

  test('multiple (string value)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox @value="b" @multiple={{true}} as |sb|>
        <sb.Options>
          <sb.Option @value="a" />
          <sb.Option @value="b" />
          <sb.Option @value="c" />
        </sb.Options>
      </SelectBox>
    </template>);

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'true', 'coerced to an array');
  });

  test('multiple (null value)', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox @value={{null}} @multiple={{true}} as |sb|>
        <sb.Options>
          <sb.Option @value="a" />
          <sb.Option @value="b" />
          <sb.Option @value="c" />
        </sb.Options>
      </SelectBox>
    </template>);

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .doesNotExist('does not blow up');
  });

  test('multiple (array reference)', async function (assert) {
    assert.expect(1);

    let api;

    const handleReady = (sb) => (api = sb);

    const array = ['b', 'c'];

    await render(<template>
      <SelectBox
        @value={{array}}
        @multiple={{true}}
        @onReady={{handleReady}}
        as |sb|
      >
        <sb.Options>
          <sb.Option @value="a" />
          <sb.Option @value="b" />
          <sb.Option @value="c" />
        </sb.Options>
      </SelectBox>
    </template>);

    assert.strictEqual(
      api.value,
      array,
      'does not manage a copy of the array internally.'
    );
  });

  test('changing value', async function (assert) {
    assert.expect(2);

    const state = new (class {
      @tracked value;
    })();

    const handleChange = (value) => assert.step(value);

    await render(<template>
      <SelectBox @value={{state.value}} @onChange={{handleChange}} as |sb|>
        <sb.Options>
          <sb.Option @value="a" />
          <sb.Option @value="b" />
        </sb.Options>
      </SelectBox>
    </template>);

    assert.verifySteps([]);

    state.value = 'a';

    await rerender();

    state.value = 'a';

    await rerender();

    state.value = 'b';

    await rerender();

    assert.verifySteps([]);
  });

  test('selected option, but disabled', async function (assert) {
    assert.expect(5);

    const state = new (class {
      @tracked value;
    })();

    const handleChange = (value) => assert.step(value);

    await render(<template>
      <SelectBox @value={{state.value}} @onChange={{handleChange}} as |sb|>
        <sb.Options>
          <sb.Option @value="a" @disabled={{true}} />
        </sb.Options>
      </SelectBox>
    </template>);

    assert
      .dom('.select-box__option')
      .doesNotHaveAttribute('aria-current')
      .hasAttribute('aria-selected', 'false');

    state.value = 'a';

    await rerender();

    assert
      .dom('.select-box__option')
      .doesNotHaveAttribute('aria-current')
      .hasAttribute(
        'aria-selected',
        'true',
        `like a native select box, you can style a disabled option
         which is also selected (via the aria attrs)`
      );

    assert.verifySteps([]);
  });
});
