import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  click,
  focus,
  find,
  triggerEvent,
  triggerKeyEvent
} from '@ember/test-helpers';
import { on } from '@ember/modifier';
import { array } from '@ember/helper';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (opening)', function (hooks) {
  setupRenderingTest(hooks);

  test('opening with api', async function (assert) {
    assert.expect(6);

    const handleOpen = () => assert.step('open');

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown @onOpen={{handleOpen}} as |dd|>
            <sb.Content>
              <button
                type="button"
                class="open"
                {{on "click" dd.open}}
              ></button>
            </sb.Content>
            <sb.Trigger />
            <sb.Input />
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');

    // Intentionally twice
    await click('.open');
    await click('.open');

    assert.verifySteps(['open']);

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'true');
    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute('aria-expanded', 'true');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'true');
  });

  test('can set initial open state', async function (assert) {
    assert.expect(6);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown @open={{true}}>
            <sb.Trigger />
            <sb.Input />
            <sb.Content>
              <sb.Options>
                <sb.Option @value="A" />
                <sb.Option @value="B" />
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'true');
    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute('aria-expanded', 'true');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'true');
    assert.dom('.select-box .dropdown__trigger').isNotFocused();
    assert.dom('.select-box__input').isNotFocused();
    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'false');
  });

  test('activates first option (undefined === undefined)', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown>
            <sb.Trigger />
            <sb.Content>
              <sb.Options>
                <sb.Option />
                <sb.Option />
                <sb.Option />
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'true');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'false');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-current', 'false');
  });

  test('activates option for value (single)', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox @value={{2}} as |sb|>
          <sb.Dropdown>
            <sb.Trigger />
            <sb.Content>
              <sb.Options>
                <sb.Option @value={{1}} />
                <sb.Option @value={{2}} />
                <sb.Option @value={{3}} />
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');
  });

  test('activating option (multiple)', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox @multiple={{true}} @value={{array 4 3 2}} as |sb|>
          <sb.Dropdown>
            <sb.Trigger />
            <sb.Content>
              <sb.Options>
                <sb.Option @value={{1}} />
                <sb.Option @value={{2}} />
                <sb.Option @value={{3}} />
                <sb.Option @value={{4}} />
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');

    assert
      .dom('.select-box__option[aria-current="true"]')
      .doesNotExist(
        'does not attempt to activate any of the options for the given value'
      );
  });

  test('activates option for value after they are rendered', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox @value={{2}} as |sb|>
          <sb.Dropdown as |dd|>
            <sb.Trigger />
            {{#if dd.isOpen}}
              <sb.Content>
                <sb.Options>
                  <sb.Option @value={{1}} />
                  <sb.Option @value={{2}} />
                  <sb.Option @value={{3}} />
                </sb.Options>
              </sb.Content>
            {{/if}}
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');
  });

  test('opening via the trigger does not lose focus', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown>
            <sb.Trigger />
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');

    assert.dom('.select-box .dropdown__trigger').isFocused();
  });

  test('opening via the trigger advances focus to the input (mouse)', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown>
            <sb.Trigger />
            <sb.Input />
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');

    assert.dom('.select-box__input').isFocused();
  });

  test('opening via the trigger advances focus to the input (keyboard)', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown>
            <sb.Trigger />
            <sb.Input />
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await focus('.select-box .dropdown__trigger');
    await triggerKeyEvent('.select-box .dropdown__trigger', 'keydown', 'Enter');

    assert.dom('.select-box__input').isFocused();
  });

  test('opening via the api advances focus to the input', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown as |dd|>
            <sb.Trigger {{on "mouseenter" dd.open}} />
            <sb.Input />
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await triggerEvent('.select-box .dropdown__trigger', 'mouseenter');

    assert.dom('.select-box__input').isFocused();
  });

  test('opening combobox with input only', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown as |dd|>
            <sb.Input {{on "click" dd.open}} />
            <sb.Content>
              <sb.Options>
                <sb.Option @value="A" />
                <sb.Option @value="B" />
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box[aria-current="true"]').doesNotExist();

    await click('.select-box__input');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'true');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'true');
  });

  test('opening with a selected value scrolls it into view', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        {{! template-lint-disable no-forbidden-elements }}
        <style>
          .select-box .dropdown__content {
            height: 1em;
            overflow: auto;
          }
          .select-box__option {
            line-height: 1;
          }
        </style>

        <SelectBox @value={{3}} as |sb|>
          <sb.Dropdown as |dd|>
            <sb.Trigger />
            {{#if dd.isOpen}}
              <sb.Content>
                <sb.Options>
                  <sb.Option @value={{1}}>One</sb.Option>
                  <sb.Option @value={{2}}>Two</sb.Option>
                  <sb.Option @value={{3}}>Three</sb.Option>
                </sb.Options>
              </sb.Content>
            {{/if}}
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');

    const expectedTop = find('.select-box__option:nth-child(3)').offsetTop;

    assert.strictEqual(expectedTop, 32);
    assert.strictEqual(find('.dropdown__content').scrollTop, expectedTop);
  });

  test('dropdown trigger not available', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown as |dd|>
            <dd.Trigger />
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    assert.dom('.dropdown__trigger').exists(`
      For valid aria, the select box implementation of the dropdown
      trigger should be used (sb.Trigger), not (dd.Trigger)
      Sadly, there's not that easy to prevent accidental use of this,
      ideally this would be a .doesNotExist test
    `);
  });
});
