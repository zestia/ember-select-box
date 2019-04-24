import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box/options', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::options />`);

    assert
      .dom('div.select-box-options')
      .exists({ count: 1 }, 'renders with correct class name and tag');
  });

  test('class prefix', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::options @classNamePrefix="foo" />`);

    assert.dom('.foo-options').exists({ count: 1 }, 'can override the class prefix');
  });

  test('style', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::options @style="color:red<script>" />`);

    assert.ok(
      find('.select-box-options').outerHTML.match('style="color:red&amp;lt;script&amp;gt;"'),
      'options container can be styled, value is escaped'
    );
  });

  test('aria role', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::options />`);

    assert
      .dom('.select-box-options')
      .hasAttribute('role', 'listbox', 'options container has an appropriate aria role');
  });
});
