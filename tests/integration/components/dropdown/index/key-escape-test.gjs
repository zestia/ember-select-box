import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, click, focus, triggerKeyEvent } from '@ember/test-helpers';
import { on } from '@ember/modifier';
import Dropdown from '@zestia/ember-select-box/components/dropdown';

module('dropdownx (escape)', function (hooks) {
  setupRenderingTest(hooks);

  let handleClose;

  hooks.beforeEach(function (assert) {
    handleClose = () => assert.step('close');
  });

  test('escape on trigger', async function (assert) {
    assert.expect(4);

    await render(<template>
      <Dropdown @onClose={{handleClose}} as |dd|>
        <dd.Trigger />
      </Dropdown>
    </template>);

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await triggerKeyEvent('.dropdown__trigger', 'keydown', 'Escape');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.verifySteps(['close']);
  });

  test('escape on dropdown', async function (assert) {
    assert.expect(4);

    // This ensures our listeners are on the dropdown itself,
    // and not just on the trigger.

    await render(<template>
      <Dropdown @onClose={{handleClose}} as |dd|>
        <dd.Trigger />
        <dd.Content>
          <button type="button" class="inside" />
        </dd.Content>
      </Dropdown>
    </template>);

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'true');

    await focus('.inside');
    await triggerKeyEvent('.dropdown', 'keydown', 'Escape');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.verifySteps(['close']);
  });

  test('escape inside something else escapable (closed)', async function (assert) {
    assert.expect(1);

    let event;

    const handleKeyDownParent = (_event) => (event = _event);

    await render(<template>
      {{! template-lint-disable no-invalid-interactive }}
      <div {{on "keydown" handleKeyDownParent}}>
        <Dropdown @onClose={{handleClose}} as |dd|>
          <dd.Content>
            <button type="button" class="test" />
          </dd.Content>
        </Dropdown>
      </div>
    </template>);

    await triggerKeyEvent('.dropdown', 'keydown', 'Escape');

    assert.true(
      event instanceof Event,
      'event not stopped, escape allowed to bubble up'
    );
  });

  test('escape inside something else escapable (open)', async function (assert) {
    assert.expect(5);

    let event;

    const handleKeyDownParent = (_event) => (event = _event);

    await render(<template>
      {{! template-lint-disable no-invalid-interactive }}
      <Dropdown
        class="parent"
        @onClose={{handleClose}}
        {{on "keydown" handleKeyDownParent}}
        as |dd|
      >
        <dd.Trigger />
        <dd.Content>
          <Dropdown class="child" @onClose={{handleClose}} as |dd|>
            <dd.Trigger />
            <dd.Content />
          </Dropdown>
        </dd.Content>
      </Dropdown>
    </template>);

    await click('.parent .dropdown__trigger');
    await click('.child .dropdown__trigger');
    await triggerKeyEvent('.child', 'keydown', 'Escape');

    assert.dom('.parent').hasAttribute('data-open', 'true');
    assert.dom('.child').hasAttribute('data-open', 'false');

    assert.notOk(
      event,
      `event propagation is stopped, since escape has caused the dropdown
       to close. we don't want escape to also close the parent element
       that the select box is contained within`
    );

    assert.verifySteps(['close']);
  });
});
