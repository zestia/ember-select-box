import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (activating selected options)', function(hooks) {
  setupRenderingTest(hooks);

  test('activating selected options', async function(assert) {
    assert.expect(5);

    await render(hbs`
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

    const $selectedOptions = this.$('.select-box-selected-options');
    const $one = this.$('.select-box-selected-option:eq(0)');
    const $two = this.$('.select-box-selected-option:eq(1)');

    assert.equal(this.$('.select-box-selected-option.is-active').length, 0,
      'precondition, there are no active selected options');

    $one.trigger('click');

    assert.ok($one.hasClass('is-active'),
      'selected option gets an active class name');

    const [id] = $selectedOptions.attr('aria-activedescendant').match(/\d+/);

    assert.equal(
      this.$('.select-box-selected-option[aria-current]').text(), 'One',
      'receives an aria current attribute when active'
    );

    assert.ok(id,
      'active selected option id is added to the selected options container');

    $two.trigger('click');

    const [nextID] = $selectedOptions.attr('aria-activedescendant').match(/\d+/);

    assert.notEqual(id, nextID,
      'the active descendant is updated');
  });
});
