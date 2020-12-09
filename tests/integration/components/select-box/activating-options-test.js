import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { later } from '@ember/runloop';
import { A as emberA } from '@ember/array';
import { Promise } from 'rsvp';
import {
  click,
  find,
  findAll,
  render,
  triggerEvent,
  triggerKeyEvent,
  waitUntil
} from '@ember/test-helpers';

module('select-box (activating options)', function (hooks) {
  setupRenderingTest(hooks);

  function waitForReset() {
    return waitUntil(() => new Promise((resolve) => later(resolve, 1000)));
  }

  test('mouseenter activates options', async function (assert) {
    assert.expect(6);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Option @value={{1}}>One</sb.Option>
        <sb.Option @value={{2}}>Two</sb.Option>
      </SelectBox>
    `);

    const box = find('.select-box');
    const one = findAll('.select-box__option')[0];
    const two = findAll('.select-box__option')[1];

    assert
      .dom('.select-box__option[aria-current="true"]')
      .doesNotExist('precondition, there are no active options');

    await triggerEvent(one, 'mouseenter');

    assert
      .dom(one)
      .hasAttribute(
        'aria-current',
        'true',
        'mousing over an option gives it an active attribute'
      );

    assert.ok(
      one.getAttribute('id').match(/select-box-el-\d+/),
      'active option has an id with a numeric part'
    );

    assert
      .dom(box)
      .hasAttribute(
        'aria-activedescendant',
        one.id,
        'the select box has the correct active descendant id'
      );

    await triggerEvent(two, 'mouseenter');

    assert
      .dom(box)
      .hasAttribute(
        'aria-activedescendant',
        two.getAttribute('id'),
        'the select box active descendant id is updated'
      );

    assert.ok(
      one.getAttribute('aria-current') === 'false' &&
        two.getAttribute('aria-current') === 'true',
      'mousing over another option moves the active attribute'
    );
  });

  test('activating by index via the api', async function (assert) {
    assert.expect(2);

    this.handleActivate = (value, sb) => {
      assert.equal(
        value,
        'foo',
        'activating an option sends an action with the value'
      );

      assert.ok(typeof sb === 'object', 'sends the api');
    };

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Option @value="foo" @onActivate={{this.handleActivate}} />

        <button
          type="button"
          {{on "click" (fn sb.activateOptionAtIndex 0)}}
        >
          Activate foo
        </button>
      </SelectBox>
    `);

    await click('button');
  });

  test('activating by value via the api', async function (assert) {
    assert.expect(4);

    let activated = 0;

    this.handleActivate = (value, sb) => {
      assert.equal(
        value,
        'bar',
        'activating an option sends an action with the value'
      );

      assert.ok(typeof sb === 'object', 'sends the api');

      activated++;
    };

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Option @value="foo" @onActivate={{this.handleActivate}} />
        <sb.Option @value="bar" @onActivate={{this.handleActivate}} />
        <sb.Option @value="bar" @onActivate={{this.handleActivate}} />
        <sb.Option @value="baz" @onActivate={{this.handleActivate}} />
        <button type="button" {{on "click" (fn sb.activateOptionForValue "bar")}}>Activate bar</button>
      </SelectBox>
    `);

    await click('button');

    assert.equal(
      activated,
      1,
      'onActivate only fires once (for the first matching option)'
    );

    assert
      .dom('.select-box__option[aria-current="true"]')
      .exists({ count: 1 }, 'only one matching option is activated');
  });

  test('activation boundaries', async function (assert) {
    assert.expect(8);

    this.handlePressDown = (e, sb) => sb.activateNextOption();
    this.handlePressUp = (e, sb) => sb.activatePreviousOption();

    await render(hbs`
      <SelectBox
        @onPressDown={{this.handlePressDown}}
        @onPressUp={{this.handlePressUp}} as |sb|
      >
        <sb.Option @value={{1}}>One</sb.Option>
        <sb.Option @value={{2}}>Two</sb.Option>
        <sb.Option @value={{3}}>Three</sb.Option>
      </SelectBox>
    `);

    assert
      .dom('.select-box__option[aria-current="true"]')
      .doesNotExist('precondition: nothing active');

    await triggerKeyEvent('.select-box', 'keydown', 40);

    assert.dom('.select-box__option[aria-current="true"]').hasText('One');

    await triggerKeyEvent('.select-box', 'keydown', 40);

    assert.dom('.select-box__option[aria-current="true"]').hasText('Two');

    await triggerKeyEvent('.select-box', 'keydown', 40);

    assert.dom('.select-box__option[aria-current="true"]').hasText('Three');

    await triggerKeyEvent('.select-box', 'keydown', 40);

    assert
      .dom('.select-box__option[aria-current="true"]')
      .hasText(
        'Three',
        'does not cycle back to the beginning when reaching the end'
      );

    await triggerKeyEvent('.select-box', 'keydown', 38);

    assert.dom('.select-box__option[aria-current="true"]').hasText('Two');

    await triggerKeyEvent('.select-box', 'keydown', 38);

    assert.dom('.select-box__option[aria-current="true"]').hasText('One');

    await triggerKeyEvent('.select-box', 'keydown', 38);

    assert
      .dom('.select-box__option[aria-current="true"]')
      .hasText(
        'One',
        'does not cycle back to the end when reaching the beginning'
      );
  });

  test('cycling through options', async function (assert) {
    assert.expect(9);

    this.handlePressKey = (e, sb) => sb.activateOptionForKeyCode(e.keyCode);

    await render(hbs`
      <SelectBox @onPressKey={{this.handlePressKey}} as |sb|>
        <sb.Option @value="A1">A 1</sb.Option>
        <sb.Option @value="A2">A 2</sb.Option>
        <sb.Option @value="BA1">BA 1</sb.Option>
        <sb.Option @value="A3">A 3</sb.Option>
      </SelectBox>
    `);

    await triggerKeyEvent('.select-box', 'keypress', 65); // a

    assert.dom('.select-box__option[aria-current="true"]').hasText('A 1');

    await triggerKeyEvent('.select-box', 'keypress', 65); // a

    assert.dom('.select-box__option[aria-current="true"]').hasText('A 2');

    await triggerKeyEvent('.select-box', 'keypress', 65); // a

    assert.dom('.select-box__option[aria-current="true"]').hasText('A 3');

    await triggerKeyEvent('.select-box', 'keypress', 65); // a

    assert.dom('.select-box__option[aria-current="true"]').hasText('A 1');

    await triggerKeyEvent('.select-box', 'keypress', 65); // a

    assert.dom('.select-box__option[aria-current="true"]').hasText('A 2');

    await triggerKeyEvent('.select-box', 'keypress', 65); // a

    assert.dom('.select-box__option[aria-current="true"]').hasText('A 3');

    await waitForReset();

    await triggerKeyEvent('.select-box', 'keypress', 65); // a

    assert.dom('.select-box__option[aria-current="true"]').hasText('A 1');

    await triggerKeyEvent('.select-box', 'keypress', 65); // a

    assert.dom('.select-box__option[aria-current="true"]').hasText('A 2');

    await triggerKeyEvent('.select-box', 'keypress', 65); // a

    assert.dom('.select-box__option[aria-current="true"]').hasText('A 3');
  });

  test('cycling through options (duplicate chars)', async function (assert) {
    assert.expect(3);

    this.handlePressKey = (e, sb) => sb.activateOptionForKeyCode(e.keyCode);

    await render(hbs`
      <SelectBox @onPressKey={{this.handlePressKey}} as |sb|>
        <sb.Option @value="AAA1">AAA 1</sb.Option>
        <sb.Option @value="AA2">AA 2</sb.Option>
        <sb.Option @value="A3">A 3</sb.Option>
      </SelectBox>
    `);

    await triggerKeyEvent('.select-box', 'keypress', 65); // a

    assert.dom('.select-box__option[aria-current="true"]').hasText('AAA 1');

    await triggerKeyEvent('.select-box', 'keypress', 65); // a

    assert.dom('.select-box__option[aria-current="true"]').hasText('AA 2');

    await triggerKeyEvent('.select-box', 'keypress', 65); // a

    assert.dom('.select-box__option[aria-current="true"]').hasText('A 3');
  });

  test('jumping to an option (reset timer)', async function (assert) {
    assert.expect(4);

    this.handlePressKey = (e, sb) => sb.activateOptionForKeyCode(e.keyCode);

    await render(hbs`
      <SelectBox @onPressKey={{this.handlePressKey}} as |sb|>
        <sb.Option @value="foo">Foo</sb.Option>
        <sb.Option @value="bar">Bar</sb.Option>
        <sb.Option @value="baz">Baz</sb.Option>
      </SelectBox>
    `);

    await triggerKeyEvent('.select-box', 'keypress', 66); // b

    assert.dom('.select-box__option[aria-current="true"]').hasText('Bar');

    await triggerKeyEvent('.select-box', 'keypress', 65); // a

    assert.dom('.select-box__option[aria-current="true"]').hasText('Bar');

    await triggerKeyEvent('.select-box', 'keypress', 90); // z

    assert.dom('.select-box__option[aria-current="true"]').hasText('Baz');

    await waitForReset();

    await triggerKeyEvent('.select-box', 'keypress', 70); // f

    assert.dom('.select-box__option[aria-current="true"]').hasText('Foo');
  });

  test('jumping to an option (numeric)', async function (assert) {
    assert.expect(1);

    this.handlePressKey = (e, sb) => sb.activateOptionForKeyCode(e.keyCode);

    await render(hbs`
      <SelectBox @onPressKey={{this.handlePressKey}} as |sb|>
        <sb.Option @value={{1980}}>1980</sb.Option>
        <sb.Option @value={{1981}}>1981</sb.Option>
        <sb.Option @value={{1982}}>1982</sb.Option>
        <sb.Option @value={{1983}}>1983</sb.Option>
        <sb.Option @value={{1984}}>1984</sb.Option>
        <sb.Option @value={{1985}}>1985</sb.Option>
      </SelectBox>
    `);

    await triggerKeyEvent('.select-box', 'keypress', 49); // 1
    await triggerKeyEvent('.select-box', 'keypress', 57); // 9
    await triggerKeyEvent('.select-box', 'keypress', 56); // 8
    await triggerKeyEvent('.select-box', 'keypress', 51); // 3

    assert.dom('.select-box__option[aria-current="true"]').hasText('1983');
  });

  test('jumping to an option (dodgy chars)', async function (assert) {
    assert.expect(1);

    this.handlePressKey = (e, sb) => sb.activateOptionForKeyCode(e.keyCode);

    await render(hbs`
      <SelectBox @onPressKey={{this.handlePressKey}} as |sb|>
        <sb.Option @value={{1}}>Fred S</sb.Option>
        <sb.Option @value={{2}}>Fred S[</sb.Option>
      </SelectBox>
    `);

    await triggerKeyEvent('.select-box', 'keypress', 70); // f
    await triggerKeyEvent('.select-box', 'keypress', 82); // r
    await triggerKeyEvent('.select-box', 'keypress', 69); // e
    await triggerKeyEvent('.select-box', 'keypress', 68); // d
    await triggerKeyEvent('.select-box', 'keypress', 32); // space
    await triggerKeyEvent('.select-box', 'keypress', 83); // s
    await triggerKeyEvent('.select-box', 'keypress', 91); // [

    assert
      .dom('.select-box__option[aria-current="true"]')
      .hasText(
        'Fred S[',
        "jumps to the matching option (regexp doesn't blow up)"
      );
  });

  test('jumping to an option (same-char regression)', async function (assert) {
    assert.expect(1);

    this.handlePressKey = (e, sb) => sb.activateOptionForKeyCode(e.keyCode);

    await render(hbs`
      <SelectBox @onPressKey={{this.handlePressKey}} as |sb|>
        <sb.Option @value={{1}}>Fred</sb.Option>
        <sb.Option @value={{2}}>Reggie</sb.Option>
        <sb.Option @value={{3}}>Geoffrey</sb.Option>
      </SelectBox>
    `);

    await triggerKeyEvent('.select-box', 'keypress', 71); // g
    await triggerKeyEvent('.select-box', 'keypress', 69); // e
    await triggerKeyEvent('.select-box', 'keypress', 79); // o
    await triggerKeyEvent('.select-box', 'keypress', 70); // f
    await triggerKeyEvent('.select-box', 'keypress', 70); // f (for fred)
    await triggerKeyEvent('.select-box', 'keypress', 82); // r (for reggie)

    assert
      .dom('.select-box__option[aria-current="true"]')
      .hasText(
        'Geoffrey',
        "does not start 'cycle through' behaviour, just because the same letter was typed"
      );
  });

  test('jumping to an option (collapsing whitespace)', async function (assert) {
    assert.expect(1);

    this.handlePressKey = (e, sb) => sb.activateOptionForKeyCode(e.keyCode);

    await render(hbs`
      <SelectBox @onPressKey={{this.handlePressKey}} as |sb|>
        <sb.Option @value={{1}}> foo </sb.Option>
        <sb.Option @value={{2}}> bar  baz </sb.Option>
        <sb.Option @value={{3}}> qux </sb.Option>
      </SelectBox>
    `);

    await triggerKeyEvent('.select-box', 'keypress', 66); // b
    await triggerKeyEvent('.select-box', 'keypress', 65); // a
    await triggerKeyEvent('.select-box', 'keypress', 82); // r
    await triggerKeyEvent('.select-box', 'keypress', 32); // space
    await triggerKeyEvent('.select-box', 'keypress', 65); // s

    assert
      .dom('.select-box__option[aria-current="true"]')
      .hasText('bar baz', 'jumps to the matching option');
  });

  test('active option element id infinite rendering', async function (assert) {
    assert.expect(0);

    const item1 = { name: 'item 1' };
    const item2 = { name: 'item 2' };
    const item3 = { name: 'item 3' };

    this.items = emberA([item1, item2, item3]);

    this.handleActivateOption = (item) => this.items.removeObject(item);

    await render(hbs`
      <SelectBox as |sb|>
        {{#each this.items as |item|}}
          <sb.Option
            @value={{item}}
            @onActivate={{this.handleActivateOption}}
          >
            {{item.name}}
          </sb.Option>
        {{/each}}
      </SelectBox>
    `);

    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');
  });

  test('activating - nothing to activate', async function (assert) {
    assert.expect(0);

    this.handleReady = (sb) => sb.activateNextOption();

    await render(hbs`<SelectBox @onReady={{this.handleReady}} />`);
  });

  test('activating focusable options', async function (assert) {
    assert.expect(2);

    let sb;

    this.handleReady = (api) => (sb = api);

    await render(hbs`
      <SelectBox @onReady={{this.handleReady}} as |sb|>
        <sb.Option @value={{1}}>One</sb.Option>
        <sb.Option @value={{2}} tabindex="0">Two</sb.Option>
      </SelectBox>
    `);

    const one = find('.select-box__option:nth-child(1)');
    const two = find('.select-box__option:nth-child(2)');

    sb.activateOptionForValue(1);

    assert
      .dom(one)
      .isNotFocused(
        'activating an option does not focus it by default (because they are just divs) ' +
          'and focus is managed by aria activedescenant'
      );

    sb.activateOptionForValue(2);

    assert
      .dom(two)
      .isFocused('activating an option that is focusable focuses it');
  });
});
