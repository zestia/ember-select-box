import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, click, find } from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';
import { tracked } from '@glimmer/tracking';

module('select-box (single)', function (hooks) {
  setupRenderingTest(hooks);

  test('single with no value', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Options>
            <sb.Option />
            <sb.Option />
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute(
        'aria-current',
        'true',
        'keyboard navigation will start from the first matching selected option'
      );

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'false');
  });

  test('single with no initial value', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Options>
            <sb.Option @value={{1}} />
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert
      .dom('.select-box__option[aria-current="true"]')
      .doesNotExist('keyboard navigation will start from the beginning');
  });

  test('single with an initial value', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <SelectBox @value={{2}} as |sb|>
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
      .hasAttribute(
        'aria-current',
        'true',
        'keyboard navigation will start from the selected option'
      );
  });

  test('single changing value arg', async function (assert) {
    assert.expect(8);

    const state = new (class {
      @tracked value = 2;
    })();

    await render(
      <template>
        {{! template-lint-disable no-forbidden-elements }}
        <style>
          .select-box__options {
            overflow: scroll;
            height: 1em;
          }
          .select-box__option {
            line-height: 1;
          }
        </style>

        <SelectBox @value={{state.value}} as |sb|>
          <sb.Options>
            <sb.Option @value={{1}}>One</sb.Option>
            <sb.Option @value={{2}}>Two</sb.Option>
            <sb.Option @value={{3}}>Three</sb.Option>
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert.strictEqual(
      find('.select-box__options').scrollTop,
      0,
      `does not trigger scroll into view on the active option
       on initial render, we don't want to accidentally cause
       the page to jump around`
    );

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'true')
      .hasAttribute('aria-current', 'true');

    state.value = 3;

    await settled();

    assert.strictEqual(
      find('.select-box__options').scrollTop,
      0,
      `changing the value programmatically does not scroll the active
       option into view. scrolling into view should only happen as
       a result of the user interacting with the select box`
    );

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .exists({ count: 1 });

    assert.dom('.select-box__option[aria-current="true"]').exists({ count: 1 });

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-selected', 'true')
      .hasAttribute('aria-current', 'true');
  });

  test('single changing value local copy with external update', async function (assert) {
    assert.expect(6);

    const state = new (class {
      @tracked value = 1;
    })();

    const handleChange = (value) => (state.value = value);

    await render(
      <template>
        <SelectBox @value={{state.value}} @onChange={{handleChange}} as |sb|>
          <sb.Dropdown>
            <sb.Trigger>
              {{sb.value}}
            </sb.Trigger>
            <sb.Content>
              <sb.Options>
                <sb.Option @value={{1}}>1</sb.Option>
                <sb.Option @value={{2}}>2</sb.Option>
                <sb.Option @value={{3}}>3</sb.Option>
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-selected', 'true');

    assert.dom('.select-box .dropdown__trigger').hasText('1');

    await click('.select-box__option:nth-child(2)');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'true');

    assert.dom('.select-box .dropdown__trigger').hasText('2');

    state.value = 3;

    await settled();

    assert.dom('.select-box .dropdown__trigger').hasText('3');

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-selected', 'true');
  });

  test("onActivate doesn't fire initially", async function (assert) {
    assert.expect(2);

    const handleActivate = () => assert.step('activate');

    await render(
      <template>
        <SelectBox @onActivate={{handleActivate}} @value={{1}} as |sb|>
          <sb.Options>
            <sb.Option @value={{1}} />
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box__option').hasAttribute('aria-current', 'true');

    assert.verifySteps([]);
  });

  test('custom build selection', async function (assert) {
    assert.expect(6);

    let value;

    const handleChange = (_value) => (value = _value);

    const buildSelection = (newValue, oldValue) => {
      assert.step(`new: ${newValue}, old: ${oldValue}`);

      return null;
    };

    await render(
      <template>
        <SelectBox
          @value={{1}}
          @onChange={{handleChange}}
          @onBuildSelection={{buildSelection}}
          as |sb|
        >
          <sb.Options>
            <sb.Option @value={{1}}>One</sb.Option>
            <sb.Option @value={{2}}>Two</sb.Option>
            <sb.Option @value={{3}}>Three</sb.Option>
          </sb.Options>
        </SelectBox>
      </template>
    );

    await click('.select-box__option:nth-child(2)');

    assert.verifySteps(['new: 2, old: 1']);
    assert.strictEqual(value, null);

    await click('.select-box__option:nth-child(3)');

    assert.verifySteps(['new: 3, old: null']);
    assert.deepEqual(value, null);
  });

  test('ignore selection approach 1', async function (assert) {
    assert.expect(3);

    const state = new (class {
      @tracked value = 2;
    })();

    const handleChange = () => (state.value = 2);

    await render(
      <template>
        <SelectBox @value={{state.value}} @onChange={{handleChange}} as |sb|>
          <sb.Dropdown>
            <sb.Trigger>
              {{state.value}},
              {{sb.value}}
            </sb.Trigger>
            <sb.Options>
              <sb.Option @value={{1}}>One</sb.Option>
              <sb.Option @value={{2}}>Two</sb.Option>
              <sb.Option @value={{3}}>Three</sb.Option>
            </sb.Options>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box__option:nth-child(3)');

    assert.strictEqual(state.value, 2);

    assert.dom('.select-box .dropdown__trigger').hasText('2, 3');

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .hasText(
        'Three',
        'not possible to ignore selected value using this data-down technique'
      );
  });

  test('ignore selection approach 2', async function (assert) {
    assert.expect(3);

    const state = new (class {
      @tracked value = 2;
    })();

    const handleChange = (value) => (state.value = value);

    const buildSelection = (newValue, oldValue) => {
      handleChange(newValue);
      return oldValue;
    };

    await render(
      <template>
        <SelectBox
          @value={{state.value}}
          @onBuildSelection={{buildSelection}}
          as |sb|
        >
          <sb.Dropdown>
            <sb.Trigger>
              {{state.value}},
              {{sb.value}}
            </sb.Trigger>
            <sb.Options>
              <sb.Option @value={{1}}>One</sb.Option>
              <sb.Option @value={{2}}>Two</sb.Option>
              <sb.Option @value={{3}}>Three</sb.Option>
            </sb.Options>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box__option:nth-child(3)');

    assert.strictEqual(state.value, 3);

    assert.dom('.select-box .dropdown__trigger').hasText('3, 2');

    assert.dom('.select-box__option[aria-selected="true"]').hasText(
      'Two',
      `its possible to create a select box that collects a value,
       but the UI does not reflect that selection. this allows developers
       to leave the select box in a 'pending' state until some later time,
       when the value is persisted for example.`
    );
  });
});
