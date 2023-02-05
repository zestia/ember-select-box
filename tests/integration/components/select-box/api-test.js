import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, fillIn, settled, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';

module('select-box (api)', function (hooks) {
  setupRenderingTest(hooks);

  test('api', async function (assert) {
    assert.expect(18);

    this.handleReady = (sb) => (this.api = sb);
    this.capture = (o) => (this.api2 = o);

    await render(hbs`
      <SelectBox @onReady={{this.handleReady}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          {{this.capture sb}}
        </sb.Options>
      </SelectBox>
    `);

    assert.strictEqual(this.api, this.api2);

    // Components
    assert.strictEqual(typeof this.api.Group, 'object');
    assert.strictEqual(typeof this.api.Input, 'object');
    assert.strictEqual(typeof this.api.Option, 'object');
    assert.strictEqual(typeof this.api.Options, 'object');
    assert.strictEqual(typeof this.api.Trigger, 'object');

    // Properties
    assert.deepEqual(this.api.element, find('.select-box'));
    assert.strictEqual(this.api.isBusy, null);
    assert.false(this.api.isOpen);
    assert.strictEqual(this.api.options, undefined);
    assert.strictEqual(this.api.query, null);
    assert.strictEqual(this.api.value, undefined);

    // Actions
    assert.strictEqual(typeof this.api.close, 'function');
    assert.strictEqual(typeof this.api.open, 'function');
    assert.strictEqual(typeof this.api.search, 'function');
    assert.strictEqual(typeof this.api.toggle, 'function');
    assert.strictEqual(typeof this.api.update, 'function');
    assert.strictEqual(typeof this.api.select, 'function');
  });

  test('provides access to two useful elements', async function (assert) {
    assert.expect(1);

    this.handleReady = (sb) => (this.api = sb);

    await render(hbs`
      <SelectBox @onReady={{this.handleReady}} as |sb|>
        <sb.Options />
      </SelectBox>
    `);

    assert.strictEqual(this.api.element, find('.select-box'));
  });

  test('isBusy (searchable)', async function (assert) {
    assert.expect(3);

    this.deferred = defer();

    this.handleReady = (sb) => (this.api = sb);
    this.handleSearch = () => this.deferred.promise;

    await render(hbs`
      <SelectBox
        @onReady={{this.handleReady}}
        @onSearch={{this.handleSearch}}
        as |sb|
      >
        <sb.Options>
          <sb.Input />
        </sb.Options>
      </SelectBox>
    `);

    assert.false(this.api.isBusy);

    await fillIn('.select-box__input', 'x');

    assert.true(this.api.isBusy);

    this.deferred.resolve();

    await settled();

    assert.false(this.api.isBusy);
  });

  test('isBusy (not searchable)', async function (assert) {
    assert.expect(1);

    this.handleReady = (sb) => (this.api = sb);

    await render(hbs`
      <SelectBox @onReady={{this.handleReady}} as |sb|>
        <sb.Options />
      </SelectBox>
    `);

    assert.strictEqual(this.api.isBusy, null, 'behaviour undefined');
  });

  test('isOpen', async function (assert) {
    assert.expect(2);

    this.handleReady = (sb) => (this.api = sb);

    await render(hbs`
      <SelectBox @onReady={{this.handleReady}} as |sb|>
        <sb.Trigger />
      </SelectBox>
    `);

    assert.false(this.api.isOpen);

    await click('.select-box__trigger');

    assert.true(this.api.isOpen);
  });

  test('value', async function (assert) {
    assert.expect(3);

    this.value = 'foo';

    await render(hbs`
      <SelectBox @value={{this.value}} as |sb|>
        {{sb.value}}

        <sb.Options>
          <sb.Option @value="bar" />
        </sb.Options>
      </SelectBox>
    `);

    assert.dom(this.element).hasText('foo');

    await click('.select-box__option');

    assert.dom(this.element).hasText('bar');

    this.set('value', 'baz');

    assert.dom(this.element).hasText('baz');
  });

  test('search', async function (assert) {
    assert.expect(2);

    this.handleSearch = (foo) => assert.step(foo);

    await render(hbs`
      <SelectBox @onSearch={{this.handleSearch}} as |sb|>
        <button
          type="button"
          {{on "click" (fn sb.search "foo")}}
        ></button>

        <sb.Options />
      </SelectBox>
    `);

    await click('button');

    assert.verifySteps(['foo']);
  });

  test('open', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Input />
        <sb.Trigger />
        <button
          type="button"
          {{on "click" sb.open}}
        ></button>
      </SelectBox>
    `);

    await click('button');

    assert.dom('.select-box').hasAttribute('data-open', 'true');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'true');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'true');
  });

  test('close', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox @open={{true}} as |sb|>
        <sb.Input />
        <sb.Trigger />
        <button
          type="button"
          {{on "click" sb.close}}
        ></button>
      </SelectBox>
    `);

    await click('button');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
  });

  test('toggle', async function (assert) {
    assert.expect(6);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Input />
        <sb.Trigger />
        <button
          type="button"
          {{on "click" sb.toggle}}
        ></button>
      </SelectBox>
    `);

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

    this.value = '1';

    this.handleReady = (sb) => (this.api = sb);
    this.handleChange = (value) => assert.step(`change: ${value}`);
    this.handleSelect = () => assert.step('select');

    this.handleBuildSelection = (value) => {
      assert.step('build selection');
      return value;
    };

    await render(hbs`
      <SelectBox
        @value={{this.value}}
        @onReady={{this.handleReady}}
        @onChange={{this.handleChange}}
        @onSelect={{this.handleSelect}}
        @onBuildSelection={{this.handleBuildSelection}}
        as |sb|
      >
        <button
          type="button"
          {{on "click" (fn sb.select "2")}}
        ></button>
        <sb.Options>
          <sb.Option @value="1" />
          <sb.Option @value="2" />
        </sb.Options>
      </SelectBox>
    `);

    await click('button');
    await click('button');

    assert.strictEqual(this.value, '1', 'does not mutate value');
    assert.strictEqual(this.api.value, '2', 'api is correct');

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

    this.handleReady = (sb) => (this.api = sb);

    await render(hbs`
      <SelectBox @onReady={{this.handleReady}} as |sb|>
        <sb.Input />
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value="1" />
          <sb.Option @value="2" />
        </sb.Options>
      </SelectBox>

      <button type="button" {{on "click" (fn this.api.select "2")}}></button>
    `);

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

    this.handleReady = (sb) => (this.api = sb);

    await render(hbs`
      <SelectBox @open={{true}} @onReady={{this.handleReady}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value="1" />
          <sb.Option @value="2" />
        </sb.Options>
      </SelectBox>

      <button type="button" {{on "click" (fn this.api.select "2")}}></button>
    `);

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

    this.handleReady = (sb) => (this.api = sb);

    await render(hbs`
      <SelectBox @onReady={{this.handleReady}} as |sb|>
        <sb.Input />
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value="foo" @disabled={{true}} />
        </sb.Options>
      </SelectBox>

      <button type="button" {{on "click" (fn this.api.select "foo")}}></button>
    `);

    await click('button');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-selected', 'true')
      .hasAttribute(
        'aria-disabled',
        'true',
        'can still select a disabled option, by value'
      );
  });

  test('update', async function (assert) {
    assert.expect(5);

    this.value = '1';

    this.handleReady = (sb) => (this.api = sb);
    this.handleChange = (value) => assert.step(`change: ${value}`);
    this.handleSelect = () => assert.step('select');

    this.handleBuildSelection = (value) => {
      assert.step('build selection');
      return value;
    };

    await render(hbs`
      <SelectBox
        @value={{this.value}}
        @onReady={{this.handleReady}}
        @onChange={{this.handleChange}}
        @onSelect={{this.handleSelect}}
        @onBuildSelection={{this.handleBuildSelection}}
        as |sb|
      >
        <button
          type="button"
          {{on "click" (fn sb.update "2")}}
        ></button>
        <sb.Options>
          <sb.Option @value="1" />
          <sb.Option @value="2" />
        </sb.Options>
      </SelectBox>
    `);

    await click('button');
    await click('button');

    assert.strictEqual(this.value, '1', 'does not mutate value');
    assert.strictEqual(this.api.value, '2', 'api is correct');
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

    this.update = (sb) => {
      sb.update(1);
      assert.strictEqual(sb.value, 1, 'sb is a stable reference');
    };

    await render(hbs`
      <SelectBox as |sb|>
        <button
          type="button"
          {{on "click" (fn this.update sb)}}
        ></button>
        <sb.Options />
      </SelectBox>
    `);

    await click('button');
  });

  test('open boolean with a trigger defaults to closed', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Options data-open="{{sb.isOpen}}" />
      </SelectBox>
    `);

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__options').hasAttribute('data-open', 'false');
  });

  test('open boolean without a trigger is undefined', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options data-open="{{sb.isOpen}}" />
      </SelectBox>
    `);

    assert.dom('.select-box').doesNotHaveAttribute('data-open');
    assert.dom('.select-box__options').doesNotHaveAttribute('data-open');
  });
});
