import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, find } from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box/group', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Group />
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__group').hasTagName('div');
  });

  test('splattributes', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Group class="foo" />
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__group').hasClass('foo');
  });

  test('whitespace', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Group />
        </sb.Options>
      </SelectBox>
    </template>);

    assert.strictEqual(find('.select-box__group-label').innerHTML, '');
    assert.strictEqual(find('.select-box__group-options').innerHTML, '');
  });

  test('label', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Group @label="Foo" />
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__group-label').hasText('Foo');
  });

  test('role', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Group />
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__group').hasAttribute('role', 'group');
  });

  test('aria', async function (assert) {
    assert.expect(3);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Group />
        </sb.Options>
      </SelectBox>
    </template>);

    const label = find('.select-box__group-label').getAttribute('id');
    const group = find('.select-box__group').getAttribute('aria-labelledby');

    assert.ok(label.match(/[\w\d]+/));
    assert.ok(group.match(/[\w\d]+/));
    assert.true(label === group);
  });

  test('block', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Options>
          <sb.Group>
            Hello World
          </sb.Group>
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box__group-options').hasText('Hello World');
  });
});
