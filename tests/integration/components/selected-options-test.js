import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { htmlSafe } from '@ember/template';

module('select-box/selected-options', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::SelectedOptions />`);

    assert
      .dom('div.select-box-selected-options')
      .exists({ count: 1 }, 'renders with correct class name and tag');
  });

  test('class prefix', async function(assert) {
    assert.expect(1);

    await render(hbs`<SelectBox::SelectedOptions @classNamePrefix="foo" />`);

    assert.dom('.foo-selected-options').exists({ count: 1 }, 'can override the class prefix');
  });

  test('classic: style', async function(assert) {
    assert.expect(1);

    this.set('style', htmlSafe('color: red'));

    await render(hbs`{{select-box/selected-options style=this.style}}`);

    assert
      .dom('.select-box-selected-options')
      .hasAttribute('style', 'color: red', 'can bind style to classic comp');
  });
});
