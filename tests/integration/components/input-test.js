import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  find,
  fillIn,
  click,
  triggerKeyEvent
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { htmlSafe } from '@ember/template';

module('select-box/input', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::input />`);

    assert
      .dom('input.select-box-input')
      .exists({ count: 1 }, 'renders with correct class name and tag');
  });

  test('class prefix', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::input @classNamePrefix="foo" />`);

    assert.dom('.foo-input').exists({ count: 1 }, 'can override the class prefix');
  });

  test('aria role', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::input />`);

    assert
      .dom('.select-box-input')
      .hasAttribute('role', 'searchbox', 'a select box input has an appropriate aria role');
  });

  test('aria multiline', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::input />`);

    assert
      .dom('.select-box-input')
      .hasAttribute('aria-multiline', 'false', 'single line text input');
  });

  test('type', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::input />`);

    assert
      .dom('.select-box-input')
      .hasAttribute(
        'type',
        '',
        'select box inputs are not search boxes by default due to unwanted ' +
          'behaviour when you press escape'
      );
  });

  test('classic: type', async function(assert) {
    assert.expect(1);

    await render(hbs`{{select-box/input type="email"}}`);

    assert
      .dom('.select-box-input')
      .hasAttribute('type', 'email', 'can change the type of the select box input');
  });

  test('classic: style', async function(assert) {
    assert.expect(1);

    this.set('style', htmlSafe('color: red'));

    await render(hbs`{{select-box/input style=this.style}}`);

    assert
      .dom('.select-box-input')
      .hasAttribute('style', 'color: red', 'can bind style to classic comp');
  });

  test('classic: value', async function(assert) {
    assert.expect(3);

    this.set('myObj', { value: 'foo' });

    await render(hbs`{{select-box/input value=this.myObj.value}}`);

    const input = find('.select-box-input');

    assert.equal(input.value, 'foo', 'can specify the initial value');

    this.set('myObj.value', 'bar');

    assert.equal(input.value, 'bar', 'updating the value updates the text box value');

    await fillIn(input, 'baz');

    assert.equal(
      this.myObj.value,
      'bar',
      'changing the input value does not mutate the value attribute'
    );
  });

  test('inputting', async function(assert) {
    assert.expect(2);

    this.set('inputText', (value, sb) => {
      assert.equal(value, 'foo', 'inputting text sends an action with the value');

      assert.ok(typeof sb === 'object', 'sends the api');
    });

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Input @onInput={{this.inputText}} />
      </SelectBox>
    `);

    await fillIn('.select-box-input', 'foo');
  });

  test('onClear action', async function(assert) {
    assert.expect(1);

    this.set('cleared', sb => {
      assert.ok(
        typeof sb === 'object',
        'clearing the input value sends an action with the select box api'
      );
    });

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Input @value="foo" @onClear={{this.cleared}} />
      </SelectBox>
    `);

    await fillIn('.select-box-input', '');
  });

  test('onDelete action', async function(assert) {
    assert.expect(2);

    let count = 0;

    this.set('deleted', sb => {
      count++;

      assert.ok(typeof sb === 'object', 'the onDelete action receives select box api');
    });

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Input @value="f" @onDelete={{this.deleted}} />
      </SelectBox>
    `);

    const input = find('.select-box-input');

    input.value = 'x';

    await triggerKeyEvent(input, 'keydown', 8);

    input.value = '';

    await triggerKeyEvent(input, 'keydown', 8);

    assert.equal(
      count,
      1,
      'delete action is only fired when value is blank & backspace is pressed'
    );
  });

  test('input actions when no input', async function(assert) {
    assert.expect(0);

    this.set('select', (value, sb) => {
      this.set('showInput', false);
      sb.setInputValue('');
      sb.focusInput();
      sb.blurInput();
    });

    await render(hbs`
      <SelectBox @onSelect={{this.select}} as |sb|>
        {{#if this.showInput}}
          <sb.Input />
        {{/if}}
        <sb.Option @value="foo">Foo</sb.Option>
      </SelectBox>
    `);

    await click('.select-box-option');
  });
});
