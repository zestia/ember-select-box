import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, focus, click, blur } from '@ember/test-helpers';
import Dropdown from '@zestia/ember-select-box/components/dropdown';
import { on } from '@ember/modifier';

module('dropdownx (focus)', function (hooks) {
  setupRenderingTest(hooks);

  test('focus leaving the dropdown trigger', async function (assert) {
    assert.expect(2);

    await render(<template>
      <Dropdown as |dd|>
        <dd.Trigger />
      </Dropdown>
    </template>);

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await blur('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
  });

  test('focus leaving the dropdown trigger when manually opened', async function (assert) {
    assert.expect(2);

    await render(<template>
      <Dropdown @open={{true}} as |dd|>
        <dd.Trigger />
      </Dropdown>

      <button type="button" class="outside" />
    </template>);

    await focus('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await focus('.outside');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
  });

  test('focus leaving an interactive element inside the dropdown', async function (assert) {
    assert.expect(2);

    await render(<template>
      <Dropdown as |dd|>
        <dd.Trigger />
        <button type="button" class="inside" />
      </Dropdown>

      <button type="button" class="outside" />
    </template>);

    await click('.dropdown__trigger');
    await focus('.inside');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await focus('.outside');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
  });

  test('focus leaving an interactive element inside the content', async function (assert) {
    assert.expect(2);

    await render(<template>
      <Dropdown as |dd|>
        <dd.Trigger />
        <dd.Content>
          <button type="button" class="inside" />
        </dd.Content>
      </Dropdown>

      <button type="button" class="outside" />
    </template>);

    await click('.dropdown__trigger');
    await focus('.inside');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await focus('.outside');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
  });

  test('focus moving inside the dropdown', async function (assert) {
    assert.expect(3);

    await render(<template>
      <Dropdown as |dd|>
        <dd.Trigger />
        <button type="button" class="inside" />
      </Dropdown>
    </template>);

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await focus('.inside');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');
    assert.dom('.inside').isFocused();
  });

  test('focus moving inside the content', async function (assert) {
    assert.expect(3);

    await render(<template>
      <Dropdown as |dd|>
        <dd.Trigger />
        <dd.Content>
          <button type="button" class="inside" />
        </dd.Content>
      </Dropdown>
    </template>);

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await focus('.inside');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');
    assert.dom('.inside').isFocused();
  });

  test('keyboard-focusable-scrollers', async function (assert) {
    assert.expect(2);

    // we use do not employ any methods to prevent
    // keyboard-focusable-scrollers from taking affect.

    let event;

    const handleMouseDown = (_event) => (event = _event);

    await render(<template>
      {{! template-lint-disable no-pointer-down-event-binding }}
      <Dropdown as |dd|>
        <dd.Trigger />
        <dd.Content {{on "mousedown" handleMouseDown}} />
      </Dropdown>
    </template>);

    await click('.dropdown__trigger');
    await click('.dropdown__content');

    assert.dom('.dropdown__content').doesNotHaveAttribute('tabindex');
    assert.false(event.defaultPrevented);
  });
});
