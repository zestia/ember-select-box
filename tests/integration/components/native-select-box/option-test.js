import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';

module('native-select-box/option', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`{{native-select-box/option}}`);

    assert
      .dom('option.select-box-option')
      .exists({ count: 1 }, 'renders with correct class name and tag');
  });

  test('class prefix', async function(assert) {
    assert.expect(1);

    await render(hbs`{{native-select-box/option class-prefix="foo"}}`);

    assert.dom('.foo-option').exists({ count: 1 }, 'can override the class prefix');
  });

  test('title', async function(assert) {
    assert.expect(1);

    await render(hbs`{{native-select-box/option title="Foo"}}`);

    assert
      .dom('.select-box-option')
      .hasAttribute('title', 'Foo', 'a native select box option can have a title attribute');
  });

  test('disabling', async function(assert) {
    assert.expect(2);

    this.set('optionDisabled', true);

    await render(hbs`{{native-select-box/option disabled=this.optionDisabled}}`);

    assert.dom('.select-box-option').isDisabled('a native select box option can be disabled');

    this.set('optionDisabled', false);

    assert.ok(!find('.select-box-option').disabled, 'a native select box option can be re-enabled');
  });

  test('value', async function(assert) {
    assert.expect(2);

    this.set('myValue', 123);

    await render(hbs`{{native-select-box/option value=this.myValue}}`);

    assert.strictEqual(
      find('.select-box-option').getAttribute('value'),
      '123',
      'the specified value is set as an HTML attribute'
    );

    this.set('myValue', 456);

    assert.strictEqual(
      find('.select-box-option').getAttribute('value'),
      '456',
      'changing the value updates the HTML attribute'
    );
  });

  test('promise value', async function(assert) {
    assert.expect(4);

    const deferred = defer();

    this.set('myValue', deferred.promise);

    await render(hbs`
      {{#native-select-box/option value=this.myValue as |o|}}
        {{~this.myValue}}: {{o.value~}}
      {{/native-select-box/option}}
    `);

    assert
      .dom('.select-box-option')
      .hasText('[object Object]: [object Object]', 'the value is as you would expect');

    deferred.resolve('123');

    await settled();

    assert.dom('.select-box-option').hasText('[object Object]: 123', 'the value is resolved');

    assert.deepEqual(this.myValue, deferred.promise, 'does not mutate value');

    assert.notEqual(this.myValue, '123', 'sanity check');
  });

  test('block label', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#native-select-box/option~}}
        Foo
      {{~/native-select-box/option}}
    `);

    assert.strictEqual(
      find('.select-box-option').textContent,
      'Foo',
      'renders the label inside the option element'
    );
  });

  test('yield', async function(assert) {
    assert.expect(1);

    this.set('items', ['foo', 'bar']);

    await render(hbs`
      {{#native-select-box value="foo" as |sb|}}
        {{#each this.items as |item|}}
          {{#sb.option value=item as |o|~}}
            {{o.index}}={{o.value}}
          {{~/sb.option}}
        {{/each}}
      {{/native-select-box}}
    `);

    assert.ok(
      findAll('.select-box-option')[0].textContent === '0=foo' &&
        findAll('.select-box-option')[1].textContent === '1=bar',
      'native options can yield their index & value'
    );
  });
});
