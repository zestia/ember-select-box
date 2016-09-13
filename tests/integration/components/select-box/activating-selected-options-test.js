import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('', 'select-box (activating selected options)', {
  integration: true
});


test('activating selected options', function(assert) {
  assert.expect(5);

  this.render(hbs`
    {{#select-box as |sb|}}
      {{#sb.selected-options}}
        {{#sb.selected-option
          click=(action sb.activateSelectedOptionAtIndex 0)~}}
          One
        {{~/sb.selected-option}}
        {{#sb.selected-option
          click=(action sb.activateSelectedOptionAtIndex 1)~}}
          Two
        {{/sb.selected-option}}
      {{/sb.selected-options}}
    {{/select-box}}
  `);

  let $selectedOptions = this.$('.select-box-selected-options');
  let $one = this.$('.select-box-selected-option:eq(0)');
  let $two = this.$('.select-box-selected-option:eq(1)');

  assert.equal(this.$('.select-box-selected-option.is-active').length, 0,
    'precondition, there are no active selected options');

  $one.trigger('click');

  assert.ok($one.hasClass('is-active'),
    'selected option gets an active class name');

  let [id] = $selectedOptions.attr('aria-activedescendant').match(/\d+/);

  assert.equal(
    this.$('.select-box-selected-option[aria-current="true"]').text(), 'One',
    'receives an aria current attribute when active'
  );

  assert.ok(id,
    'active selected option id is added to the selected options container');

  $two.trigger('click');

  let [nextID] = $selectedOptions.attr('aria-activedescendant').match(/\d+/);

  assert.notEqual(id, nextID,
    'the active descendant is updated');
});
