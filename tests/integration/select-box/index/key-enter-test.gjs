import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  focus,
  click,
  triggerKeyEvent,
  triggerEvent
} from '@ember/test-helpers';
import { on } from '@ember/modifier';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (enter)', function (hooks) {
  setupRenderingTest(hooks);

  let event;
  let handleChange;

  const handleKeyDown = (_event) => (event = _event);

  hooks.beforeEach(function (assert) {
    handleChange = (value) => assert.step(value);
  });

  test('enter on trigger of combobox', async function (assert) {
    assert.expect(10);

    await render(
      <template>
        <SelectBox @onChange={{handleChange}} as |sb|>
          <sb.Dropdown>
            <sb.Trigger {{on "keydown" handleKeyDown}} />
            <sb.Content>
              <sb.Options>
                <sb.Option @value="a" />
                <sb.Option @value="b" />
                <sb.Option @value="c" />
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await focus('.select-box .dropdown__trigger');
    await triggerKeyEvent('.select-box .dropdown__trigger', 'keydown', 'Enter');

    assert.verifySteps([], 'change event is not fired');
    assert.true(event.defaultPrevented);

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'true');
    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute('aria-expanded', 'true');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-current', 'false')
      .hasAttribute('aria-selected', 'false');

    await triggerKeyEvent('.select-box .dropdown__trigger', 'keydown', 'Enter');

    assert.verifySteps([], 'change event is not fired');
    assert.true(event.defaultPrevented);

    assert
      .dom('.select-box .dropdown')
      .hasAttribute(
        'data-open',
        'true',
        'does not close (no option was active)'
      );

    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute('aria-expanded', 'true');
  });

  test('enter on trigger of combobox (multiple)', async function (assert) {
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

    await focus('.select-box .dropdown__trigger');
    await triggerKeyEvent('.select-box .dropdown__trigger', 'keydown', 'Enter');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'true');

    await triggerKeyEvent('.select-box .dropdown__trigger', 'keydown', 'Enter');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'true');
  });

  test('enter in input of combobox', async function (assert) {
    assert.expect(12);

    await render(
      <template>
        <SelectBox @onChange={{handleChange}} as |sb|>
          <sb.Dropdown>
            <sb.Input {{on "keydown" handleKeyDown}} />
            <sb.Content>
              <sb.Options>
                <sb.Option @value="a" />
                <sb.Option @value="b" />
                <sb.Option @value="c" />
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    // pressing enter whilst inside an input will not submit the form
    // (as it would on a normal input)
    // even though there is no option active to be selected (so it could
    // theoretically be ok to do so. But, as a generic addon we cannot
    // know whether a developer has hooked up an action to call `open`
    // so its safest to just prevent default.

    await focus('.select-box__input');
    await triggerKeyEvent('.select-box__input', 'keydown', 'Enter');

    assert.verifySteps([]);
    assert.true(event.defaultPrevented);
    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();
    assert.dom('.select-box__option[aria-selected="true"]').doesNotExist();

    await triggerKeyEvent('.select-box__input', 'keydown', 'Enter');

    assert.verifySteps([]);
    assert.true(event.defaultPrevented);
    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();
    assert.dom('.select-box__option[aria-selected="true"]').doesNotExist();
  });

  test('enter in input of combobox (with a trigger)', async function (assert) {
    assert.expect(12);

    await render(
      <template>
        <SelectBox @value="b" @onChange={{handleChange}} as |sb|>
          <sb.Dropdown>
            <sb.Input {{on "keydown" handleKeyDown}} />
            <sb.Trigger />
            <sb.Content>
              <sb.Options>
                <sb.Option @value="a" />
                <sb.Option @value="b" />
                <sb.Option @value="c" />
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    // pressing enter whilst inside an input would usually submit the form
    // but in this case, since there is a trigger, the select box will toggle

    await focus('.select-box__input');
    await triggerKeyEvent('.select-box__input', 'keydown', 'Enter');

    assert.verifySteps([]);
    assert.true(event.defaultPrevented);
    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'true');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'true');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true')
      .hasAttribute('aria-selected', 'true');

    await triggerKeyEvent('.select-box__input', 'keydown', 'Enter');

    assert.verifySteps([]);
    assert.true(event.defaultPrevented);
    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true')
      .hasAttribute('aria-selected', 'true');
  });

  test('enter in input of combobox (with active option)', async function (assert) {
    assert.expect(5);

    await render(
      <template>
        <SelectBox @onChange={{handleChange}} as |sb|>
          <sb.Dropdown>
            <sb.Input {{on "keydown" handleKeyDown}} />
            <sb.Content>
              <sb.Options>
                <sb.Option @value="a" />
                <sb.Option @value="b" />
                <sb.Option @value="c" />
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await focus('.select-box__input');
    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');
    await triggerKeyEvent('.select-box__input', 'keydown', 'Enter');

    assert.verifySteps(['b']);

    assert.true(
      event.defaultPrevented,
      `pressing enter whilst inside an input will not submit the form
       because instead, it will select the active option`
    );

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-expanded', 'false');
  });

  test('enter in a combobox (but without options)', async function (assert) {
    assert.expect(2);

    // Just because there are no options (no listbox), yet, pressing enter
    // should still not submit the form

    await render(
      <template>
        <SelectBox @value="b" @onChange={{handleChange}} as |sb|>
          <sb.Dropdown as |dd|>
            <sb.Input {{on "keydown" handleKeyDown}} />
            <sb.Trigger />
            {{#if dd.isOpen}}
              <sb.Content>
                <sb.Options>
                  <sb.Option />
                </sb.Options>
              </sb.Content>
            {{/if}}
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await focus('.select-box__input');
    await triggerKeyEvent('.select-box__input', 'keydown', 'Enter');

    assert.verifySteps([]);
    assert.true(event.defaultPrevented);
  });

  test('enter in listbox', async function (assert) {
    assert.expect(4);

    await render(
      <template>
        <SelectBox
          @onChange={{handleChange}}
          {{on "keydown" handleKeyDown}}
          as |sb|
        >
          <sb.Options>
            <sb.Option @value="a" />
            <sb.Option @value="b" />
            <sb.Option @value="c" />
          </sb.Options>
        </SelectBox>
      </template>
    );

    await focus('.select-box__options');
    await triggerEvent('.select-box__option:nth-child(2)', 'mouseenter');
    await triggerKeyEvent('.select-box__options', 'keydown', 'Enter');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute(
        'aria-selected',
        'true',
        'pressing enter with an active option selects that option'
      );

    assert.verifySteps(['b']);
    assert.false(event.defaultPrevented);
  });

  test('pressing enter on a child', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Options>
            <sb.Option>
              <a href="#" {{on "keydown" handleKeyDown}}>Link</a>
            </sb.Option>
          </sb.Options>
        </SelectBox>
      </template>
    );

    await focus('.select-box__options');
    await triggerKeyEvent('a', 'keydown', 'Enter');

    assert.false(event.defaultPrevented, 'ui still accessible');
  });

  test('pressing enter on a focusable option (listbox)', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <SelectBox @onChange={{handleChange}} as |sb|>
          <sb.Options>
            <sb.Option @value="1" tabindex="0" />
          </sb.Options>
        </SelectBox>
      </template>
    );

    await focus('.select-box__option');
    await triggerKeyEvent('.select-box__option', 'keydown', 'Enter');

    assert.verifySteps(['1']);
  });

  test('pressing enter on a focusable option (combobox)', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <SelectBox @onChange={{handleChange}} as |sb|>
          <sb.Dropdown>
            <sb.Trigger />
            <sb.Content>
              <sb.Options>
                <sb.Option @value="1" tabindex="0" />
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');
    await focus('.select-box__option');
    await triggerKeyEvent('.select-box__option', 'keydown', 'Enter');

    assert.verifySteps(['1']);
  });
});
