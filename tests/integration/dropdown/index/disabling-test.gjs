import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, rerender, triggerKeyEvent } from '@ember/test-helpers';
import Dropdown from '@zestia/ember-select-box/components/dropdown';
import { tracked } from '@glimmer/tracking';

module('dropdown (disabling)', function (hooks) {
  setupRenderingTest(hooks);

  test('trigger does nothing', async function (assert) {
    assert.expect(4);

    await render(
      <template>
        <Dropdown @disabled={{true}} as |dd|>
          <dd.Trigger />
          {{#if dd.isOpen}}
            <dd.Content />
          {{/if}}
        </Dropdown>
      </template>
    );

    assert.dom('.dropdown').hasAttribute('data-disabled', 'true');
    assert.dom('.dropdown__content').doesNotExist();

    await click('.dropdown__trigger');

    assert.dom('.dropdown').hasAttribute('data-open', 'false');
    assert.dom('.dropdown__content').doesNotExist();
  });

  test('can be open and disabled', async function (assert) {
    assert.expect(3);

    const state = new (class {
      @tracked disable;
    })();

    await render(
      <template>
        <Dropdown @disabled={{state.disable}} as |dd|>
          <dd.Trigger />
          {{#if dd.isOpen}}
            <dd.Content />
          {{/if}}
        </Dropdown>
      </template>
    );

    await click('.dropdown__trigger');

    assert.dom('.dropdown__content').exists();

    state.disable = true;

    await rerender();

    assert.dom('.dropdown').hasAttribute('data-open', 'true');
    assert.dom('.dropdown__content').exists();
  });
});
