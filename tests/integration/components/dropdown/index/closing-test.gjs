import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import {
  render,
  click,
  rerender,
  triggerEvent,
  triggerKeyEvent
} from '@ember/test-helpers';
import Dropdown from '@zestia/ember-select-box/components/dropdown';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import autoFocus from '@zestia/ember-auto-focus/modifiers/auto-focus';

module('dropdownx (closing)', function (hooks) {
  setupRenderingTest(hooks);

  let handleClose;

  hooks.beforeEach(function (assert) {
    handleClose = (reason) => assert.step(`close ${reason.description}`);
  });

  test('closing with api', async function (assert) {
    assert.expect(3);

    let api;

    const handleReady = (dd) => (api = dd);

    await render(<template>
      <Dropdown @onReady={{handleReady}} as |dd|>
        <dd.Trigger />
      </Dropdown>
    </template>);

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    api.close();

    await rerender();

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.dom('.dropdown__trigger').isFocused();
  });

  test('pressing escape', async function (assert) {
    assert.expect(3);

    await render(<template>
      <Dropdown @onClose={{handleClose}} as |dd|>
        <dd.Trigger />
      </Dropdown>
    </template>);

    await click('.dropdown__trigger');

    await triggerKeyEvent('.dropdown', 'keydown', 'Escape');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.verifySteps(['close ESCAPE']);
  });

  test('clicking outside', async function (assert) {
    assert.expect(5);

    await render(<template>
      <Dropdown @onClose={{handleClose}} as |dd|>
        <dd.Trigger />
      </Dropdown>
      <div class="outside"></div>
    </template>);

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await click('.outside');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.dom('.dropdown__trigger').isNotFocused();
    assert.verifySteps(['close FOCUS_LEAVE']);
  });

  test('clicking dropdown container', async function (assert) {
    assert.expect(5);

    // This tests that the dropdown container is treated
    // as empty space, and so click it is the same as
    // clicking outside the dropdown content element.

    await render(<template>
      <Dropdown @onClose={{handleClose}} as |dd|>
        <dd.Trigger />
      </Dropdown>
    </template>);

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await click('.dropdown');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.dom('.dropdown__trigger').isNotFocused();
    assert.verifySteps(['close FOCUS_LEAVE']);
  });

  test('clicking a non interactive element inside the dropdown content', async function (assert) {
    assert.expect(6);

    // Selecting text won't cause the dropdown to close.

    await render(<template>
      <Dropdown @onClose={{handleClose}} as |dd|>
        <dd.Trigger />
        <dd.Content>
          <span class="inside" />
        </dd.Content>
      </Dropdown>

      <div class="outside"></div>
    </template>);

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await click('.inside');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');
    assert.dom('.dropdown__trigger').isNotFocused();
    assert.verifySteps([]);

    await click('.outside');

    assert.verifySteps(['close CLICK_OUTSIDE']);
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

  test('closing with api', async function (assert) {
    assert.expect(5);

    await render(<template>
      <Dropdown @onClose={{handleClose}} as |dd|>
        <dd.Trigger />
        <dd.Content>
          <button type="button" class="close" {{on "click" dd.close}} />
        </dd.Content>
      </Dropdown>
    </template>);

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    // Intentionally twice
    await click('.close');
    await click('.close');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.dom('.dropdown__trigger').isNotFocused();
    assert.verifySteps(['close undefined']);
  });

  test('mousing down on the trigger but mousing up outside', async function (assert) {
    assert.expect(3);

    // aka click-abort

    await render(<template>
      <Dropdown as |dd|>
        <dd.Trigger />
      </Dropdown>
      <div class="outside"></div>
    </template>);

    assert.dom('.dropdown').hasAttribute('data-open', 'false');

    await triggerEvent('.dropdown__trigger', 'mousedown');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await triggerEvent('.outside', 'mouseup');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
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
