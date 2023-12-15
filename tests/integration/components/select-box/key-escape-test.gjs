import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, triggerKeyEvent } from '@ember/test-helpers';
import { on } from '@ember/modifier';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (escape)', function (hooks) {
  setupRenderingTest(hooks);

  let handleClose;

  hooks.beforeEach(function (assert) {
    handleClose = () => assert.step('close');
  });

  test('escape on trigger in combobox', async function (assert) {
    assert.expect(12);

    await render(<template>
      <SelectBox @onClose={{handleClose}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value="foo">foo</sb.Option>
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await click('.select-box__trigger');

    assert
      .dom('.select-box__option')
      .hasAttribute('aria-current', 'false')
      .hasAttribute('aria-selected', 'false');

    assert.dom('.select-box').hasAttribute('data-open', 'true');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'true');

    await triggerKeyEvent('.select-box__trigger', 'keydown', 'Escape');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__trigger').isFocused();

    assert
      .dom('.select-box__option')
      .hasAttribute('aria-current', 'false')
      .hasAttribute('aria-selected', 'false');

    assert.verifySteps(['close']);
  });

  test('escape on input in combobox', async function (assert) {
    assert.expect(12);

    await render(<template>
      <SelectBox @onClose={{handleClose}} as |sb|>
        <sb.Input {{on "click" sb.open}} />
        <sb.Options>
          <sb.Option @value="foo">foo</sb.Option>
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await click('.select-box__input');

    assert
      .dom('.select-box__option')
      .hasAttribute('aria-current', 'false')
      .hasAttribute('aria-selected', 'false');

    assert.dom('.select-box').hasAttribute('data-open', 'true');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'true');

    await triggerKeyEvent('.select-box__input', 'keydown', 'Escape');

    assert.dom('.select-box').hasAttribute('data-open', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__input').isFocused();

    assert
      .dom('.select-box__option')
      .hasAttribute('aria-current', 'false')
      .hasAttribute('aria-selected', 'false');

    assert.verifySteps(['close']);
  });

  test('escape inside something else escapable (e.g. a dropdown) - escape parent', async function (assert) {
    assert.expect(1);

    let event;

    const handleKeyDownParent = (_event) => (event = _event);

    await render(<template>
      {{! template-lint-disable no-invalid-interactive }}
      <div {{on "keydown" handleKeyDownParent}}>
        <SelectBox @onClose={{handleClose}} as |sb|>
          <sb.Trigger />
          <sb.Options />
        </SelectBox>
      </div>
    </template>);

    await triggerKeyEvent('.select-box__trigger', 'keydown', 'Escape');

    assert.true(
      event instanceof Event,
      'event not stopped, escape allowed to bubble up'
    );
  });

  test('escape inside something else escapable (e.g. a dropdown) - escape child', async function (assert) {
    assert.expect(3);

    let event;

    const handleKeyDownParent = (_event) => (event = _event);

    await render(<template>
      {{! template-lint-disable no-invalid-interactive }}
      <div {{on "keydown" handleKeyDownParent}}>
        <SelectBox @onClose={{handleClose}} as |sb|>
          <sb.Trigger />
          <sb.Options />
        </SelectBox>
      </div>
    </template>);

    await click('.select-box__trigger');
    await triggerKeyEvent('.select-box__trigger', 'keydown', 'Escape');

    assert.notOk(
      event,
      `event propagation is stopped, since escape has caused the select box
       to close. we don't want escape to also close the parent element (dropdown)
       that the select box is contained within`
    );

    assert.verifySteps(['close']);
  });
});
