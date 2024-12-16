import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { findAll, render, settled, rerender } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box/option (api)', function (hooks) {
  setupRenderingTest(hooks);

  test('api', async function (assert) {
    assert.expect(6);

    let api;

    const capture = (o) => (api = o);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option as |option|>
            {{capture option}}
          </sb.Option>
        </sb.Options>
      </SelectBox>
    </template>);

    assert.strictEqual(api.index, 0);
    assert.true(api.isActive);
    assert.true(api.isSelected);
    assert.strictEqual(api.isDisabled, null);
    assert.strictEqual(api.value, undefined);
    assert.ok(api.id.match(/[\w\d+]/));
  });

  test('isActive', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option as |option|>
            {{option.isActive}}
          </sb.Option>
          <sb.Option as |option|>
            {{option.isActive}}
          </sb.Option>
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__option:nth-child(1)').hasText('true');
    assert.dom('.select-box__option:nth-child(2)').hasText('false');
  });

  test('isSelected', async function (assert) {
    assert.expect(2);

    const state = new (class {
      @tracked value;
    })();

    await render(<template>
      <SelectBox @value={{state.value}} as |sb|>
        <sb.Options>
          <sb.Option as |option|>
            {{option.isSelected}}
          </sb.Option>
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__option').hasText('true');

    state.value = null;

    await settled();

    assert.dom('.select-box__option').hasText('false');
  });

  test('index', async function (assert) {
    assert.expect(3);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option as |option|>
            {{option.index}}
          </sb.Option>
          <sb.Option as |option|>
            {{option.index}}
          </sb.Option>
          <sb.Option as |option|>
            {{option.index}}
          </sb.Option>
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__option:nth-child(1)').hasText('0');
    assert.dom('.select-box__option:nth-child(2)').hasText('1');
    assert.dom('.select-box__option:nth-child(3)').hasText('2');
  });

  test('index of disabled options', async function (assert) {
    assert.expect(4);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option as |option|>
            {{option.index}}
          </sb.Option>
          <sb.Option @disabled={{true}} as |option|>
            {{option.index}}
          </sb.Option>
          <sb.Option as |option|>
            {{option.index}}
          </sb.Option>
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__option:nth-child(1)').hasText('0');
    assert.dom('.select-box__option:nth-child(2)').hasText('-1');
    assert.dom('.select-box__option:nth-child(3)').hasText('1');

    assert
      .dom('.select-box__option[aria-disabled="true"]')
      .doesNotHaveAttribute(
        'aria-current',
        'true',
        `the disabled option is not accidentally computed as active
         due to having an index of -1 which is the same as the
         initial active index`
      );
  });

  test('index failure', async function (assert) {
    // https://ember-twiddle.com/ddae8f58d5175e64577e79d720013cf2

    assert.expect(8);

    const foo = { myValue: 'foo', myLabel: 'Foo' };
    const bar = { myValue: 'bar', myLabel: 'Bar' };
    const baz = { myValue: 'baz', myLabel: 'Baz' };
    const qux = { myValue: 'qux', myLabel: 'Qux' };

    const state = new (class {
      group1 = [foo, bar];
      @tracked group2 = [baz, qux];
      myValue = baz;
    })();

    await render(<template>
      <SelectBox @value={{state.myValue}} as |sb|>
        <sb.Options>
          <sb.Group @label="Group 1">
            {{#each state.group1 as |item i|}}
              <sb.Option @value={{item}} as |option|>
                {{option.value.myLabel}}
                {{i}}
                {{option.index}}
                {{option.isSelected}}
              </sb.Option>
            {{/each}}
          </sb.Group>
          <sb.Group @label="Group 2">
            {{#each state.group2 as |item i|}}
              <sb.Option @value={{item}} as |option|>
                {{option.value.myLabel}}
                {{i}}
                {{option.index}}
                {{option.isSelected}}
              </sb.Option>
            {{/each}}
          </sb.Group>
        </sb.Options>
      </SelectBox>
    </template>);

    // select box options can yield their label, value, index and selected state
    assert.dom(findAll('.select-box__option')[0]).hasText('Foo 0 0 false');
    assert.dom(findAll('.select-box__option')[1]).hasText('Bar 1 1 false');
    assert.dom(findAll('.select-box__option')[2]).hasText('Baz 0 2 true');
    assert.dom(findAll('.select-box__option')[3]).hasText('Qux 1 3 false');

    state.group2 = [qux, baz];

    await rerender();

    // index gets out of sync due to lack of key="..."'
    // this is not the responsibility of the addon to fix
    assert.dom(findAll('.select-box__option')[0]).hasText('Foo 0 0 false');
    assert.dom(findAll('.select-box__option')[1]).hasText('Bar 1 1 false');
    assert.dom(findAll('.select-box__option')[2]).hasText('Qux 0 3 false');
    assert.dom(findAll('.select-box__option')[3]).hasText('Baz 1 2 true');
  });
});
