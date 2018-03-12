import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll, triggerEvent, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (activating options)', function(hooks) {
  setupRenderingTest(hooks);

  test('mouseover activates options', async function(assert) {
    assert.expect(6);

    await render(hbs`
      {{#select-box as |sb|}}
        {{#sb.options}}
          {{#sb.option value=1}}One{{/sb.option}}
          {{#sb.option value=2}}Two{{/sb.option}}
        {{/sb.options}}
      {{/select-box}}
    `);

    const options = find('.select-box-options');
    const one = findAll('.select-box-option')[0];
    const two = findAll('.select-box-option')[1];

    assert.equal(findAll('.select-box-option.is-active').length, 0,
      'precondition, there are no active options');

    await triggerEvent(one, 'mouseover');

    assert.ok(one.classList.contains('is-active'),
      'mousing over an option gives it an active class name');

    const [id] = options.getAttribute('aria-activedescendant').match(/\d+/);

    assert.ok(id,
      'active option id is added to the options container');

    assert.equal(find('.select-box-option[aria-current]').textContent, 'One',
      'receives an aria current attribute when active');

    await triggerEvent(two, 'mouseover');

    const [nextID] = options.getAttribute('aria-activedescendant').match(/\d+/);

    assert.notEqual(id, nextID,
      'the active descendant is updated');

    assert.ok(!one.classList.contains('is-active') && two.classList.contains('is-active'),
      'mousing over another option moves the active class');
  });

  test('activating via the api', async function(assert) {
    assert.expect(2);

    this.set('activated', (value, sb) => {
      assert.equal(value, 'foo',
        'activating an option sends an action with the value');

      assert.ok(typeof sb === 'object',
        'sends the api');
    });

    await render(hbs`
      {{#select-box as |sb|}}
        {{sb.option value="foo" on-activate=(action activated)}}
        <button onclick={{action sb.activateOptionAtIndex 0}}>Activate foo</button>
      {{/select-box}}
    `);

    await click('button');
  });
});
