import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import SelectBox from '@zestia/ember-select-box/components/select-box';

module('select-box/content', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(4);

    // The select box yields its own preconfigured
    // version of dropdown content.

    await render(<template>
      <SelectBox as |sb|>
        <sb.Dropdown>
          <sb.Content class="foo">
            Foo
          </sb.Content>
        </sb.Dropdown>
      </SelectBox>
    </template>);

    assert
      .dom('.dropdown__content')
      .hasTagName('div')
      .hasText('Foo', 'block')
      .hasAttribute('tabindex', '-1', 'skips')
      .hasClass('foo', 'splattributes');
  });

  test('it does not render when there is no dropdown', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox as |sb|>
        <sb.Content />
      </SelectBox>
    </template>);

    assert.dom('.dropdown__content').doesNotExist();
  });
});
