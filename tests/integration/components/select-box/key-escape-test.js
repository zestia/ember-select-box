import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (escape)', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (assert) {
    this.handleClose = () => assert.step('close');
  });

  test('escape on trigger in combobox', async function (assert) {
    assert.expect(12);

    await render(hbs`
      <SelectBox @onClose={{this.handleClose}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value="foo">foo</sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await click('.select-box__trigger');

    assert
      .dom('.select-box__option')
      .hasAttribute('aria-current', 'true')
      .hasAttribute('aria-selected', 'false');

    assert.dom('.select-box').hasAttribute('data-open', 'true');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'true');

    await triggerKeyEvent('.select-box__trigger', 'keydown', 'Escape');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__trigger').isFocused();

    assert
      .dom('.select-box__option')
      .hasAttribute('aria-current', 'true')
      .hasAttribute('aria-selected', 'false');

    assert.verifySteps(['close']);
  });

  test('escape on input in combobox', async function (assert) {
    assert.expect(12);

    await render(hbs`
      <SelectBox @onClose={{this.handleClose}} as |sb|>
        <sb.Input {{on "click" sb.open}} />
        <sb.Options>
          <sb.Option @value="foo">foo</sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await click('.select-box__input');

    assert
      .dom('.select-box__option')
      .hasAttribute('aria-current', 'true')
      .hasAttribute('aria-selected', 'false');

    assert.dom('.select-box').hasAttribute('data-open', 'true');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'true');

    await triggerKeyEvent('.select-box__input', 'keydown', 'Escape');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__input').isFocused();

    assert
      .dom('.select-box__option')
      .hasAttribute('aria-current', 'true')
      .hasAttribute('aria-selected', 'false');

    assert.verifySteps(['close']);
  });
});
