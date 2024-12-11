import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import {
  find,
  render,
  rerender,
  fillIn,
  settled,
  click
} from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (api)', function (hooks) {
  setupRenderingTest(hooks);

  test('api', async function (assert) {
    assert.expect(17);

    let api;
    let api2;

    const handleReady = (sb) => (api = sb);
    const capture = (sb) => (api2 = sb);

    await render(<template>
      <SelectBox @onReady={{handleReady}} as |sb|>
        <sb.Dropdown>
          <sb.Trigger />
          <sb.Content>
            <sb.Options>
              {{capture sb}}
            </sb.Options>
          </sb.Content>
        </sb.Dropdown>
      </SelectBox>
    </template>);

    assert.strictEqual(api, api2);

    // Components
    assert.strictEqual(typeof api.Group, 'object');
    assert.strictEqual(typeof api.Input, 'object');
    assert.strictEqual(typeof api.Option, 'object');
    assert.strictEqual(typeof api.Options, 'object');
    assert.strictEqual(typeof api.Dropdown, 'object');
    assert.strictEqual(typeof api.Trigger, 'object');
    assert.strictEqual(typeof api.Content, 'object');

    // Properties
    assert.deepEqual(api.element, find('.select-box'));
    assert.strictEqual(api.isBusy, null);
    assert.strictEqual(api.options, undefined);
    assert.strictEqual(api.query, null);
    assert.strictEqual(api.value, undefined);
    assert.strictEqual(typeof api.dropdown, 'object');

    // Actions
    assert.strictEqual(typeof api.search, 'function');
    assert.strictEqual(typeof api.update, 'function');
    assert.strictEqual(typeof api.select, 'function');
  });

  test('api without dropdown', async function (assert) {
    assert.expect(2);

    let api;

    const handleReady = (sb) => (api = sb);

    await render(<template><SelectBox @onReady={{handleReady}} /></template>);

    assert.strictEqual(typeof api.Dropdown, 'object');
    assert.strictEqual(
      api.Trigger,
      undefined,
      `can't render a select box trigger without first
       having rendered a dropdown.`
    );
  });

  test('provides access to the main element', async function (assert) {
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

  test('isBusy (aka searchable)', async function (assert) {
    assert.expect(3);

    let api;

    const deferred = Promise.withResolvers();

    const handleReady = (sb) => (api = sb);
    const handleSearch = () => deferred.promise;

    await render(<template>
      <SelectBox @onReady={{handleReady}} @onSearch={{handleSearch}} as |sb|>
        <sb.Input />
        <sb.Options />
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
        <sb.Dropdown>
          <sb.Trigger />
        </sb.Dropdown>
      </SelectBox>
    </template>);

    assert.false(api.dropdown.isOpen);

    await click('.select-box .dropdown__trigger');

    assert.true(api.dropdown.isOpen);
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

    await settled();

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

    let api;

    const handleReady = (sb) => (api = sb);

    await render(<template>
      <SelectBox @onReady={{handleReady}} as |sb|>
        <sb.Dropdown>
          <sb.Input />
          <sb.Trigger />
          <sb.Content>
            <sb.Options>
              <sb.Option @value="1" />
              <sb.Option @value="2" />
            </sb.Options>
          </sb.Content>
        </sb.Dropdown>
      </SelectBox>
    </template>);

    api.select('2');

    await rerender();

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'true');

    assert.dom('.select-box__input').isNotFocused();
    assert.dom('.select-box .dropdown__trigger').isNotFocused();
    assert.dom('.select-box__options').isNotFocused();
  });

  test('select (closes)', async function (assert) {
    assert.expect(2);

    let api;

    const handleReady = (sb) => (api = sb);

    await render(<template>
      <SelectBox @onReady={{handleReady}} as |sb|>
        <sb.Dropdown>
          <sb.Trigger />
          <sb.Content>
            <sb.Options>
              <sb.Option @value="1" />
              <sb.Option @value="2" />
            </sb.Options>
          </sb.Content>
        </sb.Dropdown>
      </SelectBox>
    </template>);

    await click('.dropdown__trigger');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'true');

    api.select('2');

    await rerender();

    assert
      .dom('.select-box .dropdown')
      .hasAttribute(
        'data-open',
        'false',
        'closes as if the user had made the selection'
      );
  });

  test('select (disabled option)', async function (assert) {
    assert.expect(2);

    let api;

    const handleReady = (sb) => (api = sb);

    await render(<template>
      <SelectBox @onReady={{handleReady}} as |sb|>
        <sb.Options>
          <sb.Option @value="foo" @disabled={{true}} />
        </sb.Options>
      </SelectBox>
    </template>);

    api.select('foo');

    await rerender();

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
    assert.expect(7);

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
        <sb.Options>
          <sb.Option @value="1" />
          <sb.Option @value="2" />
        </sb.Options>
      </SelectBox>
    </template>);

    api.update('2');
    api.update('2');

    await rerender();

    assert.strictEqual(state.value, '1', 'does not mutate value');
    assert.strictEqual(api.value, '2', 'api is correct');
    assert.verifySteps([], 'does not fires actions');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'false')
      .hasAttribute('aria-selected', 'false');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true')
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
});
