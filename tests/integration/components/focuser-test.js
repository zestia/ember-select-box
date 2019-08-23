import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box/focuser', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(3);

    await render(hbs`<SelectBox::Focuser />`);

    assert
      .dom('input.select-box-focuser')
      .exists({ count: 1 }, 'renders with correct class name and tag');

    assert
      .dom('.select-box-focuser')
      .doesNotHaveAttribute('tabindex', 'no specific tabindex required');

    assert
      .dom('.select-box-focuser')
      .hasAttribute(
        'type',
        'text',
        'is a text box, so that focus can be received on mobile'
      );
  });

  test('invisibility', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Focuser />`);

    assert
      .dom('.select-box-focuser')
      .hasAttribute(
        'style',
        'height: 0px; width: 0px; transform: scale(0); position: absolute',
        'is not visible, but does not use visibility hidden or display none'
      );
  });
});
