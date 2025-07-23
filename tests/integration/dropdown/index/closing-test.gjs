import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  click,
  rerender,
  focus,
  blur,
  triggerEvent,
  triggerKeyEvent
} from '@ember/test-helpers';
import Dropdown from '@zestia/ember-select-box/components/dropdown';
import { on } from '@ember/modifier';

module('dropdown (closing)', function (hooks) {
  setupRenderingTest(hooks);

  let handleClose;

  hooks.beforeEach(function (assert) {
    handleClose = (reason) => assert.step(`close ${reason?.description}`);
  });

  test('pressing escape', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <Dropdown @onClose={{handleClose}} as |dd|>
          <dd.Trigger />
        </Dropdown>
      </template>
    );

    await click('.dropdown__trigger');

    await triggerKeyEvent('.dropdown', 'keydown', 'Escape');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.verifySteps(['close ESCAPE']);
  });

  test('clicking outside', async function (assert) {
    assert.expect(5);

    await render(
      <template>
        <Dropdown @onClose={{handleClose}} as |dd|>
          <dd.Trigger />
        </Dropdown>
        <div class="outside"></div>
      </template>
    );

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await click('.outside');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.dom('.dropdown__trigger').isNotFocused();
    assert.verifySteps(['close FOCUS_LEAVE'], 'focusout fires before mouseup');
  });

  test('clicking dropdown container', async function (assert) {
    assert.expect(5);

    // This tests that the dropdown container is treated
    // as empty space, and so click it is the same as
    // clicking outside the dropdown content element.

    await render(
      <template>
        <Dropdown @onClose={{handleClose}} as |dd|>
          <dd.Trigger />
        </Dropdown>
      </template>
    );

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await click('.dropdown');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.dom('.dropdown__trigger').isNotFocused();
    assert.verifySteps(['close FOCUS_LEAVE']);
  });

  test('clicking a non interactive element inside the dropdown content', async function (assert) {
    assert.expect(7);

    // Selecting text won't cause the dropdown to close
    // but does allow focus to be moved away from the trigger

    await render(
      <template>
        <Dropdown @onClose={{handleClose}} as |dd|>
          <dd.Trigger />
          <dd.Content>
            <span class="inside" />
          </dd.Content>
        </Dropdown>

        <div class="outside"></div>
      </template>
    );

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await click('.inside');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');
    assert.dom('.dropdown__trigger').isNotFocused();
    assert.verifySteps([]);

    await click('.outside');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.verifySteps(['close CLICK_OUTSIDE']);
  });

  test('clicking outside a manually opened dropdown', async function (assert) {
    assert.expect(4);

    await render(
      <template>
        <Dropdown @open={{true}} @onClose={{handleClose}} as |dd|>
          <dd.Content />
        </Dropdown>
        <div class="outside"></div>
      </template>
    );

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await click('.outside');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.verifySteps(['close CLICK_OUTSIDE']);
  });

  test('mousing up without first having moused down', async function (assert) {
    assert.expect(3);

    // This can happen when rendering a dropdown with an initial open state
    // that was the result of a click to reveal it.

    await render(
      <template>
        <Dropdown class="one" @open={{true}} @onClose={{handleClose}} />
        <div class="outside"></div>
      </template>
    );

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await triggerEvent('.outside', 'mouseup');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');
    assert.verifySteps([]);
  });

  test('mousing down on the trigger but mousing up outside', async function (assert) {
    assert.expect(5);

    // aka click-abort

    await render(
      <template>
        <Dropdown @onClose={{handleClose}} as |dd|>
          <dd.Trigger />
        </Dropdown>
        <div class="outside"></div>
      </template>
    );

    assert.dom('.dropdown').hasAttribute('data-open', 'false');

    await triggerEvent('.dropdown__trigger', 'mousedown');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await triggerEvent('.outside', 'mouseup');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.verifySteps(['close CLICK_OUTSIDE']);
  });

  test('focus leaving the dropdown trigger', async function (assert) {
    assert.expect(4);

    await render(
      <template>
        <Dropdown @onClose={{handleClose}} as |dd|>
          <dd.Trigger />
        </Dropdown>
      </template>
    );

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await blur('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.verifySteps(['close FOCUS_LEAVE']);
  });

  test('focus leaving the dropdown trigger when manually opened', async function (assert) {
    assert.expect(4);

    await render(
      <template>
        <Dropdown @onClose={{handleClose}} @open={{true}} as |dd|>
          <dd.Trigger />
        </Dropdown>

        <button type="button" class="outside" />
      </template>
    );

    await focus('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await focus('.outside');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.verifySteps(['close FOCUS_LEAVE']);
  });

  test('focus leaving an interactive element inside the dropdown', async function (assert) {
    assert.expect(4);

    await render(
      <template>
        <Dropdown @onClose={{handleClose}} as |dd|>
          <dd.Trigger />
          <button type="button" class="inside" />
        </Dropdown>

        <button type="button" class="outside" />
      </template>
    );

    await click('.dropdown__trigger');
    await focus('.inside');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await focus('.outside');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.verifySteps(['close FOCUS_LEAVE']);
  });

  test('focus leaving an interactive element inside the content', async function (assert) {
    assert.expect(4);

    await render(
      <template>
        <Dropdown @onClose={{handleClose}} as |dd|>
          <dd.Trigger />
          <dd.Content>
            <button type="button" class="inside" />
          </dd.Content>
        </Dropdown>

        <button type="button" class="outside" />
      </template>
    );

    await click('.dropdown__trigger');
    await focus('.inside');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await focus('.outside');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.verifySteps(['close FOCUS_LEAVE']);
  });

  test('closing with exposed api', async function (assert) {
    assert.expect(5);

    let api;

    const handleReady = (dd) => (api = dd);

    await render(
      <template>
        <Dropdown @onReady={{handleReady}} @onClose={{handleClose}} as |dd|>
          <dd.Trigger />
        </Dropdown>
      </template>
    );

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    api.close();

    await rerender();

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.dom('.dropdown__trigger').isFocused();
    assert.verifySteps(['close undefined']);
  });

  test('closing with yielded api', async function (assert) {
    assert.expect(5);

    await render(
      <template>
        <Dropdown @onClose={{handleClose}} as |dd|>
          <dd.Trigger />
          <dd.Content>
            <button type="button" class="close" {{on "click" dd.close}} />
          </dd.Content>
        </Dropdown>
      </template>
    );

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    // Intentionally twice
    await click('.close');
    await click('.close');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.dom('.dropdown__trigger').isNotFocused();
    assert.verifySteps(['close undefined']);
  });
});
