import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('', 'select-box (disabling)', {
  integration: true
});


test('disabled class name', function(assert) {
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
