import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';

module('select-box/native/option', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/native/option}}`);

    assert.equal(this.$('option.select-box-option').length, 1,
      'renders with correct class name and tag');
  });

  test('class prefix', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/native/option class-prefix="foo"}}`);

    assert.equal(this.$('.foo-option').length, 1,
      'can override the class prefix');
  });

  test('title', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/native/option title="Foo"}}`);

    assert.equal(this.$('.select-box-option').attr('title'), 'Foo',
      'a native select box option can have a title attribute');
  });

  test('disabling', async function(assert) {
    assert.expect(2);

    this.set('optionDisabled', true);

    await render(hbs `{{select-box/native/option disabled=optionDisabled}}`);

    assert.ok(this.$('.select-box-option').is(':disabled'),
      'a native select box option can be disabled');

    this.set('optionDisabled', false);

    assert.ok(this.$('.select-box-option').not(':disabled'),
      'a native select box option can be re-enabled');
  });

  test('value', async function(assert) {
    assert.expect(2);

    this.set('myValue', 123);

    await render(hbs `{{select-box/native/option value=myValue}}`);

    assert.strictEqual(this.$('.select-box-option').attr('value'), '123',
      'the specified value is set as an HTML attribute');

    this.set('myValue', 456);

    assert.strictEqual(this.$('.select-box-option').attr('value'), '456',
      'changing the value updates the HTML attribute');
  });

  test('promise value', async function(assert) {
    assert.expect(2);

    const deferred = defer();

    this.set('myValue', deferred.promise);

    await render(hbs `{{select-box/native/option value=myValue}}`);

    deferred.resolve('123');

    await settled();

    assert.strictEqual(this.get('myValue'), deferred.promise,
      'does not mutate value');

    assert.notEqual(this.get('myValue'), '123',
      'sanity check');
  });

  test('block label', async function(assert) {
    assert.expect(1);

    await render(hbs `
      {{#select-box/native/option~}}
        Foo
      {{~/select-box/native/option}}
    `);

    assert.strictEqual(this.$('.select-box-option').text(), 'Foo',
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
      this.$('.select-box-option:eq(0)').text() === '0=foo' &&
      this.$('.select-box-option:eq(1)').text() === '1=bar',
      'native options can yield their index & value'
    );
  });
});
