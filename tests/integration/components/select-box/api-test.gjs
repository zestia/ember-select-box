import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  find,
  render,
  rerender,
  fillIn,
  settled,
  click
} from '@ember/test-helpers';
import { defer } from 'rsvp';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (api)', function (hooks) {
  setupRenderingTest(hooks);

  test('api', async function (assert) {
    assert.expect(18);

    let api;
    let api2;

    const handleReady = (sb) => (api = sb);
    const capture = (sb) => (api2 = sb);

    await render(<template>
      <SelectBox @onReady={{handleReady}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          {{capture sb}}
        </sb.Options>
      </SelectBox>
    </template>);

    assert.strictEqual(api, api2);

    // Components
    assert.strictEqual(typeof api.Group, 'object');
    assert.strictEqual(typeof api.Input, 'object');
    assert.strictEqual(typeof api.Option, 'object');
    assert.strictEqual(typeof api.Options, 'object');
    assert.strictEqual(typeof api.Trigger, 'object');

    // Properties
    assert.deepEqual(api.element, find('.select-box'));
    assert.strictEqual(api.isBusy, null);
    assert.false(api.isOpen);
    assert.strictEqual(api.options, undefined);
    assert.strictEqual(api.query, null);
    assert.strictEqual(api.value, undefined);

    // Actions
    assert.strictEqual(typeof api.close, 'function');
    assert.strictEqual(typeof api.open, 'function');
    assert.strictEqual(typeof api.search, 'function');
    assert.strictEqual(typeof api.toggle, 'function');
    assert.strictEqual(typeof api.update, 'function');
    assert.strictEqual(typeof api.select, 'function');
  });

  test('provides access to two useful elements', async function (assert) {
    assert.expect(1);

    let api;

    const handleReady = (sb) => (api = sb);

    await render(<template>
      <SelectBox @onReady={{handleReady}} as |sb|>
        <sb.Options />
      </SelectBox>
    </template>);

    assert.strictEqual(api.element, find('.select-box'));
  });

  test('isBusy (searchable)', async function (assert) {
    assert.expect(3);

    let api;

    const deferred = defer();

    const handleReady = (sb) => (api = sb);
    const handleSearch = () => deferred.promise;

    await render(<template>
      <SelectBox @onReady={{handleReady}} @onSearch={{handleSearch}} as |sb|>
        <sb.Options>
          <sb.Input />
        </sb.Options>
      </SelectBox>
    </template>);

    assert.false(api.isBusy);

    await fillIn('.select-box__input', 'x');

    assert.true(api.isBusy);

    deferred.resolve();

    await settled();

    assert.false(api.isBusy);
  });

  test('isBusy (not searchable)', async function (assert) {
    assert.expect(1);

    let api;

    const handleReady = (sb) => (api = sb);

    await render(<template>
      <SelectBox @onReady={{handleReady}} as |sb|>
        <sb.Options />
      </SelectBox>
    </template>);

    assert.strictEqual(api.isBusy, null, 'behaviour undefined');
  });

  test('isOpen', async function (assert) {
    assert.expect(2);

    let api;

    const handleReady = (sb) => (api = sb);

    await render(<template>
      <SelectBox @onReady={{handleReady}} as |sb|>
        <sb.Trigger />
      </SelectBox>
    </template>);

    assert.false(api.isOpen);

    await click('.select-box__trigger');

    assert.true(api.isOpen);
  });

  test('value', async function (assert) {
    assert.expect(3);

    const state = new (class {
      @tracked value = 'foo';
    })();

    await render(<template>
      <SelectBox @value={{state.value}} as |sb|>
        {{sb.value}}

        <sb.Options>
          <sb.Option @value="bar" />
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box').hasText('foo');

    await click('.select-box__option');

    assert.dom('.select-box').hasText('bar');

    state.value = 'baz';

    await rerender();

    assert.dom('.select-box').hasText('baz');
  });

  test('search', async function (assert) {
    assert.expect(2);

    const handleSearch = (foo) => assert.step(foo);

    await render(<template>
      <SelectBox @onSearch={{handleSearch}} as |sb|>
        <button type="button" {{on "click" (fn sb.search "foo")}}></button>

        <sb.Options />
      </SelectBox>
    </template>);

    await click('button');

    assert.verifySteps(['foo']);
  });

  test('open', async function (assert) {
    assert.expect(3);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Input />
        <sb.Trigger />
        <button type="button" {{on "click" sb.open}}></button>
      </SelectBox>
    </template>);

    await click('button');

    assert.dom('.select-box').hasAttribute('data-open', 'true');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'true');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'true');
  });

  test('close', async function (assert) {
    assert.expect(3);

    await render(<template>
      <SelectBox @open={{true}} as |sb|>
        <sb.Input />
        <sb.Trigger />
        <button type="button" {{on "click" sb.close}}></button>
      </SelectBox>
    </template>);

    await click('button');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
  });

  test('toggle', async function (assert) {
    assert.expect(6);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Input />
        <sb.Trigger />
        <button type="button" {{on "click" sb.toggle}}></button>
      </SelectBox>
    </template>);

    await click('button');

    assert.dom('.select-box').hasAttribute('data-open', 'true');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'true');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'true');

    await click('button');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
  });

  test('select', async function (assert) {
    assert.expect(8);

    let api;

    const state = new (class {
      value = '1';
    })();

    const handleReady = (sb) => (api = sb);
    const handleChange = (value) => assert.step(`change: ${value}`);
    const handleSelect = () => assert.step('select');

    const handleBuildSelection = (value) => {
      assert.step('build selection');
      return value;
    };

    await render(<template>
      <SelectBox
        @value={{state.value}}
        @onReady={{handleReady}}
        @onChange={{handleChange}}
        @onSelect={{handleSelect}}
        @onBuildSelection={{handleBuildSelection}}
        as |sb|
      >
        <button type="button" {{on "click" (fn sb.select "2")}}></button>
        <sb.Options>
          <sb.Option @value="1" />
          <sb.Option @value="2" />
        </sb.Options>
      </SelectBox>
    </template>);

    await click('button');
    await click('button');

    assert.strictEqual(state.value, '1', 'does not mutate value');
    assert.strictEqual(api.value, '2', 'api is correct');

    assert.verifySteps(
      ['change: 2', 'select', 'select'],
      `fires actions. note that buildSelection is not called,
       this provides greater flexibility when calling sb.select.`
    );

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-selected', 'false');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'true');
  });

  test('select (not focused)', async function (assert) {
    assert.expect(4);

    const state = new (class {
      @tracked api;
    })();

    const handleReady = (sb) => (state.api = sb);

    await render(<template>
      <SelectBox @onReady={{handleReady}} as |sb|>
        <sb.Input />
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value="1" />
          <sb.Option @value="2" />
        </sb.Options>
      </SelectBox>

      <button type="button" {{on "click" (fn state.api.select "2")}}></button>
    </template>);

    await click('button');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'true', 'precondition');

    assert.dom('.select-box__input').isNotFocused();
    assert.dom('.select-box__trigger').isNotFocused();
    assert.dom('.select-box__options').isNotFocused();
  });

  test('select (closes)', async function (assert) {
    assert.expect(1);

    const state = new (class {
      @tracked api;
    })();

    const handleReady = (sb) => (state.api = sb);

    await render(<template>
      <SelectBox @open={{true}} @onReady={{handleReady}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value="1" />
          <sb.Option @value="2" />
        </sb.Options>
      </SelectBox>

      <button type="button" {{on "click" (fn state.api.select "2")}}></button>
    </template>);

    await click('button');

    assert
      .dom('.select-box')
      .hasAttribute(
        'data-open',
        'false',
        'closes as if the user had made the selection'
      );
  });

  test('select (disabled option)', async function (assert) {
    assert.expect(2);

    const state = new (class {
      @tracked api;
    })();

    const handleReady = (sb) => (state.api = sb);

    await render(<template>
      <SelectBox @onReady={{handleReady}} as |sb|>
        <sb.Input />
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value="foo" @disabled={{true}} />
        </sb.Options>
      </SelectBox>

      <button type="button" {{on "click" (fn state.api.select "foo")}}></button>
    </template>);

    await click('button');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-selected', 'true')
      .hasAttribute(
        'aria-disabled',
        'true',
        `can still select a disabled option by value
         (native select boxes can have disabled options that are selected)`
      );
  });

  test('update', async function (assert) {
    assert.expect(5);

    let api;

    const state = new (class {
      value = '1';
    })();

    const handleReady = (sb) => (api = sb);
    const handleChange = (value) => assert.step(`change: ${value}`);
    const handleSelect = () => assert.step('select');

    const handleBuildSelection = (value) => {
      assert.step('build selection');
      return value;
    };

    await render(<template>
      <SelectBox
        @value={{state.value}}
        @onReady={{handleReady}}
        @onChange={{handleChange}}
        @onSelect={{handleSelect}}
        @onBuildSelection={{handleBuildSelection}}
        as |sb|
      >
        <button type="button" {{on "click" (fn sb.update "2")}}></button>
        <sb.Options>
          <sb.Option @value="1" />
          <sb.Option @value="2" />
        </sb.Options>
      </SelectBox>
    </template>);

    await click('button');
    await click('button');

    assert.strictEqual(state.value, '1', 'does not mutate value');
    assert.strictEqual(api.value, '2', 'api is correct');
    assert.verifySteps([], 'does not fires actions');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-selected', 'false');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'true');
  });

  test('api stability', async function (assert) {
    assert.expect(1);

    const update = (sb) => {
      sb.update(1);
      assert.strictEqual(sb.value, 1, 'sb is a stable reference');
    };

    await render(<template>
      <SelectBox as |sb|>
        <button type="button" {{on "click" (fn update sb)}}></button>
        <sb.Options />
      </SelectBox>
    </template>);

    await click('button');
  });

  test('open boolean with a trigger defaults to closed', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Options data-open="{{sb.isOpen}}" />
      </SelectBox>
    </template>);

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__options').hasAttribute('data-open', 'false');
  });

  test('open boolean without a trigger is undefined', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options data-open="{{sb.isOpen}}" />
      </SelectBox>
    </template>);

    assert.dom('.select-box').doesNotHaveAttribute('data-open');
    assert.dom('.select-box__options').doesNotHaveAttribute('data-open');
  });
});
