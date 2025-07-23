import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import Dropdown from '@zestia/ember-select-box/components/dropdown';

module('dropdown/trigger', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <Dropdown as |dd|>
          <dd.Trigger />
        </Dropdown>
      </template>
    );

    assert.dom('.dropdown__trigger').hasTagName('div');
  });

  test('splattributes', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <Dropdown as |dd|>
          <dd.Trigger class="foo" />
        </Dropdown>
      </template>
    );

    assert.dom('.dropdown__trigger').hasClass('foo');
  });

  test('role', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <Dropdown as |dd|>
          <dd.Trigger />
        </Dropdown>
      </template>
    );

    assert.dom('.dropdown__trigger').hasAttribute('role', 'button');
  });

  test('role (closure component)', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <Dropdown as |dd|>
          {{component dd.Trigger role="button"}}
        </Dropdown>
      </template>
    );

    assert.dom('.dropdown__trigger').hasAttribute('role', 'button');
  });

  test('tabindex', async function (assert) {
    assert.expect(1);

    // Requires tabindex so that Safari will populate relatedTarget
    // and handle focus properly.

    await render(
      <template>
        <Dropdown as |dd|>
          <dd.Trigger />
        </Dropdown>
      </template>
    );

    assert.dom('.dropdown__trigger').hasAttribute('tabindex', '0');
  });

  test('tabindex (closure component)', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <Dropdown as |dd|>
          {{component dd.Trigger tabindex="-1"}}
        </Dropdown>
      </template>
    );

    assert.dom('.dropdown__trigger').hasAttribute('tabindex', '-1');
  });

  test('class (closure component)', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <Dropdown as |dd|>
          {{component dd.Trigger class="foo"}}
        </Dropdown>
      </template>
    );

    assert.dom('.dropdown__trigger').hasClass('foo');
  });

  test('whitespace', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <Dropdown as |dd|>
          <dd.Trigger />
        </Dropdown>
      </template>
    );

    assert.strictEqual(find('.dropdown__trigger').innerHTML, '');
  });

  test('aria defaults', async function (assert) {
    assert.expect(6);

    await render(
      <template>
        <Dropdown as |dd|>
          <dd.Trigger />
        </Dropdown>
      </template>
    );

    assert
      .dom('.dropdown__trigger')
      .hasAttribute('aria-expanded', 'false')
      .hasAttribute('aria-haspopup', 'true')
      .doesNotHaveAttribute('aria-busy')
      .doesNotHaveAttribute('aria-controls')
      .doesNotHaveAttribute('aria-disabled')
      .doesNotHaveAttribute('aria-activedescendant');
  });

  test('aria (closure component)', async function (assert) {
    assert.expect(6);

    await render(
      <template>
        <Dropdown as |dd|>
          {{component
            dd.Trigger
            aria-expanded="true"
            aria-busy="true"
            aria-controls="foo"
            aria-disabled="true"
            aria-activedescendant="bar"
          }}
        </Dropdown>
      </template>
    );

    assert
      .dom('.dropdown__trigger')
      .hasAttribute('aria-haspopup', 'true')
      .hasAttribute('aria-expanded', 'true')
      .hasAttribute('aria-busy', 'true')
      .hasAttribute('aria-controls', 'foo')
      .hasAttribute('aria-disabled', 'true')
      .hasAttribute('aria-activedescendant', 'bar');
  });
});
