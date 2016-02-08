import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('', 'select-box (disabling)', {
  integration: true
});


test('disabling and enabling', function(assert) {
  assert.expect(4);

  let isDisabled = () => {
    return this.$('.select-box').hasClass('is-disabled');
  };

  this.render(hbs `{{select-box}}`);

  assert.ok(!isDisabled(),
    'enabled by default');

  this.set('isDisabled', true);

  this.render(hbs `{{select-box disabled=isDisabled}}`);

  assert.ok(isDisabled(),
    'can set the disabled state, adding a class name');

  this.set('isDisabled', false);

  assert.ok(!isDisabled(),
    'can change the disabled state, removing the class name');

  this.render(hbs `
    {{#select-box disabled=true as |sb|}}
      {{sb.input}}
    {{/select-box}}
  `);

  assert.ok(this.$('.select-box-input').is(':disabled'),
    "a select box's input element is disabled if the select box is disabled");
});


test('aria disabled', function(assert) {
  assert.expect(2);

  this.set('disabled', true);

  this.render(hbs `{{select-box disabled=disabled}}`);

  assert.ok(this.$('.select-box').attr('aria-disabled'), 'true',
    'receives an aria disabled attribute when disabled');

  this.set('disabled', false);

  assert.ok(this.$('.select-box').attr('aria-disabled'), 'false',
    'aria disabled attribute is removed when enabled');
});