import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box/option', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/option}}`);

    assert.equal(this.$('div.select-box-option').length, 1,
      'renders with correct class name and tag');
  });

  test('class prefix', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/option class-prefix="foo"}}`);

    assert.equal(this.$('.foo-option').length, 1,
      'can override the class prefix');
  });

  test('aria role', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/option}}`);

    assert.equal(this.$('.select-box-option').attr('role'), 'option',
      'a select box option has an appropriate aria role');
  });

  test('title', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/option title="Foo"}}`);

    assert.equal(this.$('.select-box-option').attr('title'), 'Foo',
      'a select box option can have a title attribute');
  });

  test('style', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/option style="color:red<script>"}}`);

    assert.ok(this.$().html().match('style="color:red&amp;lt;script&amp;gt;"'),
      'an option can be styled, value is escaped');
  });

  test('disabled', async function(assert) {
    assert.expect(1);

    await render(hbs `{{select-box/option disabled=true}}`);

    assert.ok(this.$('.select-box-option[aria-disabled]').hasClass('is-disabled'),
      'an option can be flagged as disabled');
  });

  test('aria selected', async function(assert) {
    assert.expect(2);

    this.set('value', 1);

    await render(hbs `
      {{#select-box value=value as |sb|}}
        {{sb.option value=1 label="One"}}
        {{sb.option value=2 label="Two"}}
      {{/select-box}}
    `);

    assert.equal(this.$('.select-box-option[aria-selected]').text(), 'One',
      'the selected option receives an aria selected attribute');

    this.set('value', 2);

    assert.equal(this.$('.select-box-option[aria-selected]').text(), 'Two',
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

    await render(hbs`
      {{#select-box value="baz" as |sb|}}
        {{#sb.group label="Group 1"}}
          {{#each group1 as |item i|}}
            {{#sb.option value=item.myValue label=item.myLabel as |o|~}}
              {{o.label}}={{o.value}} {{i}} ({{o.index}}) {{o.selected}}
            {{~/sb.option}}
          {{/each}}
        {{/sb.group}}
        {{#sb.group label="Group 2"}}
          {{#each group2 as |item i|}}
            {{#sb.option value=item.myValue label=item.myLabel as |o|~}}
              {{o.label}}={{o.value}} {{i}} ({{o.index}}) {{o.selected}}
            {{~/sb.option}}
          {{/each}}
        {{/sb.group}}
      {{/select-box}}
    `);

    assert.ok(
      this.$('.select-box-option:eq(0)').text() === 'Foo=foo 0 (0) false' &&
      this.$('.select-box-option:eq(1)').text() === 'Bar=bar 1 (1) false' &&
      this.$('.select-box-option:eq(2)').text() === 'Baz=baz 0 (2) true' &&
      this.$('.select-box-option:eq(3)').text() === 'Qux=qux 1 (3) false',
      'select box options can yield their label, value, index and selected state'
    );

    this.set('group2', [qux, baz]);

    assert.ok(
      this.$('.select-box-option:eq(0)').text() === 'Foo=foo 0 (0) false' &&
      this.$('.select-box-option:eq(1)').text() === 'Bar=bar 1 (1) false' &&
      this.$('.select-box-option:eq(2)').text() === 'Qux=qux 0 (3) false' &&
      this.$('.select-box-option:eq(3)').text() === 'Baz=baz 1 (2) true',
      'index gets out of sync due to lack of key="@index"'
    );
  });

  test('yield index', async function(assert) {
    assert.expect(4);

    const labels = () => {
      return this.$('.select-box-option')
        .map((i, o) => o.textContent.trim())
        .toArray();
    };

    this.set('values', ['foo', 'bar', 'baz']);

    await render(hbs`
      {{#select-box value="baz" as |sb|}}
        {{#each values as |value|}}
          {{#sb.option value=value as |o|~}}
            {{value}}: {{o.index}}
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
            {{value}}: {{o.index}}
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
      {{#select-box as |sb|}}
        {{#sb.option disabled=fooDisabled as |o|}}
          foo {{if o.disabled "disabled"}}
        {{/sb.option}}
      {{/select-box}}
    `);

    assert.equal(this.$('.select-box-option').text().trim(), 'foo disabled',
      'yields disabled state');

    this.set('fooDisabled', false);

    assert.equal(this.$('.select-box-option').text().trim(), 'foo',
      'disabled state is updated');
  });
});
