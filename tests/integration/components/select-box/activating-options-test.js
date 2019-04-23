import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  render,
  click,
  find,
  findAll,
  triggerEvent,
  triggerKeyEvent,
  waitUntil,
  getSettledState,
  settled
} from '@ember/test-helpers';

module('select-box (activating options)', function(hooks) {
  setupRenderingTest(hooks);

  test('mouseover activates options', async function(assert) {
    assert.expect(7);

    await render(hbs`
      {{#select-box as |sb|}}
        {{#sb.Options}}
          {{#sb.Option value=1}}One{{/sb.Option}}
          {{#sb.Option value=2}}Two{{/sb.Option}}
        {{/sb.Options}}
      {{/select-box}}
    `);

    const options = find('.select-box-options');
    const one = findAll('.select-box-option')[0];
    const two = findAll('.select-box-option')[1];

    assert
      .dom('.select-box-option.is-active')
      .doesNotExist('precondition, there are no active options');

    await triggerEvent(one, 'mouseover');

    assert.dom(one).hasClass('is-active', 'mousing over an option gives it an active class name');

    const [id] = options.getAttribute('aria-activedescendant').match(/\d+/);

    assert.ok(id, 'active option id is added to the options container');

    assert
      .dom('.select-box-option[aria-current]')
      .hasText('One', 'receives an aria current attribute when active');

    assert.dom('.select-box-option[aria-current]').hasAttribute('aria-current', 'true',
      'has correct string value when current');

    await triggerEvent(two, 'mouseover');

    const [nextID] = options.getAttribute('aria-activedescendant').match(/\d+/);

    assert.notEqual(id, nextID, 'the active descendant is updated');

    assert.ok(
      !one.classList.contains('is-active') && two.classList.contains('is-active'),
      'mousing over another option moves the active class'
    );
  });

  test('activating via the api', async function(assert) {
    assert.expect(2);

    this.set('activated', (value, sb) => {
      assert.equal(value, 'foo', 'activating an option sends an action with the value');

      assert.ok(typeof sb === 'object', 'sends the api');
    });

    await render(hbs`
      {{#select-box as |sb|}}
        {{sb.Option value="foo" onActivate=this.activated}}
        <button onclick={{action sb.activateOptionAtIndex 0}}>Activate foo</button>
      {{/select-box}}
    `);

    await click('button');
  });

  test('activation boundaries', async function(assert) {
    assert.expect(8);

    this.set('navigateDown', (e, sb) => {
      sb.activateNextOption();
    });

    this.set('navigateUp', (e, sb) => {
      sb.activatePreviousOption();
    });

    await render(hbs`
      {{#select-box
        onPressDown=this.navigateDown
        onPressUp=this.navigateUp as |sb|}}
        {{#sb.Option value=1}}One{{/sb.Option}}
        {{#sb.Option value=2}}Two{{/sb.Option}}
        {{#sb.Option value=3}}Three{{/sb.Option}}
      {{/select-box}}
    `);

    assert.ok(!find('.select-box-option.is-active'), 'precondition: nothing active');

    await triggerKeyEvent('.select-box', 'keydown', 40);

    assert.dom('.select-box-option.is-active').hasText('One');

    await triggerKeyEvent('.select-box', 'keydown', 40);

    assert.dom('.select-box-option.is-active').hasText('Two');

    await triggerKeyEvent('.select-box', 'keydown', 40);

    assert.dom('.select-box-option.is-active').hasText('Three');

    await triggerKeyEvent('.select-box', 'keydown', 40);

    assert
      .dom('.select-box-option.is-active')
      .hasText('Three', 'does not cycle back to the beginning when reaching the end');

    await triggerKeyEvent('.select-box', 'keydown', 38);

    assert.dom('.select-box-option.is-active').hasText('Two');

    await triggerKeyEvent('.select-box', 'keydown', 38);

    assert.dom('.select-box-option.is-active').hasText('One');

    await triggerKeyEvent('.select-box', 'keydown', 38);

    assert
      .dom('.select-box-option.is-active')
      .hasText('One', 'does not cycle back to the end when reaching the beginning');
  });

  test('cycling through options', async function(assert) {
    assert.expect(5);

    function _settled() {
      return waitUntil(() => getSettledState().hasRunLoop === false);
    }

    this.set('autoActivate', (e, sb) => {
      sb.activateOptionForKeyCode(e.keyCode);
    });

    await render(hbs`
      {{#select-box onPressKey=this.autoActivate as |sb|}}
        {{#sb.Option value="foo"}}Foo{{/sb.Option}}
        {{#sb.Option value="bar"}}Bar{{/sb.Option}}
        {{#sb.Option value="baz"}}Baz{{/sb.Option}}
      {{/select-box}}
    `);

    triggerKeyEvent('.select-box', 'keydown', 66); // B

    await _settled();

    assert.dom('.select-box-option.is-active').hasText('Bar');

    triggerKeyEvent('.select-box', 'keydown', 66); // B

    await _settled();

    assert.dom('.select-box-option.is-active').hasText('Baz');

    triggerKeyEvent('.select-box', 'keydown', 66); // B

    await _settled();

    assert.dom('.select-box-option.is-active').hasText('Bar');

    triggerKeyEvent('.select-box', 'keydown', 66); // B

    await settled();

    assert.dom('.select-box-option.is-active').hasText('Baz');

    triggerKeyEvent('.select-box', 'keydown', 70); // F

    await _settled();

    assert.dom('.select-box-option.is-active').hasText('Foo');
  });

  test('jumping to an option (alpha)', async function(assert) {
    assert.expect(2);

    this.set('autoActivate', (e, sb) => {
      sb.activateOptionForKeyCode(e.keyCode);
    });

    await render(hbs`
      {{#select-box onPressKey=this.autoActivate as |sb|}}
        {{#sb.Option value="foo"}}Foo{{/sb.Option}}
        {{#sb.Option value="bar"}}Bar{{/sb.Option}}
        {{#sb.Option value="baz"}}Baz{{/sb.Option}}
      {{/select-box}}
    `);

    triggerKeyEvent('.select-box', 'keydown', 66); // B
    triggerKeyEvent('.select-box', 'keydown', 65); // A
    await triggerKeyEvent('.select-box', 'keydown', 90); // Z

    assert
      .dom('.select-box-option.is-active')
      .hasText('Baz', 'jumps straight to the matching option');

    await triggerKeyEvent('.select-box', 'keydown', 70); // F

    assert.dom('.select-box-option.is-active').hasText('Foo');
  });

  test('jumping to an option (numeric)', async function(assert) {
    assert.expect(1);

    this.set('autoActivate', (e, sb) => {
      sb.activateOptionForKeyCode(e.keyCode);
    });

    await render(hbs`
      {{#select-box onPressKey=this.autoActivate as |sb|}}
        {{#sb.Option value=1980}}1980{{/sb.Option}}
        {{#sb.Option value=1981}}1981{{/sb.Option}}
        {{#sb.Option value=1982}}1982{{/sb.Option}}
        {{#sb.Option value=1983}}1983{{/sb.Option}}
        {{#sb.Option value=1984}}1984{{/sb.Option}}
        {{#sb.Option value=1985}}1985{{/sb.Option}}
      {{/select-box}}
    `);

    triggerKeyEvent('.select-box', 'keydown', 49); // 1
    triggerKeyEvent('.select-box', 'keydown', 57); // 9
    triggerKeyEvent('.select-box', 'keydown', 56); // 8
    await triggerKeyEvent('.select-box', 'keydown', 51); // 3

    assert
      .dom('.select-box-option.is-active')
      .hasText('1983', 'jumps straight to the matching option');
  });
});
