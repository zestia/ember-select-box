import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('native-select-box/group', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(hbs`<NativeSelectBox::Group />`);

    assert
      .dom('optgroup.select-box__group')
      .exists('renders with correct class name and tag');
  });
});
