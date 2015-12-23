import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('', 'select-box (activating options)', {
  integration: true
});


test('mouseover activates options', function(assert) {
  assert.expect(3);

  this.render(hbs`
    {{#select-box as |sb|}}
      {{sb.option}}
      {{sb.option}}
    {{/select-box}}
  `);

  let $one = this.$('.select-box-option:eq(0)');
  let $two = this.$('.select-box-option:eq(1)');

  assert.equal(this.$('.select-box-option.is-active').length, 0,
    'precondition, there are no active options');

  $one.trigger('mouseover');

  assert.ok($one.hasClass('is-active'),
    'mousing over an option gives it an active class name');

  $two.trigger('mouseover');

  assert.ok(!$one.hasClass('is-active') && $two.hasClass('is-active'),
    'mousing over another option moves the active class');
});
