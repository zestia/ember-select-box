import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (toggling)', function(hooks) {
  setupRenderingTest(hooks);

  test('opening an closing', async function(assert) {
    assert.expect(8);

    await render(hbs`{{select-box}}`);

    let selectBox = find('.select-box');

    assert.dom(selectBox).doesNotHaveClass('is-open', 'a select box is closed by default');

    assert.dom(selectBox).hasAttribute('aria-expanded', 'false', 'not expanded by default');

    this.set('isOpen', true);

    await render(hbs`{{select-box open=this.isOpen}}`);

    selectBox = find('.select-box');

    assert.dom(selectBox).hasClass('is-open', 'the initial open state can be set');

    assert
      .dom(selectBox)
      .hasAttribute('aria-expanded', 'true', 'receives an aria-expanded attribute when open');

    this.set('isOpen', false);

    assert
      .dom(selectBox)
      .doesNotHaveClass('is-open', 'the open state can be changed via the open argument');

    assert
      .dom(selectBox)
      .hasAttribute('aria-expanded', 'false', 'open state is reflected as aria expanded attribute');

    await render(hbs`
      {{#select-box as |sb|}}
        <span>Open: {{sb.isOpen}}</span>
        <button onclick={{action sb.open}}></button>
      {{/select-box}}
    `);

    assert.ok(find('span').textContent.match(/Open: false/), 'yields the open state when closed');

    await click('button');

    assert.ok(find('span').textContent.match(/Open: true/), 'yields the open state when open');
  });

  test('open action', async function(assert) {
    assert.expect(1);

    let opened;
    this.set('opened', sb => (opened = sb.isOpen));

    await render(hbs`
      {{#select-box on-open=this.opened as |sb|}}
        <button onclick={{action sb.open}}>open</button>
      {{/select-box}}
    `);

    await click('button');

    assert.strictEqual(
      opened,
      true,
      'sends an action when the select box is opened with the open state'
    );
  });

  test('close action', async function(assert) {
    assert.expect(1);

    let closed;
    this.set('closed', sb => (closed = !sb.isOpen));

    await render(hbs`
      {{#select-box on-close=this.closed as |sb|}}
        <button onclick={{action sb.close}}>close</button>
      {{/select-box}}
    `);

    await click('button');

    assert.strictEqual(
      closed,
      true,
      'sends an action when the select box is opened with the open state'
    );
  });
});
