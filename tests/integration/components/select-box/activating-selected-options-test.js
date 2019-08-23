import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (activating selected options)', function(hooks) {
  setupRenderingTest(hooks);

  test('activating selected options', async function(assert) {
    assert.expect(6);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.SelectedOptions>
          {{#sb.SelectedOption
            click=(action sb.activateSelectedOptionAtIndex 0)~}}
            One
          {{~/sb.SelectedOption}}
          {{#sb.SelectedOption
            click=(action sb.activateSelectedOptionAtIndex 1)~}}
            Two
          {{/sb.SelectedOption}}
        </sb.SelectedOptions>
      </SelectBox>
    `);

    const selectedOptions = find('.select-box-selected-options');
    const one = findAll('.select-box-selected-option')[0];
    const two = findAll('.select-box-selected-option')[1];

    assert
      .dom('.select-box-selected-option.is-active')
      .doesNotExist('precondition, there are no active selected options');

    await click(one);

    assert
      .dom(one)
      .hasClass('is-active', 'selected option gets an active class name');

    const [id] = selectedOptions
      .getAttribute('aria-activedescendant')
      .match(/\d+/);

    assert
      .dom('.select-box-selected-option[aria-current]')
      .hasText('One', 'receives an aria current attribute when active');

    assert
      .dom('.select-box-selected-option[aria-current]')
      .hasAttribute(
        'aria-current',
        'true',
        'has correct string value when current'
      );

    assert.ok(
      id,
      'active selected option id is added to the selected options container'
    );

    await click(two);

    const [nextID] = selectedOptions
      .getAttribute('aria-activedescendant')
      .match(/\d+/);

    assert.notEqual(id, nextID, 'the active descendant is updated');
  });

  test('activating selected option via the api', async function(assert) {
    assert.expect(2);

    this.set('activated', (value, sb) => {
      assert.equal(
        value,
        'foo',
        'activating an option sends an action with the value'
      );

      assert.ok(typeof sb === 'object', 'sends the api');
    });

    await render(hbs`
      <SelectBox as |sb|>
        <sb.SelectedOption @value="foo" @onActivate={{this.activated}} />
        <button onclick={{action sb.activateSelectedOptionAtIndex 0}}>Activate foo</button>
      </SelectBox>
    `);

    await click('button');
  });
});
