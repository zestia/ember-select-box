import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, findAll, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';

module('select-box/option', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Option />`);

    assert
      .dom('.select-box__option')
      .hasTagName('div', 'renders with correct class name and tag');
  });

  test('role', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Option />`);

    assert
      .dom('.select-box__option')
      .hasAttribute('role', 'option', 'defined as an option');
  });

  test('id', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Option />`);

    assert.ok(
      find('.select-box__option')
        .getAttribute('id')
        .match(/select-box-el-\d+/),
      'gets a unique id'
    );
  });

  test('disabled', async function (assert) {
    assert.expect(2);

    await render(hbs`<SelectBox::Option @disabled={{true}} />`);

    assert
      .dom('.select-box__option')
      .hasAttribute(
        'aria-disabled',
        'true',
        'an option can be flagged as disabled'
      );

    assert.dom('.select-box__option').hasAttribute('aria-disabled', 'true');
  });

  test('aria selected', async function (assert) {
    assert.expect(4);

    this.myValue = 1;

    await render(hbs`
      <SelectBox @value={{this.myValue}} as |sb|>
        <sb.Option @value={{1}}>One</sb.Option>
        <sb.Option @value={{2}}>Two</sb.Option>
      </SelectBox>
    `);

    assert
      .dom('.select-box__option:nth-child(1)[aria-selected]')
      .hasText(
        'One',
        'the selected option receives an aria selected attribute'
      );

    assert
      .dom('.select-box__option:nth-child(1)[aria-selected]')
      .hasAttribute(
        'aria-selected',
        'true',
        'has correct string value when selected'
      );

    this.set('myValue', 2);

    assert
      .dom('.select-box__option:nth-child(2)[aria-selected]')
      .hasText(
        'Two',
        'the aria selected attribute is redetermined when the value changes'
      );

    assert
      .dom('.select-box__option:nth-child(2)[aria-selected]')
      .hasAttribute(
        'aria-selected',
        'true',
        'has correct string value when selected'
      );
  });

  test('yield index failure', async function (assert) {
    // https://ember-twiddle.com/ddae8f58d5175e64577e79d720013cf2

    assert.expect(8);

    const foo = { myValue: 'foo', myLabel: 'Foo' };
    const bar = { myValue: 'bar', myLabel: 'Bar' };
    const baz = { myValue: 'baz', myLabel: 'Baz' };
    const qux = { myValue: 'qux', myLabel: 'Qux' };

    this.group1 = [foo, bar];
    this.group2 = [baz, qux];
    this.myValue = baz;

    await render(hbs`
      <SelectBox @value={{this.myValue}} as |sb|>
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

    // select box options can yield their label, value, index and selected state
    assert.dom(findAll('.select-box__option')[0]).hasText('Foo 0 0 false');
    assert.dom(findAll('.select-box__option')[1]).hasText('Bar 1 1 false');
    assert.dom(findAll('.select-box__option')[2]).hasText('Baz 0 2 true');
    assert.dom(findAll('.select-box__option')[3]).hasText('Qux 1 3 false');

    this.set('group2', [qux, baz]);

    // index gets out of sync due to lack of key="@index"'
    // this is not the responsibility of the addon to fix
    assert.dom(findAll('.select-box__option')[0]).hasText('Foo 0 0 false');
    assert.dom(findAll('.select-box__option')[1]).hasText('Bar 1 1 false');
    assert.dom(findAll('.select-box__option')[2]).hasText('Qux 0 3 false');
    assert.dom(findAll('.select-box__option')[3]).hasText('Baz 1 2 true');
  });

  test('yield index', async function (assert) {
    assert.expect(2);

    const labels = () =>
      [...findAll('.select-box__option')].map((o) => o.textContent.trim());

    this.values = ['foo', 'bar', 'baz'];

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
      ['foo: 0', 'bar: 1', 'baz: 2'],
      'indexes are correct after options change'
    );
  });

  test('yield disabled', async function (assert) {
    assert.expect(2);

    this.fooDisabled = true;

    await render(hbs`
      <SelectBox::Option @disabled={{this.fooDisabled}} as |o|>
        foo {{if o.isDisabled "disabled"}}
      </SelectBox::Option>
    `);

    assert
      .dom('.select-box__option')
      .hasText('foo disabled', 'yields disabled state');

    this.set('fooDisabled', false);

    assert
      .dom('.select-box__option')
      .hasText('foo', 'disabled state is updated');
  });

  test('yielded promise state', async function (assert) {
    assert.expect(4);

    const deferred1 = defer();
    const deferred2 = defer();

    this.promise = deferred1.promise;

    await render(hbs`
      <SelectBox::Option @value={{this.promise}} as |o|>
        isPending: {{o.isPending}}<br>
        isRejected: {{o.isRejected}}<br>
        isFulfilled: {{o.isFulfilled}}<br>
        isSettled: {{o.isSettled}}<br>
      </SelectBox::Option>
    `);

    assert.dom('.select-box__option').hasText(`
        isPending: true
        isRejected: false
        isFulfilled: false
        isSettled: false
    `);

    deferred1.resolve('foo');

    await settled();

    assert.dom('.select-box__option').hasText(`
        isPending: false
        isRejected: false
        isFulfilled: true
        isSettled: true
    `);

    this.set('promise', deferred2.promise);

    assert.dom('.select-box__option').hasText(`
        isPending: true
        isRejected: false
        isFulfilled: false
        isSettled: false
    `);

    deferred2.reject('bar');

    await settled();

    assert.dom('.select-box__option').hasText(`
        isPending: false
        isRejected: true
        isFulfilled: false
        isSettled: true
    `);
  });

  test('promise value (aria busy)', async function (assert) {
    assert.expect(2);

    const deferred = defer();

    this.promise = deferred.promise;

    await render(hbs`<SelectBox::Option @value={{this.promise}} />`);

    assert
      .dom('.select-box__option')
      .hasAttribute(
        'aria-busy',
        'true',
        'select box option has busy attribute when resolving promise'
      );

    deferred.resolve();

    await settled();

    assert
      .dom('.select-box__option')
      .hasAttribute(
        'aria-busy',
        'false',
        'select box option no longer has busy attribute when promise has resolved'
      );
  });
});
