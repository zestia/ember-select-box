import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Component from 'ember-component';

moduleForComponent('', 'select-box/option', {
  integration: true
});


test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/option}}`);

  assert.equal(this.$('div.select-box-option').length, 1,
    'renders with correct class name and tag');
});


test('class prefix', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/option class-prefix='foo'}}`);

  assert.equal(this.$('.foo-select-box-option').length, 1,
    'can add a class prefix');
});


test('title', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/option title='Foo'}}`);

  assert.equal(this.$('.select-box-option').attr('title'), 'Foo',
    'a select box option can have a title attribute');
});


test('style', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/option style='color:red<script>'}}`);

  assert.ok(this.$().html().match('style="color:red&amp;lt;script&amp;gt;"'),
    'an option can be styled, value is escaped');
});


test('component attr', function(assert) {
  assert.expect(1);

  this.registry.register('component:x-foo', Component.extend({
    layout: hbs`Foo:{{label}}`,
    classNames: ['x-foo']
  }));

  this.render(hbs `
    {{select-box/option value=123 label=456 component='x-foo'}}
  `);

  assert.ok(this.$('.select-box-option > .x-foo').text().match('Foo:456'),
    'can specify a component to render inside the option');
});


test('yield', function(assert) {
  assert.expect(1);

  this.set('items', [
    { myValue: 'foo', myLabel: 'Foo' },
    { myValue: 'bar', myLabel: 'Bar' }
  ]);

  this.render(hbs`
    {{#select-box as |sb|}}
      {{#each items as |item|}}
        {{#sb.option value=item.myValue label=item.myLabel as |o|~}}
          {{o.label}}={{o.value}} ({{o.index}})
        {{~/sb.option}}
      {{/each}}
    {{/select-box}}
  `);

  assert.ok(
    this.$('.select-box-option:eq(0)').text() === 'Foo=foo (0)' &&
    this.$('.select-box-option:eq(1)').text() === 'Bar=bar (1)',
    'select box options can yield their label, value & index'
  );
});
