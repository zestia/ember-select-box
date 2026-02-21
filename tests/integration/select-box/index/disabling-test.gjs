import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, triggerKeyEvent } from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (disabling)', function (hooks) {
  setupRenderingTest(hooks);

  test('disabled (input only)', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <SelectBox @disabled={{true}} as |sb|>
          <sb.Input />
          <sb.Options>
            <sb.Option />
            <sb.Option />
            <sb.Option />
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box').hasAttribute('data-disabled', 'true');
    assert.dom('.select-box__input').isDisabled();
    assert
      .dom('.select-box__option[aria-disabled="true"]')
      .exists({ count: 3 });
  });

  test('disabled (trigger only)', async function (assert) {
    assert.expect(4);

    await render(
      <template>
        <SelectBox @disabled={{true}} as |sb|>
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

    assert.dom('.select-box').hasAttribute('data-disabled', 'true');
    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute('aria-disabled', 'true');
    assert.dom('.select-box .dropdown__trigger').hasAttribute('tabindex', '-1');
    assert
      .dom('.select-box__option[aria-disabled="true"]')
      .exists({ count: 3 });
  });

  test('disabled with a value', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <SelectBox @value={{2}} @disabled={{true}} as |sb|>
          <sb.Options>
            <sb.Option @value={{1}} />
            <sb.Option @value={{2}} />
            <sb.Option @value={{3}} />
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'true')
      .hasAttribute(
        'aria-disabled',
        'true',
        'option is still selected, even though disabled'
      );
  });

  test('disabling with a non boolean value', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <SelectBox @disabled="foo" as |sb|>
          <sb.Options>
            <sb.Option />
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box').hasAttribute('data-disabled', 'true');
    assert.dom('.select-box__option').hasAttribute('aria-disabled', 'true');
  });

  test('clicking a disabled option', async function (assert) {
    assert.expect(2);

    const handleChange = (value) => assert.step(value);

    await render(
      <template>
        <SelectBox @onChange={{handleChange}} as |sb|>
          <sb.Dropdown as |dd|>
            <sb.Trigger />
            {{#if dd.isOpen}}
              <sb.Content>
                <sb.Options>
                  <sb.Option @value="a" />
                  <sb.Option @value="b" @disabled={{true}} />
                  <sb.Option @value="c" />
                </sb.Options>
              </sb.Content>
            {{/if}}
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger');
    await click('.select-box__option:nth-child(2)');

    assert
      .dom('.select-box .dropdown')
      .hasAttribute(
        'data-open',
        'true',
        'does not close when selecting a disabled option'
      );

    assert.verifySteps(
      [],
      'does not allow option to be selected / cause change action to fire'
    );
  });

  test('does not allow keyboard navigation', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <SelectBox @disabled={{true}} as |sb|>
          <sb.Options>
            <sb.Option />
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box__options').hasAttribute('tabindex', '-1');

    await triggerKeyEvent('.select-box__options', 'keydown', 'ArrowDown');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();
  });

  test('trigger does not open dropdown', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <SelectBox @disabled={{true}} as |sb|>
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
    await triggerKeyEvent('.select-box .dropdown__trigger', 'keydown', 'Enter');

    assert.dom('.select-box .dropdown').hasAttribute('data-open', 'false');
    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute('aria-expanded', 'false');
    assert.dom('.select-box__option').doesNotHaveAttribute('aria-current');
  });
});
