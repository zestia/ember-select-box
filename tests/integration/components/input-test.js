import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  click,
  fillIn,
  find,
  render,
  triggerKeyEvent
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box/input', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Input />`);

    assert
      .dom('.select-box__input')
      .hasTagName('input', 'renders with correct class name and tag');
  });

  test('role', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Input />`);

    assert
      .dom('.select-box__input')
      .hasAttribute(
        'role',
        'searchbox',
        'a select box input has an appropriate role'
      );
  });

  test('aria multiline', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Input />`);

    assert
      .dom('.select-box__input')
      .hasAttribute('aria-multiline', 'false', 'single line text input');
  });

  test('type', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Input />`);

    assert
      .dom('.select-box__input')
      .hasAttribute(
        'type',
        'text',
        'select box inputs are not search boxes by default due to unwanted ' +
          'behaviour when you press escape'
      );
  });

  test('type (closure component)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      {{! template-lint-disable no-unnecessary-component-helper }}
      {{component "select-box/input" type="search"}}
    `);

    assert
      .dom('.select-box__input')
      .hasAttribute(
        'type',
        'search',
        'can set the type attribute (via an argument)'
      );
  });

  test('onClear action', async function (assert) {
    assert.expect(1);

    this.cleared = (sb) => {
      assert.equal(
        typeof sb,
        'object',
        'clearing the input value sends an action with the select box api'
      );
    };

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Input @value="foo" @onClear={{this.cleared}} />
      </SelectBox>
    `);

    await fillIn('.select-box__input', '');
  });

  test('onDelete action', async function (assert) {
    assert.expect(2);

    let count = 0;

    this.deleted = (sb) => {
      count++;

      assert.equal(
        typeof sb,
        'object',
        'the onDelete action receives select box api'
      );
    };

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Input @value="f" @onDelete={{this.deleted}} />
      </SelectBox>
    `);

    const input = find('.select-box__input');

    input.value = 'x';

    await triggerKeyEvent(input, 'keydown', 8); // Backspace

    input.value = '';

    await triggerKeyEvent(input, 'keydown', 8); // Backspace

    assert.equal(
      count,
      1,
      'delete action is only fired when value is blank & backspace is pressed'
    );
  });

  test('input actions when no input', async function (assert) {
    assert.expect(0);

    this.handleSelect = (value, sb) => {
      this.set('showInput', false);
      sb.setInputValue('');
      sb.focusInput();
      sb.blurInput();
    };

    await render(hbs`
      <SelectBox @onSelect={{this.handleSelect}} as |sb|>
        {{#if this.showInput}}
          <sb.Input />
        {{/if}}
        <sb.Option @value="foo">Foo</sb.Option>
      </SelectBox>
    `);

    await click('.select-box__option');
  });
});
