import { module, skip, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import {
  render,
  click,
  fillIn,
  focus,
  triggerEvent,
  triggerKeyEvent
} from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';
import { modifier } from 'ember-modifier';
import { tracked } from '@glimmer/tracking';

module('select-box (edge cases)', function (hooks) {
  setupRenderingTest(hooks);

  // Regression test for issue
  // https://github.com/ember-modifier/ember-modifier/issues/851

  const position = modifier(
    (dropdown, [container]) => (dropdown.dataset.positioned = 'true')
  );

  skip('it does not blow up', async function (assert) {
    assert.expect(0);

    const state = new (class {
      @tracked value;
    })();

    const handleChange = (value) => {
      state.value = value;
    };

    await render(<template>
      <SelectBox @value={{state.value}} @onChange={{handleChange}} as |sb|>
        <sb.Dropdown as |dd|>
          <sb.Trigger />
          <sb.Content {{(if dd.isOpen (modifier position sb.element))}}>
            <sb.Options>
              <sb.Option @value="foo" />
            </sb.Options>
          </sb.Content>
        </sb.Dropdown>
      </SelectBox>
    </template>);

    await click('.select-box .dropdown__trigger'); // Open
    await click('.select-box__option'); // Close
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
          <sb.Dropdown>
            <sb.Trigger />
            <sb.Content>
              <sb.Options>
                {{#unless state.value}}
                  <sb.Option @value="foo" />
                {{/unless}}
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      {{/unless}}
    </template>);

    await click('.select-box .dropdown__trigger');
    await click('.select-box__option');

    assert.ok(true, 'does not cause infinite revalidation bug');
  });

  test('destroying a select box with an input, and a dropdown with no trigger', async function (assert) {
    assert.expect(1);

    const state = new (class {
      @tracked hideSelectBox;
    })();

    const handleChange = (value) => {
      state.hideSelectBox = true;
    };

    const handleSearch = (query, sb) => {
      sb.dropdown.open();
    };

    await render(<template>
      {{#unless state.hideSelectBox}}
        <SelectBox
          @onSearch={{handleSearch}}
          @onChange={{handleChange}}
          as |sb|
        >
          <sb.Dropdown>
            <sb.Input />
            <sb.Content>
              <sb.Options>
                <sb.Option @value="foo" />
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      {{/unless}}
    </template>);

    await fillIn('.select-box__input', 'f');
    await triggerKeyEvent('.select-box__input', 'keydown', 'ArrowDown');
    await triggerKeyEvent('.select-box__option', 'keydown', 'Enter');

    assert.dom('.select-box').doesNotExist();
  });
});
