import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, findAll, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (activating selected options)', function(hooks) {
  setupRenderingTest(hooks);

  test('activating selected options', async function(assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.SelectedOptions>
          {{! Issue: https://github.com/emberjs/rfcs/issues/497 }}

          <sb.SelectedOption {{on "click" (fn sb.activateSelectedOptionAtIndex 0)}}>
            One
          </sb.SelectedOption>
          <sb.SelectedOption {{on "click" (fn sb.activateSelectedOptionAtIndex 1)}}>
            Two
          </sb.SelectedOption>
        </sb.SelectedOptions>
      </SelectBox>
    `);

    const box = find('.select-box');
    const one = findAll('.select-box__selected-option')[0];

    assert
      .dom('.select-box__selected-option--active')
      .doesNotExist('precondition, there are no active selected options');

    await click(one);

    assert
      .dom(box)
      .doesNotHaveAttribute(
        'aria-activedescendant',
        'undefined behaviour, up to developer to manage active descendant ' +
          'using select box API'
      );

    assert
      .dom('.select-box__selected-option--active')
      .hasAttribute(
        'aria-current',
        'true',
        'has correct string value when current'
      );
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
        <button type="button" {{on "click" (fn sb.activateSelectedOptionAtIndex 0)}}>Activate foo</button>
      </SelectBox>
    `);

    await click('button');
  });
});
