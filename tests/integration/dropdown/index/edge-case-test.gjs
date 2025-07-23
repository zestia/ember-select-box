import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, focus, triggerKeyEvent } from '@ember/test-helpers';
import Dropdown from '@zestia/ember-select-box/components/dropdown';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

module('dropdown (edge cases)', function (hooks) {
  setupRenderingTest(hooks);

  test('destroying a dropdown with a focus inside (and no trigger)', async function (assert) {
    assert.expect(1);

    // https://github.com/emberjs/ember.js/issues/18043

    const state = new (class {
      @tracked show = true;
    })();

    const destroy = () => {
      state.show = false;
    };

    await render(
      <template>
        {{#if state.show}}
          <Dropdown @open={{true}}>
            <input aria-label="example" />
            <button type="button" {{on "keydown" destroy}} class="close" />
          </Dropdown>
        {{/if}}
      </template>
    );

    await focus('input');
    await triggerKeyEvent('.close', 'keydown', 'Enter');

    assert
      .dom('.select-box')
      .doesNotExist('does not cause infinite revalidation bug');
  });
});
