import { module, skip, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('native-select-box/group', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`<NativeSelectBox::Group />`);

    assert
      .dom('optgroup.select-box-group')
      .exists({ count: 1 }, 'renders with correct class name and tag');
  });

  test('class prefix', async function(assert) {
    assert.expect(1);

    await render(hbs`<NativeSelectBox::Group @classNamePrefix="foo" />`);

    assert
      .dom('.foo-group')
      .exists({ count: 1 }, 'can override the class prefix');
  });

  skip('classic: label', async function(assert) {
    assert.expect(1);

    await render(hbs`{{native-select-box/group label="Foo"}}`);

    assert
      .dom('.select-box-group')
      .hasAttribute(
        'label',
        'Foo',
        'the specified label is applied as an HTML attribute'
      );
  });

  skip('classic: disabled', async function(assert) {
    assert.expect(2);

    this.set('groupDisabled', true);

    await render(hbs`{{native-select-box/group disabled=this.groupDisabled}}`);

    assert
      .dom('.select-box-group')
      .isDisabled('a select box group can be disabled');

    this.set('groupDisabled', false);

    assert.ok(
      !find('.select-box-group').disabled,
      'a select box group can be re-enabled'
    );
  });
});
