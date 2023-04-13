import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, focus } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (single)', function (hooks) {
  setupRenderingTest(hooks);

  test('single with no initial value', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option @value={{1}} />
        </sb.Options>
      </SelectBox>
    `);

    assert
      .dom('.select-box__option[aria-current="true"]')
      .doesNotExist('keyboard navigation will start from the beginning');
  });

  test('single with an initial value', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox @value={{2}} as |sb|>
        <sb.Options>
          <sb.Option @value={{1}} />
          <sb.Option @value={{2}} />
          <sb.Option @value={{3}} />
        </sb.Options>
      </SelectBox>
    `);

    assert
      .dom('.select-box__option[aria-current="true"]')
      .doesNotExist(
        'options are never active if the select box does not have focus'
      );
  });

  test('listbox with an initial value (receiving focus)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox @value={{2}} as |sb|>
        <sb.Options>
          <sb.Option @value={{1}} />
          <sb.Option @value={{2}} />
          <sb.Option @value={{3}} />
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__options');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();
  });

  test('combobox with an initial value (receiving focus - trigger)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox @value={{2}} as |sb|>
        <sb.Trigger />
        <sb.Options>
          <sb.Option @value={{1}} />
          <sb.Option @value={{2}} />
          <sb.Option @value={{3}} />
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__trigger');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();
  });

  test('combobox with an initial value (receiving focus - input)', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox @value={{2}} as |sb|>
        <sb.Input />
        <sb.Options>
          <sb.Option @value={{1}} />
          <sb.Option @value={{2}} />
          <sb.Option @value={{3}} />
        </sb.Options>
      </SelectBox>
    `);

    await focus('.select-box__input');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist();
  });
});
