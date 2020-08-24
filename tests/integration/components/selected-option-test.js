import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, findAll, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box/selected-option', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::SelectedOption />`);

    assert
      .dom('div.select-box__selected-option')
      .hasTagName('div', 'renders with correct class name and tag');
  });

  test('role', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::SelectedOption />`);

    assert
      .dom('.select-box__selected-option')
      .hasAttribute('role', 'option', 'defined as an option');
  });

  test('role', async function (assert) {
    assert.expect(1);

    await render(hbs`
      {{! template-lint-disable no-unnecessary-component-helper }}
      {{component "select-box/selected-option" role="button"}}
    `);

    assert
      .dom('.select-box__selected-option')
      .hasAttribute(
        'role',
        'button',
        'can set the role attribute (via an argument)'
      );
  });

  test('id', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::SelectedOption />`);

    assert.ok(
      find('.select-box__selected-option')
        .getAttribute('id')
        .match(/select-box-el-\d+/),
      'gets a unique id'
    );
  });

  test('yield', async function (assert) {
    assert.expect(1);

    this.selectedItems = [
      { myValue: 'foo', myLabel: 'Foo' },
      { myValue: 'bar', myLabel: 'Bar' }
    ];

    await render(hbs`
      <SelectBox as |sb|>
        {{#each this.selectedItems as |item|}}
          <sb.SelectedOption @value={{item}} as |so|>
            {{so.value.myLabel}} ({{so.index}})
          </sb.SelectedOption>
        {{/each}}
      </SelectBox>
    `);

    assert.ok(
      findAll('.select-box__selected-option')[0].textContent.trim() ===
        'Foo (0)' &&
        findAll('.select-box__selected-option')[1].textContent.trim() ===
          'Bar (1)',
      'selected options can yield their value & index'
    );
  });
});
