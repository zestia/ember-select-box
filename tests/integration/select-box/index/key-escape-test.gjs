import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, focus, triggerKeyEvent } from '@ember/test-helpers';
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

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown @onClose={{handleClose}}>
            <sb.Trigger />
            <sb.Content>
              <sb.Options>
                <sb.Option @value="foo">foo</sb.Option>
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await click('.select-box .dropdown__trigger');

    assert
      .dom('.select-box__option')
      .hasAttribute('aria-current', 'false')
      .hasAttribute('aria-selected', 'false');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'true');
    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute('aria-expanded', 'true');

    await triggerKeyEvent(
      '.select-box .dropdown__trigger',
      'keydown',
      'Escape'
    );

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');
    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box .dropdown__trigger').isFocused();

    assert
      .dom('.select-box__option')
      .hasAttribute('aria-current', 'false')
      .hasAttribute('aria-selected', 'false');

    assert.verifySteps(['close']);
  });

  test('escape on input in combobox', async function (assert) {
    assert.expect(12);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown @onClose={{handleClose}} as |dd|>
            <sb.Input {{on "click" dd.open}} />
            <sb.Content>
              <sb.Options>
                <sb.Option @value="foo">foo</sb.Option>
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await click('.select-box__input');

    assert
      .dom('.select-box__option')
      .hasAttribute('aria-current', 'false')
      .hasAttribute('aria-selected', 'false');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'true');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'true');

    await triggerKeyEvent('.select-box__input', 'keydown', 'Escape');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__input').isFocused();

    assert
      .dom('.select-box__option')
      .hasAttribute('aria-current', 'false')
      .hasAttribute('aria-selected', 'false');

    assert.verifySteps(['close']);
  });

  test('escape on an interactive element', async function (assert) {
    assert.expect(4);

    // This ensures our listeners are on the dropdown itself,
    // and not just on the trigger.

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown @onClose={{handleClose}}>
            <sb.Trigger />
            <button type="button" class="inside" />
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'true');

    await focus('.inside');
    await triggerKeyEvent('.select-box .dropdown', 'keydown', 'Escape');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');

    assert.verifySteps(['close']);
  });

  test('escape inside something else escapable (closed)', async function (assert) {
    assert.expect(1);

    let event;

    const handleKeyDownParent = (_event) => (event = _event);

    await render(
      <template>
        {{! template-lint-disable no-invalid-interactive }}
        <div {{on "keydown" handleKeyDownParent}}>
          <SelectBox as |sb|>
            <sb.Dropdown @onClose={{handleClose}}>
              <sb.Trigger />
            </sb.Dropdown>
          </SelectBox>
        </div>
      </template>
    );

    await triggerKeyEvent('.select-box .dropdown', 'keydown', 'Escape');

    assert.true(
      event instanceof Event,
      'event not stopped, escape allowed to bubble up'
    );
  });

  test('escape inside something else escapable (open)', async function (assert) {
    assert.expect(3);

    let event;

    const handleKeyDownParent = (_event) => (event = _event);

    await render(
      <template>
        {{! template-lint-disable no-invalid-interactive }}
        <div {{on "keydown" handleKeyDownParent}}>
          <SelectBox as |sb|>
            <sb.Dropdown @onClose={{handleClose}}>
              <sb.Trigger />
            </sb.Dropdown>
          </SelectBox>
        </div>
      </template>
    );

    await click('.select-box .dropdown__trigger');
    await triggerKeyEvent('.select-box .dropdown', 'keydown', 'Escape');

    assert.notOk(
      event,
      `event propagation is stopped, since escape has caused the select box
       to close. we don't want escape to also close the parent element
       that the select box is contained within`
    );

    assert.verifySteps(['close']);
  });
});
