import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
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

  test('role', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::SelectedOption />`);

    assert
      .dom('.select-box__selected-option')
      .hasAttribute(
        'role',
        'presentation',
        'a selected option presents the option that was selected ' +
          '(is not announced as a group)'
      );
  });

  test('role (classic)', async function (assert) {
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
