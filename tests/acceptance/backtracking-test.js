import Ember from 'ember';
import { module, skip, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, click, findAll, find, triggerEvent, settled } from '@ember/test-helpers';
import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

const runTest = parseFloat(Ember.VERSION) === 2.8 ? skip : test;

module('backtracking focus use-case', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('template:backtrack-select', hbs`
      {{#backtrack-select as |bs|}}
        {{#bs.selected-option}}
          open
        {{/bs.selected-option}}
        {{#bs.options}}
          <button onclick={{action bs.close}} class="backtrack-select-close">close</button>
        {{/bs.options}}
      {{/backtrack-select}}
    `);

    this.owner.register('component:backtrack-select', Component.extend({
      layout: hbs`
        {{#select-box class-prefix="backtrack-select" as |sb|}}
          {{yield (hash
            selected-option=(component sb.selected-option click=sb.open)
            close=sb.close
            options=(if sb.isOpen sb.options)
          )}}
        {{/select-box}}
      `
    }));
  });

  // Try scenario in a Twiddle:
  // https://ember-twiddle.com/2f066b448da4242c29e241a5203d8840

  runTest('backtracking focus error', async function(assert) {
    assert.expect(6);

    await visit('/backtrack-select');

    assert.equal(findAll('.backtrack-select-options').length, 0,
      'precondition: options not rendered when closed');

    assert.ok(!find('.backtrack-select').classList.contains('is-focused'),
      'precondition: not focused');

    await triggerEvent('.backtrack-select', 'focus');
    await click('.backtrack-select-selected-option');

    assert.equal(findAll('.backtrack-select-options').length, 1,
      'precondition: options rendered when open');

    assert.ok(find('.backtrack-select').classList.contains('is-focused'),
      'precondition: focused');

    await click('.backtrack-select-close');

    assert.equal(findAll('.backtrack-select-options').length, 0,
      'options destroyed successfully without throwing double render error');

    await settled();

    assert.ok(!find('.backtrack-select').classList.contains('is-focused'),
      'no longer focused');
  });
});
