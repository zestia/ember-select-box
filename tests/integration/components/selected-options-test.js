import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box/selected-options', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::SelectedOptions />`);

    assert
      .dom('.select-box__selected-options')
      .hasTagName('div', 'renders with correct class name and tag');
  });

  test('whitespace', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::SelectedOptions />`);

    assert.strictEqual(
      find('.select-box__selected-options').innerHTML,
      '',
      ':empty'
    );
  });
});
