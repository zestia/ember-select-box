import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';
const { from } = Array;

module('select-box/option', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Option />`);

    assert
      .dom('div.select-box-option')
      .exists({ count: 1 }, 'renders with correct class name and tag');
  });

  test('class prefix', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Option @classNamePrefix="foo" />`);

    assert
      .dom('.foo-option')
      .exists({ count: 1 }, 'can override the class prefix');
  });

  test('aria role', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Option />`);

    assert
      .dom('.select-box-option')
      .hasAttribute(
        'role',
        'option',
        'a select box option has an appropriate aria role'
      );
  });

  test('disabled', async function(assert) {
    assert.expect(2);

    await render(hbs`<SelectBox::Option @disabled={{true}} />`);

    assert
      .dom('.select-box-option')
      .hasClass('is-disabled', 'an option can be flagged as disabled');

    assert.dom('.select-box-option').hasAttribute('aria-disabled', 'true');
  });

  test('aria selected', async function(assert) {
    assert.expect(4);

    this.set('value', 1);

    await render(hbs`
      <SelectBox @value={{this.value}} as |sb|>
        <sb.Option @value={{1}}>One</sb.Option>
        <sb.Option @value={{2}}>Two</sb.Option>
      </SelectBox>
    `);

    assert
      .dom('.select-box-option:nth-child(1)[aria-selected]')
      .hasText(
        'One',
        'the selected option receives an aria selected attribute'
      );

    assert
      .dom('.select-box-option:nth-child(1)[aria-selected]')
      .hasAttribute(
        'aria-selected',
        'true',
        'has correct string value when selected'
      );

    this.set('value', 2);

    assert
      .dom('.select-box-option:nth-child(2)[aria-selected]')
      .hasText(
        'Two',
        'the aria selected attribute is redetermined when the value changes'
      );

    assert
      .dom('.select-box-option:nth-child(2)[aria-selected]')
      .hasAttribute(
        'aria-selected',
        'true',
        'has correct string value when selected'
      );
  });

  test('yield index', async function(assert) {
    assert.expect(2);

    const foo = { myValue: 'foo', myLabel: 'Foo' };
    const bar = { myValue: 'bar', myLabel: 'Bar' };
    const baz = { myValue: 'baz', myLabel: 'Baz' };
    const qux = { myValue: 'qux', myLabel: 'Qux' };

    this.set('group1', [foo, bar]);
    this.set('group2', [baz, qux]);
    this.set('selectedValue', baz);

    await render(hbs`
      <SelectBox @value={{this.selectedValue}} as |sb|>
        <sb.Group @label="Group 1">
          {{#each this.group1 as |item i|}}
            <sb.Option @value={{item}} as |o|>
              {{o.value.myLabel}} {{i}} {{o.index}} {{o.isSelected}}
            </sb.Option>
          {{/each}}
        </sb.Group>
        <sb.Group @label="Group 2">
          {{#each this.group2 as |item i|}}
            <sb.Option @value={{item}} as |o|>
              {{o.value.myLabel}} {{i}} {{o.index}} {{o.isSelected}}
            </sb.Option>
          {{/each}}
        </sb.Group>
      </SelectBox>
    `);

    assert.ok(
      findAll('.select-box-option')[0].textContent.trim() === 'Foo 0 0 false' &&
        findAll('.select-box-option')[1].textContent.trim() ===
          'Bar 1 1 false' &&
        findAll('.select-box-option')[2].textContent.trim() ===
          'Baz 0 2 true' &&
        findAll('.select-box-option')[3].textContent.trim() === 'Qux 1 3 false',
      'select box options can yield their label, value, index and selected state'
    );

    this.set('group2', [qux, baz]);

    assert.ok(
      findAll('.select-box-option')[0].textContent.trim() === 'Foo 0 0 false' &&
        findAll('.select-box-option')[1].textContent.trim() ===
          'Bar 1 1 false' &&
        findAll('.select-box-option')[2].textContent.trim() ===
          'Qux 0 3 false' &&
        findAll('.select-box-option')[3].textContent.trim() === 'Baz 1 2 true',
      'index gets out of sync due to lack of key="@index"'
    );
  });

  test('yield index', async function(assert) {
    assert.expect(4);

    const labels = () => {
      return from(findAll('.select-box-option')).map(o => o.textContent.trim());
    };

    this.set('values', ['foo', 'bar', 'baz']);

    await render(hbs`
      <SelectBox @value="baz" as |sb|>
        {{#each this.values as |value|}}
          <sb.Option @value={{value}} as |o|>
            {{o.value}}: {{o.index}}
          </sb.Option>
        {{/each}}
      </SelectBox>
    `);

    assert.deepEqual(
      labels(),
      ['foo: 0', 'bar: 1', 'baz: 2'],
      'precondition, indexes are correct'
    );

    this.set('values', ['foo', 'baz']);
    this.set('values', ['foo', 'bar', 'baz']);

    assert.deepEqual(
      labels(),
      ['foo: 0', 'bar: 2', 'baz: 1'],
      'indexes are wrong due to component re-use'
    );

    await render(hbs`
      <SelectBox @value="baz" as |sb|>
        {{#each this.values key="@index" as |value|}}
          <sb.Option @value={{value}} as |o|>
            {{o.value}}: {{o.index}}
          </sb.Option>
        {{/each}}
      </SelectBox>
    `);

    assert.deepEqual(
      labels(),
      ['foo: 0', 'bar: 1', 'baz: 2'],
      'precondition, indexes are correct'
    );

    this.set('values', ['foo', 'baz']);
    this.set('values', ['foo', 'bar', 'baz']);

    assert.deepEqual(
      labels(),
      ['foo: 0', 'bar: 1', 'baz: 2'],
      'indexes are correct due to key on each'
    );
  });

  test('yield disabled', async function(assert) {
    assert.expect(2);

    this.set('fooDisabled', true);

    await render(hbs`
      <SelectBox::Option @disabled={{this.fooDisabled}} as |o|>
        foo {{if o.isDisabled "disabled"}}
      </SelectBox::Option>
    `);

    assert
      .dom('.select-box-option')
      .hasText('foo disabled', 'yields disabled state');

    this.set('fooDisabled', false);

    assert
      .dom('.select-box-option')
      .hasText('foo', 'disabled state is updated');
  });

  test('yielded promise state', async function(assert) {
    assert.expect(4);

    const deferred1 = defer();
    const deferred2 = defer();

    this.set('promise', deferred1.promise);

    await render(hbs`
      <SelectBox::Option @value={{this.promise}} as |o|>
        isPending: {{o.isPending}}<br>
        isRejected: {{o.isRejected}}<br>
        isFulfilled: {{o.isFulfilled}}<br>
        isSettled: {{o.isSettled}}<br>
      </SelectBox::Option>
    `);

    assert.dom(this.element).hasText(`
        isPending: true
        isRejected: false
        isFulfilled: false
        isSettled: false
    `);

    deferred1.resolve('foo');
    await settled();

    assert.dom(this.element).hasText(`
        isPending: false
        isRejected: false
        isFulfilled: true
        isSettled: true
    `);

    this.set('promise', deferred2.promise);

    assert.dom(this.element).hasText(`
        isPending: true
        isRejected: false
        isFulfilled: false
        isSettled: false
    `);

    deferred2.reject('bar');
    await settled();

    assert.dom(this.element).hasText(`
        isPending: false
        isRejected: true
        isFulfilled: false
        isSettled: true
    `);
  });

  test('promise value (aria busy)', async function(assert) {
    assert.expect(2);

    const deferred = defer();

    this.set('promise', deferred.promise);

    await render(hbs`<SelectBox::Option @value={{this.promise}} />`);

    assert
      .dom('.select-box-option')
      .hasAttribute(
        'aria-busy',
        'true',
        'select box option has busy attribute when resolving promise'
      );

    deferred.resolve();

    await settled();

    assert
      .dom('.select-box-option')
      .hasAttribute(
        'aria-busy',
        'false',
        'select box option no longer has busy attribute when promise has resolved'
      );
  });
});
