import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('', 'select-box (child component registration)', {
  integration: true
});


test('input', function(assert) {
  assert.expect(1);

  assert.throws(() => {
    this.render(hbs`
      {{#select-box as |sb|}}
        {{sb.input}}
        {{sb.input}}
      {{/select-box}}
    `);
  }, 'throws if more than one input is used');
});


test('options container', function(assert) {
  assert.expect(1);

  assert.throws(() => {
    this.render(hbs`
      {{#select-box as |sb|}}
        {{sb.options}}
        {{sb.options}}
      {{/select-box}}
    `);
  }, 'throws if more than one options container is used');
});


test('selected options container', function(assert) {
  assert.expect(1);

  assert.throws(() => {
    this.render(hbs`
      {{#select-box as |sb|}}
        {{sb.selected-options}}
        {{sb.selected-options}}
      {{/select-box}}
    `);
  }, 'throws if more than one selected-options container is used');
});