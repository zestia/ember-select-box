import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Component from 'ember-component';

moduleForComponent('', 'select-box/selected-option', {
  integration: true
});


test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/selected-option}}`);

  assert.equal(this.$('div.select-box-selected-option').length, 1,
    'renders with correct class name and tag');
});


test('class prefix', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/selected-option class-prefix='foo'}}`);

  assert.equal(this.$('.foo-select-box-selected-option').length, 1,
    'can add a class prefix');
});


test('title', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/selected-option title='Foo'}}`);

  assert.equal(this.$('.select-box-selected-option').attr('title'), 'Foo',
    'a selected option can have a title attribute');
});


test('style', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/selected-option style='color:red<script>'}}`);

  assert.ok(this.$().html().match('style="color:red&amp;lt;script&amp;gt;"'),
    'a selected option can be styled, value is escaped');
});


test('component attr', function(assert) {
  assert.expect(1);

  this.registry.register('component:x-foo', Component.extend({
    layout: hbs`Foo:{{label}}`,
    classNames: ['x-foo']
  }));

  this.render(hbs `
    {{select-box/selected-option value=123 label=456 component='x-foo'}}
  `);

  assert.ok(
    this.$('.select-box-selected-option > .x-foo').text().match('Foo:456'),
    'can specify a component to render inside the selected option'
  );
});


test('yield', function(assert) {
  assert.expect(1);

  this.set('selectedItems', [
    { myValue: 'foo', myLabel: 'Foo' },
    { myValue: 'bar', myLabel: 'Bar' }
  ]);

  this.render(hbs`
    {{#select-box as |sb|}}
      {{#each selectedItems as |item|}}
        {{#sb.selected-option value=item.myValue label=item.myLabel as |so|~}}
          {{so.label}}={{so.value}} ({{so.index}})
        {{~/sb.selected-option}}
      {{/each}}
    {{/select-box}}
  `);

  assert.ok(
    this.$('.select-box-selected-option:eq(0)').text() === 'Foo=foo (0)' &&
    this.$('.select-box-selected-option:eq(1)').text() === 'Bar=bar (1)',
    'selected options can yield their label, value & index'
  );
});
