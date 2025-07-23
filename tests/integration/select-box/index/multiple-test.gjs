import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, focus, click } from '@ember/test-helpers';
import { array } from '@ember/helper';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box (multiple)', function (hooks) {
  setupRenderingTest(hooks);

  test('multiple with no initial value', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <SelectBox @multiple={{true}} as |sb|>
          <sb.Options>
            <sb.Option />
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await focus('.select-box__options');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();
  });

  test('multiple with an initial value', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <SelectBox @multiple={{true}} @value={{array 2 3}} as |sb|>
          <sb.Options>
            <sb.Option @value={{1}} />
            <sb.Option @value={{2}} />
            <sb.Option @value={{3}} />
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();

    await focus('.select-box__options');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();
  });

  test('selecting an option when value not an array', async function (assert) {
    assert.expect(1);

    let value;

    const handleChange = (_value) => (value = _value);

    await render(
      <template>
        <SelectBox
          @value={{null}}
          @multiple={{true}}
          @onChange={{handleChange}}
          as |sb|
        >
          <sb.Options>
            <sb.Option @value={{1}}>One</sb.Option>
          </sb.Options>
        </SelectBox>
      </template>
    );

    await click('.select-box__option');

    assert.deepEqual(value, [1], 'coerces to an array');
  });

  test('default build selection toggles selected values (add/remove)', async function (assert) {
    assert.expect(3);

    let value;

    const handleChange = (_value) => (value = _value);

    await render(
      <template>
        <SelectBox @multiple={{true}} @onChange={{handleChange}} as |sb|>
          <sb.Options>
            <sb.Option @value={{1}}>One</sb.Option>
            <sb.Option @value={{2}}>Two</sb.Option>
          </sb.Options>
        </SelectBox>
      </template>
    );

    await click('.select-box__option:nth-child(1)');

    assert.deepEqual(value, [1]);

    await click('.select-box__option:nth-child(2)');

    assert.deepEqual(value, [1, 2]);

    await click('.select-box__option:nth-child(1)');

    assert.deepEqual(value, [2]);
  });

  test('custom build selection', async function (assert) {
    assert.expect(9);

    let value;

    const handleChange = (_value) => (value = _value);

    const buildSelection = (newValue, oldValue) => {
      assert.step(`new: ${newValue}, old: ${oldValue}`);

      const value = [...oldValue];

      if (!value.includes(newValue)) {
        value.push(newValue);
      }

      return value;
    };

    await render(
      <template>
        <SelectBox
          @multiple={{true}}
          @onChange={{handleChange}}
          @onBuildSelection={{buildSelection}}
          as |sb|
        >
          <sb.Options>
            <sb.Option @value={{1}}>One</sb.Option>
            <sb.Option @value={{2}}>Two</sb.Option>
          </sb.Options>
        </SelectBox>
      </template>
    );

    await click('.select-box__option:nth-child(1)');

    assert.verifySteps(['new: 1, old: ']);
    assert.deepEqual(value, [1]);

    await click('.select-box__option:nth-child(2)');

    assert.verifySteps(['new: 2, old: 1']);
    assert.deepEqual(value, [1, 2]);

    await click('.select-box__option:nth-child(1)');

    assert.verifySteps(['new: 1, old: 1,2']);
    assert.deepEqual(value, [1, 2]);
  });

  test('coerced to array', async function (assert) {
    assert.expect(3);

    let value;

    const handleChange = (_value) => (value = _value);

    await render(
      <template>
        <SelectBox
          @value={{2}}
          @multiple={{true}}
          @onChange={{handleChange}}
          as |sb|
        >
          <sb.Options>
            <sb.Option @value={{1}}>One</sb.Option>
            <sb.Option @value={{2}}>Two</sb.Option>
          </sb.Options>
        </SelectBox>
      </template>
    );

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-selected', 'false');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-selected', 'true');

    await click('.select-box__option:nth-child(1)');

    assert.deepEqual(value, [2, 1]);
  });
});
