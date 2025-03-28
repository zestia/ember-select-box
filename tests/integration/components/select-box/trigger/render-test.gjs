import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { find, render, triggerEvent } from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box/trigger', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(11);

    // The select box yields its own preconfigured
    // version of a dropdown trigger

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown>
            <sb.Trigger class="foo">
              Foo
            </sb.Trigger>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    assert
      .dom('.dropdown__trigger')
      .hasTagName('div')
      .hasText('Foo', 'block')
      .hasClass('foo', 'splattributes')
      .hasAttribute('tabindex', '0', 'focusable for safari fix')
      .hasAttribute('role', 'combobox', 'combined button and listbox')
      .hasAttribute('aria-expanded', 'false', 'closed initially')
      .doesNotHaveAttribute('aria-haspopup', 'implied by spec')
      .doesNotHaveAttribute('aria-controls', 'no listbox')
      .doesNotHaveAttribute('aria-busy', 'not searching')
      .doesNotHaveAttribute('aria-disabled', 'is enabled')
      .doesNotHaveAttribute('aria-activedescendant', 'no active option');
  });

  test('trigger with associated listbox', async function (assert) {
    assert.expect(3);

    // The select box's dropdown trigger (combobox) is
    // preconfigured to be coupled to the options (listbox).

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown>
            <sb.Trigger />
            <sb.Content>
              <sb.Options />
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    const combobox = find('.dropdown__trigger').getAttribute('aria-controls');
    const listbox = find('.select-box__options').getAttribute('id');

    assert.ok(combobox.match(/[\w\d]+/));
    assert.ok(listbox.match(/[\w\d]+/));
    assert.true(combobox === listbox);
  });

  test('role (with input)', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown>
            <sb.Input />
            <sb.Trigger />
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    assert
      .dom('.dropdown__trigger')
      .hasAttribute(
        'role',
        'button',
        'the trigger is not the primary interactive element'
      );
  });

  test('active descendant (with input)', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown>
            <sb.Trigger />
            <sb.Input />
            <sb.Options>
              <sb.Option />
            </sb.Options>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await triggerEvent('.select-box__option', 'mouseenter');

    assert
      .dom('.dropdown__trigger')
      .doesNotHaveAttribute('aria-activedescendant');
  });
});
