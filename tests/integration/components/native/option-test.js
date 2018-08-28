import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';

module('select-box/native/option', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/native/option}}`);

    assert.equal(findAll('option.select-box-option').length, 1,
      'renders with correct class name and tag');
  });

  test('class prefix', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/native/option class-prefix="foo"}}`);

    assert.equal(findAll('.foo-option').length, 1,
      'can override the class prefix');
  });

  test('title', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/native/option title="Foo"}}`);

    assert.equal(find('.select-box-option').getAttribute('title'), 'Foo',
      'a native select box option can have a title attribute');
  });

  test('disabling', async function(assert) {
    assert.expect(2);

    this.set('optionDisabled', true);

    await render(hbs `{{select-box/native/option disabled=optionDisabled}}`);

    assert.ok(find('.select-box-option').disabled,
      'a native select box option can be disabled');

    this.set('optionDisabled', false);

    assert.ok(!find('.select-box-option').disabled,
      'a native select box option can be re-enabled');
  });

  test('value', async function(assert) {
    assert.expect(2);

    this.set('myValue', 123);

    await render(hbs `{{select-box/native/option value=myValue}}`);

    assert.strictEqual(find('.select-box-option').getAttribute('value'), '123',
      'the specified value is set as an HTML attribute');

    this.set('myValue', 456);

    assert.strictEqual(find('.select-box-option').getAttribute('value'), '456',
      'changing the value updates the HTML attribute');
  });

  test('promise value', async function(assert) {
    assert.expect(4);

    const deferred = defer();

    this.set('myValue', deferred.promise);

    await render(hbs `
      {{#select-box/native/option value=myValue as |o|}}
        {{~myValue}}: {{o.value~}}
      {{/select-box/native/option}}
    `);

    assert.equal(find('.select-box-option').textContent, '[object Object]: [object Object]',
      'the value is as you would expect');

    deferred.resolve('123');

    await settled();

    assert.equal(find('.select-box-option').textContent, '[object Object]: 123',
      'the value is resolved');

    assert.deepEqual(this.myValue, deferred.promise,
      'does not mutate value');

    assert.notEqual(this.myValue, '123',
      'sanity check');
  });

  test('block label', async function(assert) {
    assert.expect(1);

    await render(hbs `
      {{#select-box/native/option~}}
        Foo
      {{~/select-box/native/option}}
    `);

    assert.strictEqual(find('.select-box-option').textContent, 'Foo',
      'renders the label inside the option element');
  });

  test('yield', async function(assert) {
    assert.expect(1);

    this.set('items', [
      'foo',
      'bar'
    ]);

    await render(hbs`
      {{#select-box/native value="foo" as |sb|}}
        {{#each items as |item|}}
          {{#sb.option value=item as |o|~}}
            {{o.index}}={{o.value}}
          {{~/sb.option}}
        {{/each}}
      {{/select-box/native}}
    `);

    assert.ok(
      findAll('.select-box-option')[0].textContent === '0=foo' &&
      findAll('.select-box-option')[1].textContent === '1=bar',
      'native options can yield their index & value'
    );
  });
});
