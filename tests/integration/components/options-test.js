import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { htmlSafe } from '@ember/template';

module('select-box/options', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Options />`);

    assert
      .dom('div.select-box-options')
      .exists({ count: 1 }, 'renders with correct class name and tag');
  });

  test('class prefix', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Options @classNamePrefix="foo" />`);

    assert
      .dom('.foo-options')
      .exists({ count: 1 }, 'can override the class prefix');
  });

  test('aria role', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::Options />`);

    assert
      .dom('.select-box-options')
      .hasAttribute(
        'role',
        'listbox',
        'options container has an appropriate aria role'
      );
  });

  skip('classic: style', async function(assert) {
    assert.expect(1);

    this.set('style', htmlSafe('color: red'));

    await render(hbs`{{select-box/options style=this.style}}`);

    assert
      .dom('.select-box-options')
      .hasAttribute('style', 'color: red', 'can bind style to classic comp');
  });
});
