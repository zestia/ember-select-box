import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';
const { from } = Array;

module('select-box/option', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/option}}`);

    assert.equal(findAll('div.select-box-option').length, 1,
      'renders with correct class name and tag');
  });

  test('class prefix', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/option class-prefix="foo"}}`);

    assert.equal(findAll('.foo-option').length, 1,
      'can override the class prefix');
  });

  test('aria role', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/option}}`);

    assert.equal(find('.select-box-option').getAttribute('role'), 'option',
      'a select box option has an appropriate aria role');
  });

  test('title', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/option title="Foo"}}`);

    assert.equal(find('.select-box-option').getAttribute('title'), 'Foo',
      'a select box option can have a title attribute');
  });

  test('style', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/option style="color:red<script>"}}`);

    assert.ok(find('.select-box-option').outerHTML.match('style="color:red&amp;lt;script&amp;gt;"'),
      'an option can be styled, value is escaped');
  });

  test('disabled', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/option disabled=true}}`);

    assert.ok(find('.select-box-option[aria-disabled]').classList.contains('is-disabled'),
      'an option can be flagged as disabled');
  });

  test('aria selected', async function(assert) {
    assert.expect(2);

    this.set('value', 1);

    await render(hbs `
      {{#select-box value=value as |sb|}}
        {{#sb.option value=1}}One{{/sb.option}}
        {{#sb.option value=2}}Two{{/sb.option}}
      {{/select-box}}
    `);

    assert.equal(find('.select-box-option[aria-selected]').textContent, 'One',
      'the selected option receives an aria selected attribute');

    this.set('value', 2);

    assert.equal(find('.select-box-option[aria-selected]').textContent, 'Two',
      'the aria selected attribute is redetermined when the value changes');
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
      {{#select-box value=selectedValue as |sb|}}
        {{#sb.group label="Group 1"}}
          {{#each group1 as |item i|}}
            {{#sb.option value=item as |o|~}}
              {{o.value.myLabel}} {{i}} {{o.index}} {{o.isSelected}}
            {{~/sb.option}}
          {{/each}}
        {{/sb.group}}
        {{#sb.group label="Group 2"}}
          {{#each group2 as |item i|}}
            {{#sb.option value=item as |o|~}}
              {{o.value.myLabel}} {{i}} {{o.index}} {{o.isSelected}}
            {{~/sb.option}}
          {{/each}}
        {{/sb.group}}
      {{/select-box}}
    `);

    assert.ok(
      findAll('.select-box-option')[0].textContent === 'Foo 0 0 false' &&
      findAll('.select-box-option')[1].textContent === 'Bar 1 1 false' &&
      findAll('.select-box-option')[2].textContent === 'Baz 0 2 true' &&
      findAll('.select-box-option')[3].textContent === 'Qux 1 3 false',
      'select box options can yield their label, value, index and selected state'
    );

    this.set('group2', [qux, baz]);

    assert.ok(
      findAll('.select-box-option')[0].textContent === 'Foo 0 0 false' &&
      findAll('.select-box-option')[1].textContent === 'Bar 1 1 false' &&
      findAll('.select-box-option')[2].textContent === 'Qux 0 3 false' &&
      findAll('.select-box-option')[3].textContent === 'Baz 1 2 true',
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
      {{#select-box value="baz" as |sb|}}
        {{#each values as |value|}}
          {{#sb.option value=value as |o|~}}
            {{o.value}}: {{o.index}}
          {{~/sb.option}}
        {{/each}}
      {{/select-box}}
    `);

    assert.deepEqual(labels(), ['foo: 0', 'bar: 1', 'baz: 2'],
      'precondition, indexes are correct');

    this.set('values', ['foo', 'baz']);
    this.set('values', ['foo', 'bar', 'baz']);

    assert.deepEqual(labels(), ['foo: 0', 'bar: 2', 'baz: 1'],
      'indexes are wrong due to component re-use');

    await render(hbs`
      {{#select-box value="baz" as |sb|}}
        {{#each values key="@index" as |value|}}
          {{#sb.option value=value as |o|~}}
            {{o.value}}: {{o.index}}
          {{~/sb.option}}
        {{/each}}
      {{/select-box}}
    `);

    assert.deepEqual(labels(), ['foo: 0', 'bar: 1', 'baz: 2'],
      'precondition, indexes are correct');

    this.set('values', ['foo', 'baz']);
    this.set('values', ['foo', 'bar', 'baz']);

    assert.deepEqual(labels(), ['foo: 0', 'bar: 1', 'baz: 2'],
      'indexes are correct due to key on each');
  });

  test('yield disabled', async function(assert) {
    assert.expect(2);

    this.set('fooDisabled', true);

    await render(hbs`
      {{#select-box/option disabled=fooDisabled as |o|}}
        foo {{if o.isDisabled "disabled"}}
      {{/select-box/option}}
    `);

    assert.equal(find('.select-box-option').textContent.trim(), 'foo disabled',
      'yields disabled state');

    this.set('fooDisabled', false);

    assert.equal(find('.select-box-option').textContent.trim(), 'foo',
      'disabled state is updated');
  });

  test('yielded promise state', async function(assert) {
    assert.expect(4);

    const deferred1 = defer();
    const deferred2 = defer();

    this.set('promise', deferred1.promise);

    await render(hbs `
      {{#select-box/option value=promise as |o|}}
        isPending: {{o.isPending}}<br>
        isRejected: {{o.isRejected}}<br>
        isFulfilled: {{o.isFulfilled}}<br>
        isSettled: {{o.isSettled}}<br>
      {{/select-box/option}}
    `);

    assert.equal(this.get('element').textContent, `
        isPending: true
        isRejected: false
        isFulfilled: false
        isSettled: false
    `);

    deferred1.resolve();
    await settled();

    assert.equal(this.get('element').textContent, `
        isPending: false
        isRejected: false
        isFulfilled: true
        isSettled: true
    `);

    this.set('promise', deferred2.promise);

    assert.equal(this.get('element').textContent, `
        isPending: true
        isRejected: false
        isFulfilled: false
        isSettled: false
    `);

    deferred2.reject();
    await settled();

    assert.equal(this.get('element').textContent, `
        isPending: false
        isRejected: true
        isFulfilled: false
        isSettled: true
    `);
  });
});
