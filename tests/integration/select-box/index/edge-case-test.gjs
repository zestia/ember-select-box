import { module, skip, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';
import { modifier as _modifier } from 'ember-modifier';
import { tracked } from '@glimmer/tracking';

module('select-box (edge cases)', function (hooks) {
  setupRenderingTest(hooks);

  // Regression test for issue
  // https://github.com/ember-modifier/ember-modifier/issues/851

  const position = _modifier(
    (dropdown) => (dropdown.dataset.positioned = 'true')
  );

  test('it does not blow up', async function (assert) {
    assert.expect(0);

    await render(
      <template>
        <SelectBox as |sb|>
          <sb.Dropdown as |dd|>
            <sb.Trigger />
            <sb.Content {{(if dd.isOpen (modifier position sb.element))}}>
              <sb.Options>
                <sb.Option @value="foo" />
              </sb.Options>
            </sb.Content>
          </sb.Dropdown>
        </SelectBox>
      </template>
    );

    await click('.select-box .dropdown__trigger'); // Open
    await click('.select-box__option'); // Close
  });

  test('destroying a select box after clicking an option', async function (assert) {
    assert.expect(1);

    const state = new (class {
      value;
      @tracked show = true;
    })();

    const handleChange = (value) => {
      state.value = value;
      state.show = false;
    };

    await render(
      <template>
        {{#if state.show}}
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
        {{/if}}
      </template>
    );

    await click('.select-box .dropdown__trigger');
    await click('.select-box__option');

    assert
      .dom('.select-box')
      .doesNotExist('does not cause infinite revalidation bug');
  });
});
