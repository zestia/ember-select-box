import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box/group', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Group />`);

    assert
      .dom('.select-box__group')
      .hasTagName('div', 'renders with correct class name and tag');
  });

  test('whitespace', async function (assert) {
    assert.expect(2);

    await render(hbs`<SelectBox::Group />`);

    assert.strictEqual(
      find('.select-box__group-label').innerHTML,
      '',
      ':empty'
    );
    assert.strictEqual(
      find('.select-box__group-options').innerHTML,
      '',
      ':empty'
    );
  });

  test('label', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Group @label="Foo" />`);

    assert
      .dom('.select-box__group-label')
      .hasText('Foo', 'displays the specified group label');
  });

  test('role', async function (assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Group />`);

    assert.dom('.select-box__group').hasAttribute('role', 'group');
  });

  test('aria', async function (assert) {
    assert.expect(2);

    await render(hbs`<SelectBox::Group />`);

    const label = find('.select-box__group-label');

    assert.ok(label.getAttribute('id').match(/select-box-el-\d/));

    assert
      .dom('.select-box__group')
      .hasAttribute(
        'aria-labelledby',
        label.getAttribute('id'),
        'text box knows it controls the combo box'
      );
  });

  test('options', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox::Group>
        <SelectBox::Option />
      </SelectBox::Group>
    `);

    assert
      .dom('.select-box__group-options .select-box__option')
      .exists('can display options inside the group');
  });
});
