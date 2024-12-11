import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, focus, click } from '@ember/test-helpers';
import Dropdown from '@zestia/ember-select-box/components/dropdown';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import autoFocus from '@zestia/ember-auto-focus/modifiers/auto-focus';

module('dropdown (focus)', function (hooks) {
  setupRenderingTest(hooks);

  let handleClose;

  hooks.beforeEach(function (assert) {
    handleClose = (reason) => assert.step(`close ${reason.description}`);
  });

  test('clicking an interactive element inside the dropdown container', async function (assert) {
    assert.expect(4);

    await render(<template>
      <Dropdown @onClose={{handleClose}} as |dd|>
        <dd.Trigger />
        <button type="button" class="inside" />
      </Dropdown>
    </template>);

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await click('.inside');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');
    assert.dom('.inside').isFocused();
    assert.verifySteps([]);
  });

  test('clicking an interactive element inside the dropdown content', async function (assert) {
    assert.expect(5);

    let event;

    const handleMouseDown = (_event) => (event = _event);

    await render(<template>
      {{! template-lint-disable no-pointer-down-event-binding }}
      <Dropdown
        @onClose={{handleClose}}
        {{on "mousedown" handleMouseDown}}
        as |dd|
      >
        <dd.Trigger />
        <dd.Content>
          <button type="button" class="inside" />
        </dd.Content>
      </Dropdown>
    </template>);

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await click('.inside');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');
    assert.dom('.dropdown__trigger').isNotFocused();
    assert.false(event.defaultPrevented);
    assert.verifySteps([]);
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
    // keyboard-focusable-scrollers from taking affect
    // this allows focus to move to the dropdown content
    // when it is overflowing.

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

  test('closing does not steal focus', async function (assert) {
    assert.expect(1);

    const state = new (class {
      @tracked showInput;
    })();

    const handleClick = () => {
      state.showInput = true;
    };

    await render(<template>
      <Dropdown as |dd|>
        <dd.Trigger />
        <dd.Content>
          <button
            type="button"
            class="inside"
            {{on "click" handleClick}}
            {{on "click" dd.close}}
          />
        </dd.Content>
      </Dropdown>

      {{#if state.showInput}}
        <input class="outside" aria-label="Example" {{autoFocus}} />
      {{/if}}
    </template>);

    await click('.dropdown__trigger');
    await click('.inside');

    assert.dom('.outside').isFocused();
  });
});
