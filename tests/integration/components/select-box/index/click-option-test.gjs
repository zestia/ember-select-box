import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { on } from '@ember/modifier';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (clicking option)', function (hooks) {
  setupRenderingTest(hooks);

  test('clicking an option activates and selects it', async function (assert) {
    assert.expect(7);

    let event;

    const handleChange = (value) => assert.step(value);
    const handleClick = (_event) => (event = _event);

    await render(
      <template>
        <SelectBox @onChange={{handleChange}} as |sb|>
          <sb.Options>
            <sb.Option @value="a" />
            <sb.Option @value="b" {{on "click" handleClick}} />
            <sb.Option @value="c" />
          </sb.Options>
        </SelectBox>
      </template>
    );

    await click('.select-box__option:nth-child(2)');
    await click('.select-box__option:nth-child(2)');

    assert.dom('.select-box__option[aria-current="true"]').exists({ count: 1 });

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .exists({ count: 1 });

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true')
      .hasAttribute('aria-selected', 'true');

    assert.verifySteps(['b']);
    assert.false(event.defaultPrevented);
  });

  test('clicking on a child', async function (assert) {
    assert.expect(5);

    let event;

    const handleMouseDown = (_event) => (event = _event);

    await render(
      <template>
        {{! template-lint-disable no-pointer-down-event-binding }}
        <SelectBox as |sb|>
          <sb.Dropdown>
            <sb.Trigger>
              {{sb.value}}
            </sb.Trigger>
            <sb.Content>
              <sb.Options>
                <sb.Option @value="#" {{on "mousedown" handleMouseDown}}>
                  <a href="#">Link</a>
                </sb.Option>
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');

    assert
      .dom('.select-box .dropdown')
      .hasAttribute('data-open', 'true', 'precondition');

    await click('a');

    assert.true(
      event.defaultPrevented,
      `focus will not leave the trigger or input. but,
       the link will still be visited. prevent default on the link click, if
       you wish to have options that can be cmd clicked to open in a new tab`
    );

    assert.dom('.select-box .dropdown').hasAttribute(
      'data-open',
      'false',
      `the select box closes because an option was selected. even though the target
       was a child of the option.`
    );

    assert.dom('.select-box .dropdown__trigger').hasText('#');

    assert
      .dom('.select-box .dropdown__trigger')
      .isFocused('does not lose focus');
  });

  test('clicking an option closes single select boxes', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown>
            <sb.Trigger />
            <sb.Content>
              <sb.Options>
                <sb.Option />
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');

    assert
      .dom('.select-box .dropdown')
      .hasAttribute('data-open', 'true', 'precondition');

    await click('.select-box__option');

    assert
      .dom('.select-box .dropdown')
      .hasAttribute(
        'data-open',
        'false',
        'we can assume the select box has done its job and should close'
      );
  });

  test('clicking an option does not closes multiple select boxes', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <SelectBox @multiple={{true}} as |sb|>
          <sb.Dropdown>
            <sb.Trigger />
            <sb.Content>
              <sb.Options>
                <sb.Option />
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');

    assert
      .dom('.select-box .dropdown')
      .hasAttribute('data-open', 'true', 'precondition');

    await click('.select-box__option');

    assert.dom('.select-box .dropdown').hasAttribute(
      'data-open',
      'true',
      `assume that more options are to be selected. do not assume its ok to close
       developers can close manually if need be`
    );
  });

  test('clicking a disabled option', async function (assert) {
    assert.expect(2);

    const handleChange = () => assert.step('change');

    await render(
      <template>
        <SelectBox @onChange={{handleChange}} as |sb|>
          <sb.Options>
            <sb.Option @value={{1}} />
            <sb.Option @value={{2}} @disabled={{true}} />
          </sb.Options>
        </SelectBox>
      </template>
    );

    await click('.select-box__option:nth-child(2)');

    assert.verifySteps([]);
    assert.dom('.select-box__option[aria-selected="true"]').doesNotExist();
  });

  test('right clicking an option does not select it', async function (assert) {
    assert.expect(1);

    const handleSelect = () => assert.step('select');

    await render(
      <template>
        <SelectBox @onSelect={{handleSelect}} as |sb|>
          <sb.Options>
            <sb.Option @value="foo" />
          </sb.Options>
        </SelectBox>
      </template>
    );

    await click('.select-box__option', { button: 2 });

    assert.verifySteps([]);
  });

  test('mouse down on options', async function (assert) {
    assert.expect(2);

    let event;

    const handleMouseDown = (_event) => (event = _event);

    await render(
      <template>
        {{! template-lint-disable no-pointer-down-event-binding }}
        <SelectBox as |sb|>
          <sb.Input />
          <sb.Options {{on "mousedown" handleMouseDown}}>
            <sb.Option />
          </sb.Options>
        </SelectBox>
      </template>
    );

    await click('.select-box__option');

    assert.true(
      event.defaultPrevented,
      `mouse down is prevented when clicking an option,
       so that we can move focus programmatically to
       the next relevant primary interactive element
       (options are not interactive elements, and so,
       clicking them makes focus be lost from the current
       interactive element - we don't want that)`
    );

    assert.dom('.select-box__input').isFocused();
  });
});
