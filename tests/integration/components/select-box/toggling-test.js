import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (toggling)', function(hooks) {
  setupRenderingTest(hooks);

  test('opening an closing', async function(assert) {
    assert.expect(8);

    await render(hbs `{{select-box}}`);

    let selectBox = find('.select-box');

    assert.ok(!selectBox.classList.contains('is-open'),
      'a select box is closed by default');

    assert.ok(!selectBox.hasAttribute('aria-expanded'),
      'not expanded by default');

    this.set('isOpen', true);

    await render(hbs `{{select-box is-open=isOpen}}`);

    selectBox = find('.select-box');

    assert.ok(selectBox.classList.contains('is-open'),
      'the initial open state can be set');

    assert.ok(selectBox.hasAttribute('aria-expanded'),
      'receives an aria-expanded attribute when open');

    this.set('isOpen', false);

    assert.ok(!selectBox.classList.contains('is-open'),
      'the open state can be changed via an is-open attribute');

    assert.ok(!selectBox.hasAttribute('aria-expanded'),
      'open state is reflected as aria expanded attribute');

    await render(hbs `
      {{#select-box as |sb|}}
        <span>Open: {{sb.isOpen}}</span>
        <button onclick={{action sb.open}}></button>
      {{/select-box}}
    `);

    assert.ok(find('span').textContent.match(/Open: false/),
      'yields the open state when closed');

    await click('button');

    assert.ok(find('span').textContent.match(/Open: true/),
      'yields the open state when open');
  });

  test('open action', async function(assert) {
    assert.expect(1);

    let opened;
    this.set('opened', () => opened = true);

    await render(hbs `
      {{#select-box on-open=(action opened) as |sb|}}
        <button onclick={{action sb.open}}>open</button>
      {{/select-box}}
    `);

    await click('button');

    assert.strictEqual(opened, true,
      'sends an action when the select box is opened');
  });

  test('close action', async function(assert) {
    assert.expect(1);

    let closed;
    this.set('closed', () => closed = true);

    await render(hbs `
      {{#select-box on-close=(action closed) as |sb|}}
        <button onclick={{action sb.close}}>close</button>
      {{/select-box}}
    `);

    await click('button');

    assert.strictEqual(closed, true,
      'sends an action when the select box is opened');
  });
});
