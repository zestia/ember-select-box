import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box/selected-option', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::SelectedOption />`);

    assert
      .dom('div.select-box-selected-option')
      .exists({ count: 1 }, 'renders with correct class name and tag');
  });

  test('class prefix', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::SelectedOption @classNamePrefix="foo" />`);

    assert
      .dom('.foo-selected-option')
      .exists({ count: 1 }, 'can override the class prefix');
  });

  test('yield', async function(assert) {
    assert.expect(1);

    this.set('selectedItems', [
      { myValue: 'foo', myLabel: 'Foo' },
      { myValue: 'bar', myLabel: 'Bar' }
    ]);

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
      findAll('.select-box-selected-option')[0].textContent.trim() ===
        'Foo (0)' &&
        findAll('.select-box-selected-option')[1].textContent.trim() ===
          'Bar (1)',
      'selected options can yield their value & index'
    );
  });
});
