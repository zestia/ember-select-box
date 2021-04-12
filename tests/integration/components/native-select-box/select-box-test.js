import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, find, findAll, render, settled } from '@ember/test-helpers';
import Component from '@glimmer/component';
import { setComponentTemplate } from '@ember/component';
import hbs from 'htmlbars-inline-precompile';
import { resolve } from 'rsvp';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import {
  getNativeMultipleSelectBoxValue,
  selectNativeOptionsByLabel,
  selectNativeOptionsByValue
} from '@zestia/ember-select-box/test-support/helpers/selecting';

module('native-select-box', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(hbs`<NativeSelectBox />`);

    assert
      .dom('.select-box')
      .hasTagName('select', 'renders with correct class name and tag');
  });

  test('size', async function (assert) {
    assert.expect(1);

    await render(hbs`<NativeSelectBox />`);

    assert.dom('.select-box').doesNotHaveAttribute('size');
  });

  test('id', async function (assert) {
    assert.expect(1);

    await render(hbs`<NativeSelectBox id="foo" />`);

    assert
      .dom('.select-box')
      .hasAttribute(
        'id',
        'foo',
        'can manually set an ID. ' +
          '(this is required so that the select box can be hooked up to a label with for=)'
      );
  });

  test('changing the selected value', async function (assert) {
    assert.expect(6);

    this.myValue = 'foo';

    await render(hbs`
      <NativeSelectBox @value={{this.myValue}} as |sb|>
        <sb.Option @value="foo">Foo</sb.Option>
        <sb.Option @value="bar">Bar</sb.Option>
      </NativeSelectBox>
    `);

    const foo = find('.select-box__option[value="foo"]');
    const bar = find('.select-box__option[value="bar"]');

    // the option with the matching value is selected initially
    assert.true(foo.selected);
    assert.false(bar.selected);

    this.set('myValue', 'bar');

    // changing the value causes the options to re-compute which is selected
    assert.false(foo.selected);
    assert.true(bar.selected);

    this.set('myValue', null);

    // setting no value results in the first option being selected
    assert.true(foo.selected);
    assert.false(bar.selected);
  });

  test('change event selects an option', async function (assert) {
    assert.expect(3);

    let selectedValue;

    this.myValue = null;
    this.handleSelect = (value) => (selectedValue = value);

    await render(hbs`
      <NativeSelectBox
        @value={{this.myValue}}
        @onSelect={{this.handleSelect}} as |sb|
      >
        <sb.Option @value="foo" />
        <sb.Option @value="bar" />
        <sb.Option @value="baz" />
      </NativeSelectBox>
    `);

    await fillIn('.select-box', 'bar');

    assert.strictEqual(
      this.myValue,
      null,
      'does not mutate the initial selected value'
    );

    assert.equal(
      selectedValue,
      'bar',
      'sends an action with the selected value'
    );

    assert.true(
      find('.select-box__option:nth-child(2)').selected,
      'renders the correct selected option'
    );
  });

  test('selecting non primitives', async function (assert) {
    assert.expect(1);

    this.foo = ['foo'];
    this.bar = { bar: 'baz' };

    this.handleSelect = (value) => {
      assert.deepEqual(
        value,
        [['foo'], { bar: 'baz' }],
        'can select options with non primitive values'
      );
    };

    await render(hbs`
      <NativeSelectBox
        @multiple={{true}}
        @onSelect={{this.handleSelect}} as |sb|
      >
        <sb.Option @value={{this.foo}}>Foo</sb.Option>
        <sb.Option @value={{this.bar}}>Bar</sb.Option>
      </NativeSelectBox>
    `);

    await selectNativeOptionsByLabel('.select-box', ['Foo', 'Bar']);
  });

  test('manual selection (initial value)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <NativeSelectBox @value="baz" as |sb|>
        <sb.Option @value="foo" @selected={{false}} />
        <sb.Option @value="bar" @selected={{true}} />
        <sb.Option @value="baz" @selected={{false}} />
      </NativeSelectBox>
    `);

    assert
      .dom('.select-box')
      .hasValue(
        'bar',
        'manually selected values take priority over the initial value'
      );
  });

  test('manual selection (multiple values)', async function (assert) {
    assert.expect(2);

    this.barSelected = true;

    await render(hbs`
      <NativeSelectBox @multiple={{true}} as |sb|>
        <sb.Option @value="foo" />
        <sb.Option @value="bar" @selected={{this.barSelected}} />
        <sb.Option @value="baz" @selected={{this.bazSelected}} />
      </NativeSelectBox>
    `);

    assert.deepEqual(
      getNativeMultipleSelectBoxValue('.select-box'),
      ['bar'],
      'can manually specify a selected value'
    );

    this.set('bazSelected', true);

    assert.deepEqual(
      getNativeMultipleSelectBoxValue('.select-box'),
      ['bar', 'baz'],
      'can manually select multiple values'
    );
  });

  test('non-component options (single)', async function (assert) {
    assert.expect(2);

    this.nonPrimitive = { id: 456 };
    this.primitive = 123;

    this.handleSelect = (value) =>
      assert.strictEqual(value, '123', 'can select primitive values');
    await render(hbs`
      <NativeSelectBox @onSelect={{this.handleSelect}}>
        <option value={{this.nonPrimitive}}>Primitive</option>
        <option value={{this.primitive}}>Primitive</option>
      </NativeSelectBox>
    `);

    assert
      .dom('option:nth-child(1)')
      .hasAttribute(
        'value',
        '[object Object]',
        'non primitive values are stringified'
      );

    await fillIn('.select-box', '123');
  });

  test('non-component options (multiple)', async function (assert) {
    assert.expect(1);

    this.handleSelect = (values) => {
      assert.deepEqual(
        values,
        ['Hello', 'World'],
        'can select multiple values from non-component options'
      );
    };

    await render(hbs`
      <NativeSelectBox @multiple={{true}} @onSelect={{this.handleSelect}}>
        <option value="Hello"></option>
        <option value="World"></option>
      </NativeSelectBox>
    `);

    await selectNativeOptionsByValue('.select-box', ['Hello', 'World']);
  });

  test('non-component options (mixed)', async function (assert) {
    assert.expect(1);

    this.handleSelect = (values) => {
      assert.deepEqual(
        values,
        ['foo'],
        'non-component options are ignored if option components are registered'
      );
    };

    await render(hbs`
      <NativeSelectBox @multiple={{true}} @onSelect={{this.handleSelect}} as |sb|>
        <sb.Option @value="foo" />
        <option value="bar"></option>
      </NativeSelectBox>
    `);

    await selectNativeOptionsByValue('.select-box', ['foo', 'bar']);
  });

  test('initial update action (no actual update needed)', async function (assert) {
    assert.expect(1);

    this.handleUpdate = () => assert.step('updated');

    await render(hbs`
      <NativeSelectBox @onUpdate={{this.handleUpdate}} @value={{null}} as |sb|>
        <sb.Option @value={{null}}>One</sb.Option>
      </NativeSelectBox>
    `);

    assert.verifySteps(
      [],
      'does not fire onUpdate action because values match'
    );
  });

  test('initial update action (promises)', async function (assert) {
    assert.expect(2);

    this.barPromise = resolve('bar');

    const fooSelectBox = hbs`
      <div class="display-label">
        {{this.displayLabel}}
      </div>

      <NativeSelectBox
        @value={{@value}}
        @onUpdate={{this.updateDisplayLabel}} as |sb|
      >
        {{yield sb}}
      </NativeSelectBox>
    `;

    class FooSelectBox extends Component {
      @tracked displayLabel;

      @action
      updateDisplayLabel(sb) {
        const label = sb.element
          .querySelector('option:checked')
          .textContent.trim();

        this.displayLabel = label;
      }
    }

    this.FooSelectBox = setComponentTemplate(fooSelectBox, FooSelectBox);

    await render(hbs`
      {{#let (ensure-safe-component this.FooSelectBox) as |FooSelectBox|}}
        <FooSelectBox @value={{this.barPromise}} as |sb|>
          <sb.Option @value="foo">Foo</sb.Option>
          <sb.Option @value="bar">Bar</sb.Option>
          <sb.Option @value="baz">Baz</sb.Option>
        </FooSelectBox>
      {{/let}}
    `);

    assert.dom('.display-label').hasText('Foo');

    await settled();

    assert
      .dom('.display-label')
      .hasText(
        'Foo',
        "(you might expect 'Bar')" +
          'onUpdate has fired correctly, but it is up to the consumer of this ' +
          'addon to wait until afterRender, in order to get the textContent ' +
          'of the selected option'
      );
  });

  test('customising selection', async function (assert) {
    assert.expect(1);

    this.buildSelection = () => assert.step('build selection');

    await render(hbs`
      <NativeSelectBox @onBuildSelection={{this.buildSelection}} as |sb|>
        <sb.Option @value="foo" />
      </NativeSelectBox>
    `);

    await fillIn('.select-box', 'foo');

    assert.verifySteps(
      [],
      'onBuildSelection does not fire on native select components'
    );
  });

  test('no values', async function (assert) {
    assert.expect(2);

    let myValue;

    this.handleSelect = (value) => (myValue = value);

    await render(hbs`
      <NativeSelectBox @onSelect={{this.handleSelect}} as |sb|>
        <sb.Option>foo</sb.Option>
        <sb.Option>bar</sb.Option>
      </NativeSelectBox>
    `);

    await fillIn('.select-box', 'bar');

    assert.strictEqual(
      myValue,
      undefined,
      "text content is not considered the option's value (non-native option)"
    );

    await render(hbs`
      <NativeSelectBox @onSelect={{this.handleSelect}}>
        <option>foo</option>
        <option>bar</option>
      </NativeSelectBox>
    `);

    await fillIn('.select-box', 'bar');

    assert.strictEqual(
      myValue,
      'bar',
      "text content is considered the option's value (native option)"
    );
  });

  test('default values', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <NativeSelectBox as |sb|>
        <sb.Option />
        <sb.Option />
        <sb.Option />
      </NativeSelectBox>
    `);

    // single value native select considers the last option as the selected one
    assert.false(findAll('.select-box__option')[0].selected);
    assert.false(findAll('.select-box__option')[1].selected);
    assert.true(findAll('.select-box__option')[2].selected);
  });

  test('select api', async function (assert) {
    assert.expect(3);

    let api;

    this.handleReady = (sb) => (api = sb);

    this.handleSelect = (value, sb) =>
      assert.equal(value, 2, 'sends action with selected value');

    await render(hbs`
      <NativeSelectBox
        @onReady={{this.handleReady}}
        @onSelect={{this.handleSelect}} as |sb|
      >
        <sb.Option @value="1">1</sb.Option>
        <sb.Option @value="2">2</sb.Option>
        <sb.Option @value="3">3</sb.Option>
      </NativeSelectBox>
    `);

    api.select('2');

    await settled();

    assert.dom('.select-box').hasValue('2');
    assert.dom('.select-box__option:checked').hasText('2');
  });

  test('select api (non primitive)', async function (assert) {
    assert.expect(3);

    this.one = { one: true };
    this.two = { two: true };
    this.three = { three: true };

    let api;

    this.handleReady = (sb) => (api = sb);

    this.handleSelect = (value, sb) =>
      assert.equal(value, this.two, 'sends action with selected value');

    await render(hbs`
      <NativeSelectBox
        @onReady={{this.handleReady}}
        @onSelect={{this.handleSelect}} as |sb|
      >
        <sb.Option @value={{this.one}}>1</sb.Option>
        <sb.Option @value={{this.two}}>2</sb.Option>
        <sb.Option @value={{this.three}}>3</sb.Option>
      </NativeSelectBox>
    `);

    api.select(this.two);

    await settled();

    assert.dom('.select-box').hasValue('[object Object]');
    assert.dom('.select-box__option:checked').hasText('2');
  });
});
