import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { capitalize, camelize } from '@ember/string';

module('select-box', function (hooks) {
  setupRenderingTest(hooks);

  test('defaults', async function (assert) {
    assert.expect(11);

    await render(hbs`
    <SelectBox @disabled={{true}}  as |sb|>
      <sb.Input />
      <sb.SelectedOptions>
        <sb.SelectedOption />
      </sb.SelectedOptions>
      <sb.Options>
        <sb.Group>
          <sb.Option />
        </sb.Group>
      </sb.Options>
    </SelectBox>
  `);

    assert.dom('.select-box').exists();
    assert.dom('.select-box--disabled').exists();
    assert.dom('.select-box__input').exists();
    assert.dom('.select-box__options').exists();
    assert.dom('.select-box__selected-options').exists();
    assert.dom('.select-box__group').exists();
    assert.dom('.select-box__group-label').exists();
    assert.dom('.select-box__group-options').exists();
    assert.dom('.select-box__option').exists();
    assert.dom('.select-box__selected-option').exists();
    assert.dom('.select-box__option--selected').exists();
  });

  test('class prefix', async function (assert) {
    assert.expect(11);

    await render(hbs`
      <SelectBox @classNamePrefix="foo" @disabled={{true}}  as |sb|>
        <sb.Input />
        <sb.SelectedOptions>
          <sb.SelectedOption />
        </sb.SelectedOptions>
        <sb.Options>
          <sb.Group>
            <sb.Option />
          </sb.Group>
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.foo').exists();
    assert.dom('.foo--disabled').exists();
    assert.dom('.foo__input').exists();
    assert.dom('.foo__options').exists();
    assert.dom('.foo__selected-options').exists();
    assert.dom('.foo__group').exists();
    assert.dom('.foo__group-label').exists();
    assert.dom('.foo__group-options').exists();
    assert.dom('.foo__option').exists();
    assert.dom('.foo__selected-option').exists();
    assert.dom('.foo__option--selected').exists();
  });

  test('custom class names', async function (assert) {
    assert.expect(11);

    this.buildClassName = (child, state) => {
      let className = 'sb';

      if (child) {
        className = `${className}${capitalize(camelize(child))}`;
      }

      if (state) {
        className = `${className}-${state}`;
      }

      return className;
    };

    await render(hbs`
      <SelectBox @onBuildClassName={{this.buildClassName}} @disabled={{true}} as |sb|>
        <sb.Input />
        <sb.SelectedOptions>
          <sb.SelectedOption />
        </sb.SelectedOptions>
        <sb.Options>
          <sb.Group>
            <sb.Option />
          </sb.Group>
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.sb').exists();
    assert.dom('.sb-disabled').exists();
    assert.dom('.sbInput').exists();
    assert.dom('.sbOptions').exists();
    assert.dom('.sbSelectedOptions').exists();
    assert.dom('.sbGroup').exists();
    assert.dom('.sbGroupLabel').exists();
    assert.dom('.sbGroupOptions').exists();
    assert.dom('.sbOption').exists();
    assert.dom('.sbSelectedOption').exists();
    assert.dom('.sbOption-selected').exists();
  });
});
