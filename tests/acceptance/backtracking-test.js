import { VERSION } from '@ember/version';
import { module, skip, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, click, settled, focus } from '@ember/test-helpers';
import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

const runTest = parseFloat(VERSION) === 2.8 ? skip : test;

module('backtracking focus use-case', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register(
      'template:backtrack-select',
      hbs`
      {{#backtrack-select as |bs|}}
        {{#bs.selectedOption}}
          open
        {{/bs.selectedOption}}
        {{#bs.options}}
          <button onclick={{action bs.close}} class="backtrack-select-close">close</button>
        {{/bs.options}}
      {{/backtrack-select}}
    `
    );

    this.owner.register(
      'component:backtrack-select',
      Component.extend({
        layout: hbs`
        {{#select-box class-prefix="backtrack-select" as |sb|}}
          {{yield (hash
            selectedOption=(component sb.selectedOption click=sb.open)
            close=sb.close
            options=(if sb.isOpen sb.options)
          )}}
        {{/select-box}}
      `
      })
    );
  });

  // Try scenario in a Twiddle:
  // https://ember-twiddle.com/2f066b448da4242c29e241a5203d8840

  runTest('backtracking focus error', async function(assert) {
    assert.expect(6);

    await visit('/backtrack-select');

    assert
      .dom('.backtrack-select-options')
      .doesNotExist('precondition: options not rendered when closed');

    assert.dom('.backtrack-select').doesNotHaveClass('is-focused', 'precondition: not focused');

    await focus('.backtrack-select');

    assert.dom('.backtrack-select').hasClass('is-focused', 'focused');

    await click('.backtrack-select-selected-option');

    assert
      .dom('.backtrack-select-options')
      .exists({ count: 1 }, 'precondition: options rendered when open');

    await click('.backtrack-select-close');

    assert
      .dom('.backtrack-select-options')
      .doesNotExist('options destroyed successfully without throwing double render error');

    await settled();

    assert.dom('.backtrack-select').hasClass('is-focused', 'no longer focused');
  });
});
