import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, findAll, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';

module('native-select-box/option', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`<NativeSelectBox::Option />`);

    assert
      .dom('option.select-box__option')
      .exists({ count: 1 }, 'renders with correct class name and tag');
  });

  test('data component attribute', async function(assert) {
    assert.expect(1);

    await render(hbs`<NativeSelectBox::Option />`);

    assert
      .dom('[data-component="option"]')
      .exists(
        { count: 1 },
        'does not have a data attribute signifying its type'
      );
  });

  test('value', async function(assert) {
    assert.expect(2);

    this.set('myValue', 123);

    await render(hbs`<NativeSelectBox::Option @value={{this.myValue}} />`);

    assert
      .dom('.select-box__option')
      .hasAttribute(
        'value',
        '123',
        'the specified value argument is set as an HTML attribute'
      );

    this.set('myValue', 456);

    assert
      .dom('.select-box__option')
      .hasAttribute(
        'value',
        '456',
        'changing the value argument updates the HTML attribute'
      );
  });

  test('promise value', async function(assert) {
    assert.expect(4);

    const deferred = defer();

    this.set('myValue', deferred.promise);

    await render(hbs`
      <NativeSelectBox::Option @value={{this.myValue}} as |o|>
        {{this.myValue}}: {{o.value}}
      </NativeSelectBox::Option>
    `);

    assert
      .dom('.select-box__option')
      .hasText(
        '[object Object]: [object Object]',
        'the value is as you would expect (yields unresolved value)'
      );

    deferred.resolve('123');

    await settled();

    assert
      .dom('.select-box__option')
      .hasText('[object Object]: 123', 'the value is resolved');

    assert.deepEqual(this.myValue, deferred.promise, 'does not mutate value');

    assert.notEqual(this.myValue, '123', 'sanity check');
  });

  test('block label', async function(assert) {
    assert.expect(1);

    await render(hbs`<NativeSelectBox::Option>Foo</NativeSelectBox::Option>`);

    assert.strictEqual(
      find('.select-box__option').textContent,
      'Foo',
      'renders the label inside the option element (correct whitespace)'
    );
  });

  test('yield', async function(assert) {
    assert.expect(1);

    this.set('items', ['foo', 'bar']);

    await render(hbs`
      <NativeSelectBox @value="foo" as |sb|>
        {{#each this.items as |item|}}
          <sb.Option @value={{item}} as |o|>
            {{o.index}}={{o.value}}
          </sb.Option>
        {{/each}}
      </NativeSelectBox>
    `);

    assert.ok(
      findAll('.select-box__option')[0].textContent.trim() === '0=foo' &&
        findAll('.select-box__option')[1].textContent.trim() === '1=bar',
      'native options can yield their index & value'
    );
  });
});
