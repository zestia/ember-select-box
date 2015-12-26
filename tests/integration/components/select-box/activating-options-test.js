import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('', 'select-box (activating options)', {
  integration: true
});


test('mouseover activates options', function(assert) {
  assert.expect(5);

  this.render(hbs`
    {{#select-box as |sb|}}
      {{#sb.options}}
        {{sb.option}}
        {{sb.option}}
      {{/sb.options}}
    {{/select-box}}
  `);

  let $options = this.$('.select-box-options');
  let $one = this.$('.select-box-option:eq(0)');
  let $two = this.$('.select-box-option:eq(1)');

  assert.equal(this.$('.select-box-option.is-active').length, 0,
    'precondition, there are no active options');

  $one.trigger('mouseover');

  assert.ok($one.hasClass('is-active'),
    'mousing over an option gives it an active class name');

  let [id] = $options.attr('aria-activedescendant').match(/\d+/);

  assert.ok(id,
    'active option id is added to the options container');

  $two.trigger('mouseover');

  let [nextID] = $options.attr('aria-activedescendant').match(/\d+/);

  assert.notEqual(id, nextID,
    'the active descendant is updated');

  assert.ok(!$one.hasClass('is-active') && $two.hasClass('is-active'),
    'mousing over another option moves the active class');
});
