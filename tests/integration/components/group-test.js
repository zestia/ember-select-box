import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box/group', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Group />`);

    assert
      .dom('div.select-box__group')
      .exists({ count: 1 }, 'renders with correct class name and tag');
  });

  test('data component attribute', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Group />`);

    assert
      .dom('[data-component="group"]')
      .exists({ count: 1 }, 'has a data attribute signifying its type');
  });

  test('label', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Group @label="Foo" />`);

    assert
      .dom('.select-box__group-label')
      .hasText('Foo', 'displays the specified group label');
  });

  test('options', async function(assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox::Group>
        <SelectBox::Option />
      </SelectBox::Group>
    `);

    assert
      .dom('.select-box__group-options .select-box__option')
      .exists({ count: 1 }, 'can display options inside the group');
  });
});
