import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box/options', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Options />`);

    assert
      .dom('.select-box__options')
      .hasTagName('div', 'renders with correct class name and tag');
  });

  test('whitespace', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Options />`);

    assert.equal(find('.select-box__options').innerHTML, '', ':empty');
  });
});
