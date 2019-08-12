import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import EmberArray, { A as emberA } from '@ember/array';
import { defer } from 'rsvp';
import {
  render,
  settled,
  triggerKeyEvent,
  triggerEvent,
  find,
  findAll,
  click
} from '@ember/test-helpers';
const { isFrozen } = Object;

module('select-box (selecting)', function(hooks) {
  setupRenderingTest(hooks);

  test('changing the value attribute', async function(assert) {
    assert.expect(3);

    this.set('selectedValue', 'foo');

    this.set('selected', () => {
      assert.ok(true, 'changing the selected value does not trigger a selection');
    });

    await render(hbs`
      <SelectBox @onSelect={{this.selected}} @value={{this.selectedValue}} as |sb|>
        <sb.Option @value="foo">Foo</sb.Option>
        <sb.Option @value="bar">Bar</sb.Option>
      </SelectBox>
    `);

    const foo = findAll('.select-box-option')[0];
    const bar = findAll('.select-box-option')[1];

    assert.ok(
      foo.classList.contains('is-selected') && !bar.classList.contains('is-selected'),
      'the option with the matching value is marked selected'
    );

    this.set('selectedValue', 'bar');

    assert.ok(
      !foo.classList.contains('is-selected') && bar.classList.contains('is-selected'),
      'changing the value causes the options to re-compute which is selected'
    );

    this.set('selectedValue', null);

    assert.ok(
      !foo.classList.contains('is-selected') && !bar.classList.contains('is-selected'),
      'clearing selected value results in no selected options, ' +
        '(and does not result in the first "default" option being selected)'
    );
  });

  test('changing the value attribute to nothing (common misconception)', async function(assert) {
    assert.expect(3);

    this.set('selectedValue', null);

    await render(hbs`
      <SelectBox @value={{this.selectedValue}} as |sb|>
        <sb.Option @value="foo">Foo</sb.Option>
        <sb.Option @value="bar">Bar</sb.Option>
      </SelectBox>
    `);

    assert.dom('.select-box-option.is-selected').doesNotExist('precondition: no selected options');

    await click(findAll('.select-box-option')[1]);

    assert
      .dom('.select-box-option.is-selected')
      .hasText('Bar', 'precondition: user has selected an option');

    this.set('selectedValue', null);

    assert
      .dom('.select-box-option.is-selected')
      .hasText(
        'Bar',
        'selecting null does not clear the selected option, because technically nothing has ' +
          'changed, so `didReceiveAttrs` will not fire'
      );
  });

  test('click to select option', async function(assert) {
    assert.expect(4);

    let selectedValue;

    this.set('initialSelectedValue', null);

    this.set('selected', value => {
      selectedValue = value;
    });

    await render(hbs`
      <SelectBox @value={{this.initialSelectedValue}} @onSelect={{this.selected}} as |sb|>
        <sb.Option @value="foo">Foo</sb.Option>
        <sb.Option @value="bar">Bar</sb.Option>
      </SelectBox>
    `);

    const foo = findAll('.select-box-option')[0];
    const bar = findAll('.select-box-option')[1];

    await click(foo);

    assert.strictEqual(
      this.initialSelectedValue,
      null,
      'does not mutate the initial selected value'
    );

    assert.equal(selectedValue, 'foo', 'sends an action with the selected value');

    assert.dom(foo).hasClass('is-selected', 'the option clicked is marked as selected');

    await click(bar);

    assert.ok(
      !foo.classList.contains('is-selected') && bar.classList.contains('is-selected'),
      'clicking another option selects it instead'
    );
  });

  test('selecting the same option more than once', async function(assert) {
    assert.expect(2);

    let selected = 0;
    let updated = 0;
    this.set('selected', () => selected++);
    this.set('updated', () => updated++);

    await render(hbs`
      <SelectBox @onSelect={{this.selected}} @onUpdate={{this.updated}} as |sb|>
        <sb.Option @value="foo" />
      </SelectBox>
    `);

    await click('.select-box-option');
    await click('.select-box-option');
    await click('.select-box-option');
    await click('.select-box-option');

    assert.equal(selected, 4, "sends select action even if selected value hasn't changed");

    assert.equal(
      updated,
      2,
      'sends update action only when value has changed, ' +
        '(the initial update action, and then any subsequent update to the value)'
    );
  });

  test('selecting more than 1 of the same value', async function(assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Option @value="foo" />
        <sb.Option @value="bar" />
        <sb.Option @value="bar" />
      </SelectBox>
    `);

    const one = findAll('.select-box-option')[0];
    const two = findAll('.select-box-option')[1];
    const three = findAll('.select-box-option')[2];

    await click(two);

    assert.ok(
      !one.classList.contains('is-selected') &&
        two.classList.contains('is-selected') &&
        three.classList.contains('is-selected'),
      'all options with matching values are selected, even on a non-multiple select'
    );
  });

  test('selecting multiple options', async function(assert) {
    assert.expect(5);

    const values = ['foo', 'baz'];

    let selectedValues;

    this.set('values', values);
    this.set('selected', values => (selectedValues = values));

    await render(hbs`
      <SelectBox @onSelect={{this.selected}} @multiple={{true}} @value={{this.values}} as |sb|>
        <sb.Option @value="foo" />
        <sb.Option @value="bar" />
        <sb.Option @value="baz" />
      </SelectBox>
    `);

    const foo = findAll('.select-box-option')[0];
    const bar = findAll('.select-box-option')[1];

    await click(bar);

    assert.deepEqual(
      selectedValues,
      ['foo', 'baz', 'bar'],
      'selecting a single option adds it to the existing selection'
    );

    assert.strictEqual(
      EmberArray.detect(selectedValues),
      false,
      'the values sent out of the component are not an ember array'
    );

    await click(foo);

    assert.deepEqual(
      selectedValues,
      ['baz', 'bar'],
      'selecting an already selected option removes it from the existing selection'
    );

    assert.deepEqual(this.values, ['foo', 'baz'], 'does not mutate the original array');

    assert.ok(isFrozen(selectedValues), 'the selected values sent out of the component are frozen');
  });

  test('multiple but with a single value', async function(assert) {
    assert.expect(2);

    await render(hbs`
      <SelectBox @multiple={{true}} @value="bar" as |sb|>
        <sb.Option @value="foo" />
        <sb.Option @value="bar" />
      </SelectBox>
    `);

    assert.ok(!findAll('.select-box-option')[0].classList.contains('is-selected'), 'not selected');

    assert
      .dom(findAll('.select-box-option')[1])
      .hasClass('is-selected', 'value is coerced to an array and correct option is selected');
  });

  test('selected option but missing value', async function(assert) {
    assert.expect(4);

    const one = { name: 'One' };
    const two = { name: 'Two' };
    const three = { name: 'Three' };
    const four = { name: 'Four' };

    this.set('items', [one, two, three]);
    this.set('value', two);

    await render(hbs`
      <SelectBox @value={{this.value}} as |sb|>
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

    assert.dom('.select-box-selected-option').hasText('Two',
      'correct selected option is yielded');

    this.set('value', four);

    assert.dom('.select-box-selected-option').hasText('Four',
      'yielded selected option is available despite not being an option ' +
      '(internal value is the value passed in as an argument)');

    await click('.select-box-option:nth-child(2)');

    assert.dom('.select-box-selected-option').hasText('Two',
      'precondition');

    this.set('items', [one, three]);

    assert.dom('.select-box-selected-option').hasText('Two',
      'selected value is retained, despite not being an option ' +
      '(internal value is the value that was selected');
  });

  test('press enter to select active option', async function(assert) {
    assert.expect(2);

    this.set('selected', value => {
      assert.equal(value, 'bar', 'the select box acknowledges the selection');
    });

    this.set('selectedBar', value => {
      assert.equal(value, 'bar', 'the selected option acknowledges the selection');
    });

    await render(hbs`
      <SelectBox @onSelect={{this.selected}} as |sb|>
        <sb.Option @value="foo" />
        <sb.Option @value="bar" @onSelect={{this.selectedBar}} />
      </SelectBox>
    `);

    await triggerEvent(findAll('.select-box-option')[1], 'mouseover');
    await triggerKeyEvent('.select-box', 'keydown', 13);
  });

  test('selecting via the api', async function(assert) {
    assert.expect(3);

    let selected;
    let selectedFoo;
    let updated;

    this.set('selected', value => (selected = value));
    this.set('selectedFoo', value => (selectedFoo = value));
    this.set('updated', value => (updated = value));

    await render(hbs`
      <SelectBox @onSelect={{this.selected}} @onUpdate={{this.updated}} as |sb|>
        <sb.Option @value="foo" @onSelect={{this.selectedFoo}} />
        <button onclick={{action sb.select "foo"}}>Select foo</button>
      </SelectBox>
    `);

    await click('button');

    assert.strictEqual(
      selected,
      'foo',
      'the select box acknowledges the selection and sends an action'
    );

    assert.strictEqual(selectedFoo, undefined, 'the option does not fire its onSelect action');

    assert.strictEqual(
      updated,
      'foo',
      'the select box sends and update action after the selection has been made'
    );
  });

  test('updating via the api', async function(assert) {
    assert.expect(3);

    let updated;
    let selected;

    this.set('updated', value => (updated = value));
    this.set('selected', value => (selected = value));

    await render(hbs`
      <SelectBox @onUpdate={{this.updated}} @onSelect={{this.selected}} as |sb|>
        <sb.Option @value="foo">Foo</sb.Option>
        <sb.Option @value="bar">Bar</sb.Option>
        <button onclick={{action sb.update "foo"}}>Select foo</button>
        <button onclick={{action sb.update "bar"}}>Select bar</button>
      </SelectBox>
    `);

    await click(findAll('button')[1]);

    assert.strictEqual(updated, 'bar', 'has fired initial updated action');

    assert.strictEqual(selected, undefined, 'has not fired a select action');

    assert
      .dom('.select-box-option.is-selected')
      .hasText('Bar', "select box's internal value is updated with the value");
  });

  test('manual selection', async function(assert) {
    assert.expect(3);

    this.set('barSelected', true);

    await render(hbs`
      <SelectBox @value="baz" as |sb|>
        <sb.Option @value="foo">Foo</sb.Option>
        {{#sb.Option value="bar" selected=this.barSelected}}Bar{{/sb.Option}}
        {{#sb.Option value="baz" selected=false}}Baz{{/sb.Option}}
      </SelectBox>
    `);

    const bar = findAll('.select-box-option')[1];
    const baz = findAll('.select-box-option')[2];

    assert.dom(bar).hasClass('is-selected', 'manually selected options are selected');

    assert.ok(
      !baz.classList.contains('is-selected'),
      'initially selected options are not selected if manually overridden'
    );

    this.set('barSelected', false);

    assert.ok(!bar.classList.contains('is-selected'), 'can manually deselect an option');
  });

  test('usage with mut helper', async function(assert) {
    assert.expect(2);

    this.set('external', null);

    await render(hbs`
      external: {{this.external}}
      <SelectBox @onSelect={{action (mut this.external)}} as |sb|>
        internal: {{sb.value}}
        <sb.Option @value="foo">Foo</sb.Option>
        <sb.Option @value="bar">Bar</sb.Option>
      </SelectBox>
    `);

    await click(findAll('.select-box-option')[1]);

    assert.ok(
      this.element.textContent.match('external: bar'),
      'mut helper updates the external value'
    );

    assert.ok(
      find('.select-box').textContent.match('internal: bar'),
      'internal value is updated (regression test)'
    );
  });

  test('with disabled options', async function(assert) {
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

    this.set('selected', value => {
      selected++;
      lastSelectedValue = value;
    });

    this.set('value', ['foo']);

    await render(hbs`
      <SelectBox @value={{this.value}} @multiple={{true}} @onSelect={{this.selected}} as |sb|>
        <sb.Option @value="foo" @disabled={{true}} />
        <sb.Option @value="bar" />
        <sb.Option @value="baz" />
        <sb.Option @value="baz" @disabled={{true}} />
      </SelectBox>
    `);

    assert
      .dom(findAll('.select-box-option')[0])
      .hasClass(
        'is-selected',
        'option that is disabled, is intentionally still marked as selected (by value)'
      );

    await click(findAll('.select-box-option')[3]);

    assert.equal(selected, 0, 'does not fire select action if option is disabled');

    assert.ok(
      !findAll('.select-box-option')[3].classList.contains('is-selected'),
      'option is not selected, due to being disabled'
    );

    await click(findAll('.select-box-option')[1]);

    assert.deepEqual(
      lastSelectedValue,
      ['foo', 'bar'],
      'disabled option values are still out as a selection'
    );

    await click(findAll('.select-box-option')[2]);

    assert
      .dom(findAll('.select-box-option')[2])
      .hasClass('is-selected', 'option is selected (by value)');
  });

  test('changing arguments other than value', async function(assert) {
    assert.expect(1);

    let updated = 0;

    this.set('updated', () => {
      updated++;
    });

    await render(hbs`
      {{! Intentionally not angle brackets }}
      {{#select-box value="foo" aria-label=this.ariaLabel onUpdate=this.updated as |sb|}}
        {{sb.Option value="foo"}}
        {{sb.Option value="bar"}}
      {{/select-box}}
    `);

    this.set('ariaLabel', 'Choice');

    assert.equal(updated, 1, "does not fire update action when the value hasn't actually updated");
  });

  test('a single value with a multiple choice select box', async function(assert) {
    assert.expect(2);

    this.set('value', 'bar');

    await render(hbs`
      <SelectBox @value={{this.value}} @multiple={{true}} as |sb|>
        <sb.Option @value="foo">Foo</sb.Option>
        <sb.Option @value="bar">Bar</sb.Option>
      </SelectBox>
    `);

    assert.dom('.select-box-option.is-selected').hasText('Bar', 'works as expected');

    this.set('value', 'foo');

    assert.dom('.select-box-option.is-selected').hasText('Foo', 'updating the value works');
  });

  test('multiple values with a single choice select box', async function(assert) {
    assert.expect(1);

    this.set('values', ['bar', 'baz']);

    await render(hbs`
      <SelectBox @value={{this.values}} as |sb|>
        <sb.Option @value="foo" />
        <sb.Option @value="bar" />
        <sb.Option @value="baz" />
      </SelectBox>
    `);

    assert.dom('.select-box-option.is-selected').doesNotExist('works as expected');
  });

  test('adding and removing items to a multiple select box', async function(assert) {
    assert.expect(1);

    this.set('values', emberA(['bar']));

    await render(hbs`
      <SelectBox @value={{this.values}} @multiple={{true}} as |sb|>
        <sb.Option @value="foo" />
        <sb.Option @value="bar" />
        <sb.Option @value="baz" />
      </SelectBox>
    `);

    this.values.addObject('baz');

    assert
      .dom('.select-box-option.is-selected')
      .exists(
        { count: 1 },
        'changes to the multiple choice values does not update the select box ' +
          'the entire array must be replaced (the value should be considered a _new_ value)'
      );
  });

  test('yielded selected value', async function(assert) {
    assert.expect(3);

    let yieldedValue;

    this.set('value', emberA(['foo', 'bar']));

    this.set('inspect', value => (yieldedValue = value));

    await render(hbs`
      <SelectBox @multiple={{true}} @value={{this.value}} as |sb|>
        <sb.Option @value="foo" />
        <sb.Option @value="bar" />
        <button onclick={{action this.inspect sb.value}}>inspect</button>
      </SelectBox>
    `);

    await click('button');

    assert.throws(() => yieldedValue.push('baz'));

    assert.ok(isFrozen(yieldedValue), 'yields frozen value in template');

    assert.strictEqual(
      EmberArray.detect(yieldedValue),
      false,
      'the yielded api value is not the original array (or an ember array)'
    );
  });

  test('customising selection', async function(assert) {
    assert.expect(9);

    let sb;
    let arg1;
    let arg2;
    let calledBuild = 0;

    this.set('value', ['foo', 'bar']);

    this.set('buildSelection', (value1, value2) => {
      calledBuild++;

      arg1 = value1;
      arg2 = value2;

      return ['baz'];
    });

    this.set('register', api => {
      sb = api;
    });

    await render(hbs`
      <SelectBox
        @multiple={{true}}
        @value={{this.value}}
        @onBuildSelection={{this.buildSelection}}
        @onInit={{this.register}} as |sb|>
        <sb.Option @value="foo">Foo</sb.Option>
        <sb.Option @value="bar">Bar</sb.Option>
        <sb.Option @value="baz">Baz</sb.Option>
        <sb.Option @value="qux">Qux</sb.Option>
      </SelectBox>
    `);

    await click(findAll('.select-box-option')[0]);

    assert
      .dom('.select-box-option.is-selected')
      .hasText('Baz', 'selection used is the selection returned from onBuildSelection');

    await settled();

    assert.deepEqual(sb.value, ['baz'], 'value is correct');

    assert.strictEqual(arg1, 'foo', 'first argument is the value selected');

    assert.deepEqual(arg2, ['foo', 'bar'], 'second argument is the currently selected value');

    sb.update(['bar']);

    await settled();

    assert.equal(
      calledBuild,
      1,
      'updating the selected value via the api does not trigger build selection'
    );

    assert.dom('.select-box-option.is-selected').hasText('Bar', 'update still works');

    sb.select(['qux']);

    await settled();

    assert.equal(
      calledBuild,
      1,
      'selecting a selected value via the api does not trigger build selection'
    );

    assert.dom('.select-box-option.is-selected').hasText('Qux', 'select still works');

    assert.deepEqual(sb.value, ['qux'], 'value is correct');
  });

  test('selecting active via api', async function(assert) {
    assert.expect(1);

    let sb;
    let selectedValue;

    this.set('select', value => (selectedValue = value));
    this.set('registerApi', api => (sb = api));

    await render(hbs`
      <SelectBox @onInit={{this.registerApi}} @onSelect={{this.select}} as |sb|>
        <sb.Option @value="foo" />
        <sb.Option @value="bar" />
      </SelectBox>
    `);

    await triggerEvent(findAll('.select-box-option')[1], 'mouseover');

    sb.selectActiveOption();

    await settled();

    assert.equal(selectedValue, 'bar', 'can select the active option via the api');
  });

  test('default values', async function(assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Option />
        <sb.Option />
      </SelectBox>
    `);

    assert
      .dom('.select-box-option.is-selected')
      .exists({ count: 2 }, "select box's default value and options' default value is undefined");
  });

  test('selecting a failed value', async function(assert) {
    assert.expect(1);

    let selectedValue;

    const deferred = defer();

    this.set('selected', value => (selectedValue = value));

    this.set('promise', deferred.promise);

    await render(hbs`
      <SelectBox @onSelect={{this.selected}} as |sb|>
        <sb.Option @value={{this.promise}} />
      </SelectBox>
    `);

    deferred.reject('Fail');

    await settled();

    await click('.select-box-option');

    assert.equal(
      selectedValue,
      'Fail',
      'selecting a value whose promise rejected, selects the rejection reason'
    );
  });
});
