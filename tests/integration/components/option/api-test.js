import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { triggerEvent, findAll, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box/option (api)', function (hooks) {
  setupRenderingTest(hooks);

  test('api', async function (assert) {
    assert.expect(6);

    this.capture = (o) => (this.api = o);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option as |option|>
            {{this.capture option}}
          </sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    assert.strictEqual(this.api.index, 0);
    assert.false(this.api.isActive);
    assert.true(this.api.isSelected);
    assert.strictEqual(this.api.isDisabled, undefined);
    assert.strictEqual(this.api.value, undefined);
    assert.ok(this.api.id.match(/[\w\d+]/));
  });

  test('isActive', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Option as |option|>
            {{option.isActive}}
          </sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.select-box__option').hasText('false');

    await triggerEvent('.select-box__option', 'mouseenter');

    assert.dom('.select-box__option').hasText('true');
  });

  test('isSelected', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <SelectBox @value={{this.value}} as |sb|>
        <sb.Options>
          <sb.Option as |option|>
            {{option.isSelected}}
          </sb.Option>
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.select-box__option').hasText('true');

    this.set('value', null);

    await settled();

    assert.dom('.select-box__option').hasText('false');
  });

  test('index', async function (assert) {
    assert.expect(3);

    await render(hbs`
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
    `);

    assert.dom('.select-box__option:nth-child(1)').hasText('0');
    assert.dom('.select-box__option:nth-child(2)').hasText('1');
    assert.dom('.select-box__option:nth-child(3)').hasText('2');
  });

  test('index of disabled options', async function (assert) {
    assert.expect(4);

    await render(hbs`
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
    `);

    assert.dom('.select-box__option:nth-child(1)').hasText('0');
    assert.dom('.select-box__option:nth-child(2)').hasText('-1');
    assert.dom('.select-box__option:nth-child(3)').hasText('1');

    assert.dom('.select-box__option[aria-current="true"]').doesNotExist(
      '0',
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

    this.group1 = [foo, bar];
    this.group2 = [baz, qux];
    this.myValue = baz;

    await render(hbs`
      <SelectBox @value={{this.myValue}} as |sb|>
        <sb.Options>
          <sb.Group @label="Group 1">
            {{#each this.group1 as |item i|}}
              <sb.Option @value={{item}} as |option|>
                {{option.value.myLabel}} {{i}} {{option.index}} {{option.isSelected}}
              </sb.Option>
            {{/each}}
          </sb.Group>
          <sb.Group @label="Group 2">
            {{#each this.group2 as |item i|}}
              <sb.Option @value={{item}} as |option|>
                {{option.value.myLabel}} {{i}} {{option.index}} {{option.isSelected}}
              </sb.Option>
            {{/each}}
          </sb.Group>
        </sb.Options>
      </SelectBox>
    `);

    // select box options can yield their label, value, index and selected state
    assert.dom(findAll('.select-box__option')[0]).hasText('Foo 0 0 false');
    assert.dom(findAll('.select-box__option')[1]).hasText('Bar 1 1 false');
    assert.dom(findAll('.select-box__option')[2]).hasText('Baz 0 2 true');
    assert.dom(findAll('.select-box__option')[3]).hasText('Qux 1 3 false');

    this.set('group2', [qux, baz]);

    // index gets out of sync due to lack of key="@index"'
    // this is not the responsibility of the addon to fix
    assert.dom(findAll('.select-box__option')[0]).hasText('Foo 0 0 false');
    assert.dom(findAll('.select-box__option')[1]).hasText('Bar 1 1 false');
    assert.dom(findAll('.select-box__option')[2]).hasText('Qux 0 3 false');
    assert.dom(findAll('.select-box__option')[3]).hasText('Baz 1 2 true');
  });
});
