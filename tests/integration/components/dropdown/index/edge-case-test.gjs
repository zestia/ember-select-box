import { module, skip } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, focus, triggerKeyEvent } from '@ember/test-helpers';
import Dropdown from '@zestia/ember-select-box/components/dropdown';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

module('dropdown (edge cases)', function (hooks) {
  setupRenderingTest(hooks);

  skip('destroying a dropdown with a focus inside (and no trigger)', async function (assert) {
    assert.expect(1);

    const state = new (class {
      @tracked show = true;
    })();

    const destroy = (value) => {
      state.show = false;
    };

    await render(<template>
      {{#if state.show}}
        <Dropdown as |dd|>
          <input aria-label="example" />
          <button type="button" {{on "keydown" dd.open}} class="open" />
          <button type="button" {{on "keydown" destroy}} class="close" />
        </Dropdown>
      {{/if}}
    </template>);

    await triggerKeyEvent('.open', 'keydown', 'Enter');
    await focus('input');
    await triggerKeyEvent('.close', 'keydown', 'Enter');

    assert
      .dom('.select-box')
      .doesNotExist('does not cause infinite revalidation bug');
  });
});
