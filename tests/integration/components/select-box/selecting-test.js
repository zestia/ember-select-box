import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import EmberArray, { A as emberA } from '@ember/array';
import { defer, resolve } from 'rsvp';
import { next } from '@ember/runloop';
import {
  click,
  find,
  findAll,
  render,
  settled,
  triggerEvent,
  triggerKeyEvent
} from '@ember/test-helpers';
const { isFrozen } = Object;

module('select-box (selecting)', function (hooks) {
  setupRenderingTest(hooks);

  test('changing the value argument', async function (assert) {
    assert.expect(6);

    this.myValue = 'foo';

    this.handleSelect = () => {
      assert.ok(
        true,
        'changing the selected value does not trigger a selection'
      );
    };

    await render(hbs`
      <SelectBox @onSelect={{this.handleSelect}} @value={{this.myValue}} as |sb|>
        <sb.Option @value="foo">Foo</sb.Option>
        <sb.Option @value="bar">Bar</sb.Option>
      </SelectBox>
    `);

    const foo = findAll('.select-box__option')[0];
    const bar = findAll('.select-box__option')[1];

    // the option with the matching value is marked selected
    assert.dom(foo).hasAttribute('aria-selected', 'true');
    assert.dom(bar).hasAttribute('aria-selected', 'false');

    this.set('myValue', 'bar');

    // changing the value causes the options to re-compute which is selected
    assert.dom(foo).hasAttribute('aria-selected', 'false');
    assert.dom(bar).hasAttribute('aria-selected', 'true');

    this.set('myValue', null);

    // clearing selected value results in no selected options
    // (and does not result in the first "default" option being selected)
    assert.dom(foo).hasAttribute('aria-selected', 'false');
    assert.dom(bar).hasAttribute('aria-selected', 'false');
  });

  test('changing the value argument to nothing (common misconception)', async function (assert) {
    assert.expect(3);

    this.myValue = null;

    await render(hbs`
      <SelectBox @value={{this.myValue}} as |sb|>
        <sb.Option @value="foo">Foo</sb.Option>
        <sb.Option @value="bar">Bar</sb.Option>
      </SelectBox>
    `);

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .doesNotExist('precondition: no selected options');

    await click(findAll('.select-box__option')[1]);

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .hasText('Bar', 'precondition: user has selected an option');

    this.set('myValue', null);

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .hasText(
        'Bar',
        'selecting null does not clear the selected option, because as far as the ' +
          'select box is concerned, nothing has changed'
      );
  });

  test('click to select option', async function (assert) {
    assert.expect(5);

    let selectedValue;

    this.myValue = null;

    this.handleSelect = (value) => (selectedValue = value);

    await render(hbs`
      <SelectBox @value={{this.myValue}} @onSelect={{this.handleSelect}} as |sb|>
        <sb.Option @value="foo">Foo</sb.Option>
        <sb.Option @value="bar">Bar</sb.Option>
      </SelectBox>
    `);

    const foo = findAll('.select-box__option')[0];
    const bar = findAll('.select-box__option')[1];

    await click(foo);

    assert.strictEqual(
      this.myValue,
      null,
      'does not mutate the initial selected value'
    );

    assert.equal(
      selectedValue,
      'foo',
      'sends an action with the selected value'
    );

    assert
      .dom(foo)
      .hasAttribute(
        'aria-selected',
        'true',
        'the option clicked is marked as selected'
      );

    await click(bar);

    // clicking another option selects it instead
    assert.dom(foo).hasAttribute('aria-selected', 'false');
    assert.dom(bar).hasAttribute('aria-selected', 'true');
  });

  test('selecting the same option more than once', async function (assert) {
    assert.expect(7);

    this.handleSelect = () => assert.step('selected');
    this.handleUpdate = () => assert.step('updated');

    await render(hbs`
      <SelectBox @onSelect={{this.handleSelect}} @onUpdate={{this.handleUpdate}} as |sb|>
        <sb.Option @value="foo" />
      </SelectBox>
    `);

    await click('.select-box__option');
    await click('.select-box__option');
    await click('.select-box__option');
    await click('.select-box__option');

    assert.verifySteps(
      ['updated', 'updated', 'selected', 'selected', 'selected', 'selected'],
      "sends select action even if selected value hasn't changed. " +
        'and sends update action only when value has changed, ' +
        '(the initial update action, and then any subsequent update to the value)'
    );
  });

  test('selecting more than 1 of the same value', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Option @value="foo" />
        <sb.Option @value="bar" />
        <sb.Option @value="bar" />
      </SelectBox>
    `);

    const one = findAll('.select-box__option')[0];
    const two = findAll('.select-box__option')[1];
    const three = findAll('.select-box__option')[2];

    await click(two);

    // all options with matching values are selected, even on a non-multiple select
    assert.dom(one).hasAttribute('aria-selected', 'false');
    assert.dom(two).hasAttribute('aria-selected', 'true');
    assert.dom(three).hasAttribute('aria-selected', 'true');
  });

  test('selecting multiple options', async function (assert) {
    assert.expect(5);

    let selectedValues;

    this.myValues = ['foo', 'baz'];
    this.handleSelect = (values) => (selectedValues = values);

    await render(hbs`
      <SelectBox @onSelect={{this.handleSelect}} @multiple={{true}} @value={{this.myValues}} as |sb|>
        <sb.Option @value="foo" />
        <sb.Option @value="bar" />
        <sb.Option @value="baz" />
      </SelectBox>
    `);

    const foo = findAll('.select-box__option')[0];
    const bar = findAll('.select-box__option')[1];

    await click(bar);

    assert.deepEqual(
      selectedValues,
      ['foo', 'baz', 'bar'],
      'selecting a single option adds it to the existing selection'
    );

    assert.false(
      EmberArray.detect(selectedValues),
      'the values sent out of the component are not an ember array'
    );

    await click(foo);

    assert.deepEqual(
      selectedValues,
      ['baz', 'bar'],
      'selecting an already selected option removes it from the existing selection'
    );

    assert.deepEqual(
      this.myValues,
      ['foo', 'baz'],
      'does not mutate the original array'
    );

    assert.ok(
      isFrozen(selectedValues),
      'the selected values sent out of the component are frozen'
    );
  });

  test('multiple but with a single value', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <SelectBox @multiple={{true}} @value="bar" as |sb|>
        <sb.Option @value="foo" />
        <sb.Option @value="bar" />
      </SelectBox>
    `);

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-selected', 'false', 'not selected');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute(
        'aria-selected',
        'true',
        'value is coerced to an array and correct option is selected'
      );
  });

  test('selected option but missing value', async function (assert) {
    assert.expect(4);

    const one = { name: 'One' };
    const two = { name: 'Two' };
    const three = { name: 'Three' };
    const four = { name: 'Four' };

    this.items = [one, two, three];
    this.myValue = two;

    await render(hbs`
      <SelectBox @value={{this.myValue}} as |sb|>
        <sb.SelectedOption>
          {{sb.value.name}}
        </sb.SelectedOption>
        <sb.Options>
          {{#each this.items as |item|}}
            <sb.Option @value={{item}} />
          {{/each}}
        </sb.Options>
      </SelectBox>
    `);

    assert
      .dom('.select-box__selected-option')
      .hasText('Two', 'correct selected option is yielded');

    this.set('myValue', four);

    assert
      .dom('.select-box__selected-option')
      .hasText(
        'Four',
        'yielded selected option is available despite not being an option ' +
          '(internal value is the value passed in as an argument)'
      );

    await click('.select-box__option:nth-child(2)');

    assert.dom('.select-box__selected-option').hasText('Two', 'precondition');

    this.set('items', [one, three]);

    assert
      .dom('.select-box__selected-option')
      .hasText(
        'Two',
        'selected value is retained, despite not being an option ' +
          '(internal value is the value that was selected'
      );
  });

  test('pressing enter with an active option', async function (assert) {
    assert.expect(5);

    this.handleSelect = (value) => assert.step(`selected ${value}`);

    await render(hbs`
      <SelectBox @onSelect={{this.handleSelect}} as |sb|>
        {{#if this.showInput}}
          <sb.Input />
        {{/if}}

        <sb.Option @value="foo" />
      </SelectBox>
    `);

    await triggerKeyEvent('.select-box', 'keydown', 13); // Enter

    assert.verifySteps(
      [],
      'select action does not fire, because no option was active'
    );

    await triggerEvent('.select-box__option', 'mouseenter');

    await triggerKeyEvent('.select-box', 'keydown', 13); // Enter

    assert.verifySteps(
      ['selected foo'],
      'select action fires, because an option was active'
    );

    this.set('showInput', true);

    await triggerKeyEvent('.select-box', 'keydown', 13); // Enter

    assert.verifySteps(
      ['selected foo'],
      'select action fires (even with an input present), because an option was active.' +
        'this is because the input is specifically not multiline.'
    );
  });

  test('pressing space with an active option', async function (assert) {
    assert.expect(4);

    // Even though space on a button will only click the button on keyup,
    // Here, we want to use keydown, because we are mimicking a native select box
    // which would select the option on keydown too.

    this.handleSelect = (value) => assert.step(`selected ${value}`);

    await render(hbs`
      <SelectBox @onSelect={{this.handleSelect}} as |sb|>
        {{#if this.showInput}}
          <sb.Input />
        {{/if}}

        <sb.Option @value="foo" />
      </SelectBox>
    `);

    await triggerKeyEvent('.select-box', 'keydown', 32); // Space

    assert.verifySteps(
      [],
      'select action does not fire, because no option was active'
    );

    await triggerEvent('.select-box__option', 'mouseenter');

    await triggerKeyEvent('.select-box', 'keydown', 32); // Space

    assert.verifySteps(
      ['selected foo'],
      'select action fires, because an option was active'
    );

    this.set('showInput', true);

    await triggerKeyEvent('.select-box', 'keydown', 32); // Space

    assert.verifySteps(
      [],
      'select action does not fire, because an input was present ' +
        'so pressing space should insert a space, and not select the active option'
    );
  });

  skip('pressing enter (on select box)', async function (assert) {
    // Pressing Enter on a faux select box, with no active option
    // should submit the form.
    // https://github.com/emberjs/ember-test-helpers/issues/639

    assert.expect(3);

    await render(hbs`
      <form>
        <SelectBox as |sb|>
          <sb.Option @value="foo" />
        </SelectBox>
      </form>
    `);

    await triggerKeyEvent('.select-box', 'keydown', 13); // Enter
  });

  test('pressing enter on input', async function (assert) {
    assert.expect(2);

    // It specifically must be a keydown that we call prevent default on,
    // because in a <form>, when Enter is pressed, the event order will be:
    // down → submit → up. If we were to prevent on up, we would be too late
    // to stop the form submission.

    let lastEvent;

    this.handleKeyDown = (e) => (lastEvent = e);

    await render(hbs`
      <SelectBox {{on "keydown" this.handleKeyDown}} as |sb|>
        <sb.Input />
        <sb.Option @value="foo" />
        <sb.Option @value="bar" />
      </SelectBox>
    `);

    await triggerKeyEvent('.select-box__input', 'keydown', 13); // Enter

    next(() => {
      assert.false(
        lastEvent.defaultPrevented,
        'pressing enter will submit the form because no options are active'
      );
    });

    await triggerEvent(findAll('.select-box__option')[1], 'mouseenter');

    next(() => {
      assert.true(
        lastEvent.defaultPrevented,
        'pressing enter will not submit the form because an option is active, ' +
          'so pressing enter should select that option instead, first.'
      );
    });

    await triggerKeyEvent('.select-box__input', 'keydown', 13); // Enter
  });

  test('pressing enter on a child', async function (assert) {
    assert.expect(1);

    let lastEvent;

    this.handleKeyDown = (e) => (lastEvent = e);

    await render(hbs`
      <SelectBox {{on "keydown" this.handleKeyDown}} as |sb|>
        <sb.Option @value="foo" />
        <sb.Option @value="bar" >
          <a href="#" class="my-link"></a>
        </sb.Option>
      </SelectBox>
    `);

    await triggerEvent(findAll('.select-box__option')[1], 'mouseenter');

    await triggerKeyEvent('.my-link', 'keydown', 13); // Enter

    next(() => {
      assert.false(
        lastEvent.defaultPrevented,
        'pressing enter is not default prevented, the link will be navigated to'
      );
    });
  });

  test('selecting via the api', async function (assert) {
    assert.expect(3);

    let selected;
    let selectedFoo;
    let updated;

    this.handleSelect = (value) => (selected = value);
    this.handleUpdate = (sb) => (updated = sb.value);
    this.handleSelectFoo = (value) => (selectedFoo = value);

    await render(hbs`
      <SelectBox @onSelect={{this.handleSelect}} @onUpdate={{this.handleUpdate}} as |sb|>
        <sb.Option @value="foo" @onSelect={{this.handleSelectFoo}} />
        <button type="button" {{on "click" (fn sb.select "foo")}}>Select foo</button>
      </SelectBox>
    `);

    await click('button');

    assert.strictEqual(
      updated,
      'foo',
      'the select box sends and update action'
    );

    assert.strictEqual(
      selected,
      'foo',
      'the select box acknowledges the selection and sends an action'
    );

    assert.strictEqual(
      selectedFoo,
      undefined,
      'the option does not fire its onSelect action'
    );
  });

  test('updating via the api', async function (assert) {
    assert.expect(5);

    let updated = 0;
    let updatedValue;
    let selected = 0;

    this.handleUpdate = (sb) => {
      updated++;
      updatedValue = sb.value;
    };

    this.handleSelect = (value) => {
      selected++;
    };

    await render(hbs`
      <SelectBox @onUpdate={{this.handleUpdate}} @onSelect={{this.handleSelect}} as |sb|>
        <sb.Option @value="foo">Foo</sb.Option>
        <sb.Option @value="bar">Bar</sb.Option>
        <button type="button" {{on "click" (fn sb.update "foo")}}>Select foo</button>
        <button type="button" {{on "click" (fn sb.update "bar")}}>Select bar</button>
      </SelectBox>
    `);

    assert.equal(updated, 1, 'initial update action');

    await click(findAll('button')[1]);

    assert.equal(updated, 2, 'update value action');
    assert.strictEqual(updatedValue, 'bar', 'has fired update action');
    assert.strictEqual(selected, 0, 'has not fired a select action');

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .hasText('Bar', "select box's internal value is updated with the value");
  });

  test('update api', async function (assert) {
    assert.expect(1);

    let api;

    this.handleReady = (sb) => (api = sb);

    await render(hbs`
      <SelectBox @onReady={{this.handleReady}} as |sb|>
        <sb.Option @value={{1}}>One</sb.Option>
        <sb.Option @value={{2}}>Two</sb.Option>
      </SelectBox>
    `);

    api.update(resolve(2)).then((value) => {
      assert.strictEqual(
        value,
        undefined,
        'does not resolve the value' +
          '(this is not how the api is intended to be used)'
      );
    });
  });

  test('manual selection', async function (assert) {
    assert.expect(3);

    this.barSelected = true;

    await render(hbs`
      <SelectBox @value="baz" as |sb|>
        <sb.Option @value="foo">Foo</sb.Option>
        <sb.Option @value="bar" @selected={{this.barSelected}}>Bar</sb.Option>
        <sb.Option @value="baz" @selected={{false}}>Baz</sb.Option>
      </SelectBox>
    `);

    const bar = findAll('.select-box__option')[1];
    const baz = findAll('.select-box__option')[2];

    assert
      .dom(bar)
      .hasAttribute(
        'aria-selected',
        'true',
        'manually selected options are selected'
      );

    assert
      .dom(baz)
      .hasAttribute(
        'aria-selected',
        'false',
        'initially selected options are not selected if manually overridden'
      );

    this.set('barSelected', false);

    assert
      .dom(bar)
      .hasAttribute(
        'aria-selected',
        'false',
        'can manually deselect an option'
      );
  });

  test('with disabled options', async function (assert) {
    assert.expect(5);

    /**
     * Native select boxes do not allow selecting of disabled options.
     * Faux select boxes also do not allow disabled options to be selected.
     * However, their options will still be flagged as selected if the value
     * matches the selected value. This is intentional. The reason is because
     * it's the option component itself that is disabled, not the value.
     * This allows for greater flexibility when building custom select boxes,
     * Most of the time, you will get the behaviour you want, and that is to
     * prevent the user from selecting an option. But, you can also style
     * a state where a select box is displaying options that were selected,
     * but some of which are both selected and disabled. e.g:
     * A user, flagged as selected, but also disabled because they've already
     * been selected, thereby preventing them from being selected again.
     */

    let selected = 0;
    let lastSelectedValue;

    this.handleSelect = (value) => {
      selected++;
      lastSelectedValue = value;
    };

    this.myValue = ['foo'];

    await render(hbs`
      <SelectBox @value={{this.myValue}} @multiple={{true}} @onSelect={{this.handleSelect}} as |sb|>
        <sb.Option @value="foo" @disabled={{true}} />
        <sb.Option @value="bar" />
        <sb.Option @value="baz" />
        <sb.Option @value="baz" @disabled={{true}} />
      </SelectBox>
    `);

    assert
      .dom(findAll('.select-box__option')[0])
      .hasAttribute(
        'aria-selected',
        'true',
        'option that is disabled, is intentionally still marked as selected (by value)'
      );

    await click(findAll('.select-box__option')[3]);

    assert.equal(
      selected,
      0,
      'does not fire select action if option is disabled'
    );

    assert
      .dom(findAll('.select-box__option')[3])
      .hasAttribute(
        'aria-selected',
        'false',
        'option is not selected, due to being disabled'
      );

    await click(findAll('.select-box__option')[1]);

    assert.deepEqual(
      lastSelectedValue,
      ['foo', 'bar'],
      'disabled option values are still out as a selection'
    );

    await click(findAll('.select-box__option')[2]);

    assert
      .dom(findAll('.select-box__option')[2])
      .hasAttribute('aria-selected', 'true', 'option is selected (by value)');
  });

  test('changing attributes', async function (assert) {
    assert.expect(1);

    let updated = 0;

    this.handleUpdate = () => updated++;

    await render(hbs`
      <SelectBox @value="foo" aria-label={{this.ariaLabel}} @onUpdate={{this.handleUpdate}} as |sb|>
        <sb.Option @value="foo" />
        <sb.Option @value="bar" />
      </SelectBox>
    `);

    this.set('ariaLabel', 'Choice');

    assert.equal(
      updated,
      1,
      "does not fire update action when the value hasn't actually updated"
    );
  });

  test('a single value with a multiple choice select box', async function (assert) {
    assert.expect(2);

    this.myValue = 'bar';

    await render(hbs`
      <SelectBox @value={{this.myValue}} @multiple={{true}} as |sb|>
        <sb.Option @value="foo">Foo</sb.Option>
        <sb.Option @value="bar">Bar</sb.Option>
      </SelectBox>
    `);

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .hasText('Bar', 'works as expected');

    this.set('myValue', 'foo');

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .hasText('Foo', 'updating the value works');
  });

  test('multiple values with a single choice select box', async function (assert) {
    assert.expect(1);

    this.myValues = ['bar', 'baz'];

    await render(hbs`
      <SelectBox @value={{this.myValues}} as |sb|>
        <sb.Option @value="foo" />
        <sb.Option @value="bar" />
        <sb.Option @value="baz" />
      </SelectBox>
    `);

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .doesNotExist('works as expected');
  });

  test('adding and removing items to a multiple select box', async function (assert) {
    assert.expect(1);

    this.myValues = emberA(['bar']);

    await render(hbs`
      <SelectBox @value={{this.myValues}} @multiple={{true}} as |sb|>
        <sb.Option @value="foo" />
        <sb.Option @value="bar" />
        <sb.Option @value="baz" />
      </SelectBox>
    `);

    this.myValues.addObject('baz');

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .exists(
        { count: 1 },
        'changes to the multiple choice values does not update the select box ' +
          'the entire array must be replaced (the value should be considered a _new_ value)'
      );
  });

  test('yielded selected value', async function (assert) {
    assert.expect(3);

    let yieldedValue;

    this.myValue = emberA(['foo', 'bar']);

    this.inspect = (value) => (yieldedValue = value);

    await render(hbs`
      <SelectBox @multiple={{true}} @value={{this.myValue}} as |sb|>
        <sb.Option @value="foo" />
        <sb.Option @value="bar" />
        <button type="button" {{on "click" (fn this.inspect sb.value)}}>inspect</button>
      </SelectBox>
    `);

    await click('button');

    assert.throws(() => yieldedValue.push('baz'));

    assert.ok(isFrozen(yieldedValue), 'yields frozen value in template');

    assert.false(
      EmberArray.detect(yieldedValue),
      'the yielded api value is not the original array (or an ember array)'
    );
  });

  test('customising selection', async function (assert) {
    assert.expect(9);

    let api;
    let arg1;
    let arg2;
    let calledBuild = 0;

    this.myValue = ['foo', 'bar'];

    this.handleReady = (sb) => (api = sb);

    this.handleBuildSelection = (value1, value2) => {
      calledBuild++;

      arg1 = value1;
      arg2 = value2;

      return ['baz'];
    };

    await render(hbs`
      <SelectBox
        @multiple={{true}}
        @value={{this.myValue}}
        @onBuildSelection={{this.handleBuildSelection}}
        @onReady={{this.handleReady}} as |sb|
      >
        <sb.Option @value="foo">Foo</sb.Option>
        <sb.Option @value="bar">Bar</sb.Option>
        <sb.Option @value="baz">Baz</sb.Option>
        <sb.Option @value="qux">Qux</sb.Option>
      </SelectBox>
    `);

    await click(findAll('.select-box__option')[0]);

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .hasText(
        'Baz',
        'selection used is the selection returned from onBuildSelection'
      );

    assert.deepEqual(api.value, ['baz'], 'value is correct');

    assert.strictEqual(arg1, 'foo', 'first argument is the value selected');

    assert.deepEqual(
      arg2,
      ['foo', 'bar'],
      'second argument is the currently selected value'
    );

    api.update(['bar']);

    await settled();

    assert.equal(
      calledBuild,
      1,
      'updating the selected value via the api does not trigger build selection'
    );

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .hasText('Bar', 'update still works');

    api.select(['qux']);

    await settled();

    assert.equal(
      calledBuild,
      1,
      'selecting a selected value via the api does not trigger build selection'
    );

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .hasText('Qux', 'select still works');

    assert.deepEqual(api.value, ['qux'], 'value is correct');
  });

  test('selecting active via api', async function (assert) {
    assert.expect(1);

    let api;
    let selectedValue;

    this.handleSelect = (value) => (selectedValue = value);
    this.handleReady = (sb) => (api = sb);

    await render(hbs`
      <SelectBox @onReady={{this.handleReady}} @onSelect={{this.handleSelect}} as |sb|>
        <sb.Option @value="foo" />
        <sb.Option @value="bar" />
      </SelectBox>
    `);

    await triggerEvent(findAll('.select-box__option')[1], 'mouseenter');

    await api.selectActiveOption();

    assert.equal(
      selectedValue,
      'bar',
      'can select the active option via the api'
    );
  });

  test('default values', async function (assert) {
    assert.expect(1);

    // Unlike <select>, which defaults to selecting the first option,
    // All options are considered selected, because both the select box's
    // value (null), and the option's value (null) are a match.

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Option />
        <sb.Option />
      </SelectBox>
    `);

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .exists(
        { count: 2 },
        "select box's default value and options' default value is null"
      );
  });

  test('failed value (multiple)', async function (assert) {
    assert.expect(1);

    const error = new Error('Fail');

    this.promise = new Promise((resolve, reject) => reject(error));

    this.handleUpdate = (sb) => {
      assert.deepEqual(
        sb.value,
        error,
        'value is not coerced into an array, despite being set to multiple'
      );
    };

    await render(hbs`
      <SelectBox
        @value={{this.promise}}
        @multiple={{true}}
        @onUpdate={{this.handleUpdate}}
      />
    `);
  });

  test('selecting a failed value', async function (assert) {
    assert.expect(1);

    let selectedValue;

    const deferred = defer();

    this.handleSelect = (value) => (selectedValue = value);

    this.promise = deferred.promise;

    await render(hbs`
      <SelectBox @onSelect={{this.handleSelect}} as |sb|>
        <sb.Option @value={{this.promise}} />
      </SelectBox>
    `);

    deferred.reject('Fail');

    await settled();

    await click('.select-box__option');

    assert.equal(
      selectedValue,
      'Fail',
      'selecting a value whose promise rejected, selects the rejection reason'
    );
  });

  test('selecting action order', async function (assert) {
    assert.expect(3);

    this.handleSelect = () => assert.step('selected');
    this.handleSelectOption = () => assert.step('selected option');

    await render(hbs`
      <SelectBox @onSelect={{this.handleSelect}} as |sb|>
        <sb.Option @onSelect={{this.handleSelectOption}} />
      </SelectBox>
    `);

    await click('.select-box__option');

    assert.verifySteps(
      ['selected option', 'selected'],
      'actions fire in correct order'
    );
  });

  test('labelled by (multiple selected options)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.SelectedOptions>
          <sb.SelectedOption>You chose this</sb.SelectedOption>
          <sb.SelectedOption>And this</sb.SelectedOption>
        </sb.SelectedOptions>
      </SelectBox>
    `);

    assert
      .dom('.select-box')
      .hasAttribute(
        'aria-labelledby',
        find('.select-box__selected-options').getAttribute('id'),
        'the selected options will be announced'
      );
  });

  test('labelled by (single selected option inside selected options container)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.SelectedOptions>
          <sb.SelectedOption>You chose this</sb.SelectedOption>
        </sb.SelectedOptions>
        <sb.Input />
      </SelectBox>
    `);

    assert
      .dom('.select-box')
      .hasAttribute(
        'aria-labelledby',
        find('.select-box__selected-options').getAttribute('id'),
        'the selected option(s) will be announced'
      );
  });

  test('labelled by (single selected option)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.SelectedOption>You chose this</sb.SelectedOption>
        <sb.Input />
      </SelectBox>
    `);

    assert
      .dom('.select-box')
      .hasAttribute(
        'aria-labelledby',
        find('.select-box__selected-option:nth-child(1)').getAttribute('id'),
        'the selected option will be announced'
      );
  });

  test('labelled by (no selected option/s)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Input />
      </SelectBox>
    `);

    assert
      .dom('.select-box')
      .hasAttribute(
        'aria-labelledby',
        find('.select-box__input').getAttribute('id'),
        'the chosen text will be announced as if it were the selected option'
      );
  });
});
