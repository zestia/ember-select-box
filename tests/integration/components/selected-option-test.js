import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box/selected-option', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::SelectedOption />`);

    assert
      .dom('.select-box__selected-option')
      .hasTagName('div', 'renders with correct class name and tag');
  });

  test('whitespace', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::SelectedOption />`);

    assert.strictEqual(
      find('.select-box__selected-option').innerHTML,
      '',
      ':empty'
    );
  });

  test('role', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::SelectedOption />`);

    assert
      .dom('.select-box__selected-option')
      .doesNotHaveAttribute(
        'role',
        'does not have role="option" (behaviour is up to the developer)'
      );
  });

  test('component helper role', async function (assert) {
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
});
