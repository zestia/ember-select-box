import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { click, focus, visit } from '@ember/test-helpers';
import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

module('backtracking focus use-case', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register(
      'template:backtrack-select',
      hbs`
      <BacktrackSelect as |sb|>
        <sb.SelectedOption>
          open
        </sb.SelectedOption>
        <sb.Options>
          <button type="button" {{on "click" sb.close}} class="backtrack-select__close">close</button>
        </sb.Options>
      </BacktrackSelect>
    `
    );

    this.owner.register(
      'component:backtrack-select',
      Component.extend({
        tagName: '',
        layout: hbs`
        <SelectBox @classNamePrefix="backtrack-select" as |sb|>
          {{yield (hash
            SelectedOption=(component sb.SelectedOption onclick=sb.open)
            Options=(if sb.isOpen sb.Options)
            close=sb.close
          )}}
        </SelectBox>
      `
      })
    );
  });

  // Try scenario in a Twiddle:
  // https://ember-twiddle.com/2f066b448da4242c29e241a5203d8840

  test('backtracking focus error', async function(assert) {
    assert.expect(5);

    await visit('/backtrack-select');

    assert
      .dom('.backtrack-select__options')
      .doesNotExist('precondition: options not rendered when closed');

    assert
      .dom('.backtrack-select')
      .doesNotHaveClass(
        '.backtrack-select--focused',
        'precondition: not focused'
      );

    await focus('.backtrack-select');

    assert
      .dom('.backtrack-select')
      .hasClass('backtrack-select--focused', 'focused');

    await click('.backtrack-select__selected-option');

    assert
      .dom('.backtrack-select__options')
      .exists({ count: 1 }, 'precondition: options rendered when open');

    await click('.backtrack-select__close');

    assert
      .dom('.backtrack-select__options')
      .doesNotExist(
        'options destroyed successfully without throwing double render error'
      );
  });
});
