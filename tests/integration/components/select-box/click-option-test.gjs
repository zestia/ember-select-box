import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, click, triggerEvent } from '@ember/test-helpers';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (clicking option)', function (hooks) {
  setupRenderingTest(hooks);

  test('clicking an option activates and selects it', async function (assert) {
    assert.expect(7);

    let event;

    const handleChange = (value) => assert.step(value);
    const handleClick = (_event) => (event = _event);

    await render(<template>
      <SelectBox @onChange={{handleChange}} as |sb|>
        <sb.Options>
          <sb.Option @value="a" />
          <sb.Option @value="b" {{on "click" handleClick}} />
          <sb.Option @value="c" />
        </sb.Options>
      </SelectBox>
    </template>);

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
    assert.expect(4);

    let event;

    const handleMouseDown = (_event) => (event = _event);

    await render(<template>
      {{! template-lint-disable no-pointer-down-event-binding }}
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option {{on "mousedown" handleMouseDown}}>
            <a href="#">Link</a>
          </sb.Option>
        </sb.Options>
      </SelectBox>
    </template>);

    await click('.select-box__trigger');

    assert.dom('.select-box').hasAttribute('data-open', 'true', 'precondition');

    await triggerEvent('.select-box__option', 'mousedown');
    await click('a');

    assert.true(
      event.defaultPrevented,
      'focus will not leave the trigger or input'
    );

    assert.dom('.select-box').hasAttribute(
      'data-open',
      'false',
      `
      the select box closes because an option was selected. even though the target
      was a child of the option. this allows for greater flexibility building UI's
      that require custom markup
      `
    );

    assert.dom('.select-box__trigger').isFocused('does not lose focus');
  });

  test('clicking an option closes single select boxes', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    await click('.select-box__trigger');

    assert.dom('.select-box').hasAttribute('data-open', 'true', 'precondition');

    await click('.select-box__option');

    assert
      .dom('.select-box')
      .hasAttribute(
        'data-open',
        'false',
        'we can assume the select box has done its job and should close'
      );
  });

  test('clicking an option does not closes multiple select boxes', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox @multiple={{true}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option />
        </sb.Options>
      </SelectBox>
    </template>);

    await click('.select-box__trigger');

    assert.dom('.select-box').hasAttribute('data-open', 'true', 'precondition');

    await click('.select-box__option');

    assert.dom('.select-box').hasAttribute(
      'data-open',
      'true',
      `assume that more options are to be selected. do not assume its ok to close
       developers can close manually if need be`
    );
  });

  test('clicking a disabled option', async function (assert) {
    assert.expect(2);

    const handleChange = () => assert.step('change');

    await render(<template>
      <SelectBox @onChange={{handleChange}} as |sb|>
        <sb.Options>
          <sb.Option @value={{1}} />
          <sb.Option @value={{2}} @disabled={{true}} />
        </sb.Options>
      </SelectBox>
    </template>);

    await click('.select-box__option:nth-child(2)');

    assert.verifySteps([]);
    assert.dom('.select-box__option[aria-selected="true"]').doesNotExist();
  });

  test('clicking a child that goes away (and so is the select box)', async function (assert) {
    assert.expect(1);

    const state = new (class {
      value;
      @tracked hideSelectBox;
    })();

    const handleChange = (value) => {
      state.value = value;
      state.hideSelectBox = true;
    };

    await render(<template>
      {{#unless state.hideSelectBox}}
        <SelectBox @onChange={{handleChange}} as |sb|>
          <sb.Trigger />
          <sb.Options>
            {{#unless state.value}}
              <sb.Option @value="foo" />
            {{/unless}}
          </sb.Options>
        </SelectBox>
      {{/unless}}
    </template>);

    await click('.select-box__trigger');
    await click('.select-box__option');

    assert.ok(true, 'does not cause infinite revalidation bug');
  });

  test('right clicking an option does not select it', async function (assert) {
    assert.expect(1);

    const handleSelect = () => assert.step('select');

    await render(<template>
      <SelectBox @onSelect={{handleSelect}} as |sb|>
        <sb.Options>
          <sb.Option @value="foo" />
        </sb.Options>
      </SelectBox>
    </template>);

    await click('.select-box__option', { button: 2 });

    assert.verifySteps([]);
  });
});
