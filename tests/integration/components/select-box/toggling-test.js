import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (toggling)', function(hooks) {
  setupRenderingTest(hooks);

  test('opening an closing', async function(assert) {
    assert.expect(8);

    await render(hbs`<SelectBox />`);

    let selectBox = find('.select-box');

    assert
      .dom(selectBox)
      .doesNotHaveClass('is-open', 'a select box is closed by default');

    assert
      .dom(selectBox)
      .hasAttribute('aria-expanded', 'false', 'not expanded by default');

    this.set('isOpen', true);

    await render(hbs`<SelectBox @open={{this.isOpen}} />`);

    selectBox = find('.select-box');

    assert
      .dom(selectBox)
      .hasClass('is-open', 'the initial open state can be set');

    assert
      .dom(selectBox)
      .hasAttribute(
        'aria-expanded',
        'true',
        'receives an aria-expanded attribute when open'
      );

    this.set('isOpen', false);

    assert
      .dom(selectBox)
      .doesNotHaveClass(
        'is-open',
        'the open state can be changed via the open argument'
      );

    assert
      .dom(selectBox)
      .hasAttribute(
        'aria-expanded',
        'false',
        'open state is reflected as aria expanded attribute'
      );

    await render(hbs`
      <SelectBox as |sb|>
        <span>Open: {{sb.isOpen}}</span>
        <button onclick={{action sb.open}}></button>
      </SelectBox>
    `);

    assert.ok(
      find('span').textContent.match(/Open: false/),
      'yields the open state when closed'
    );

    await click('button');

    assert.ok(
      find('span').textContent.match(/Open: true/),
      'yields the open state when open'
    );
  });

  test('open action', async function(assert) {
    assert.expect(3);

    let opened;
    this.set('opened', sb => (opened = sb.isOpen));

    await render(hbs`
      <SelectBox
        @onOpen={{this.opened}}
        @open={{this.open}}
        @value={{this.value}}
        as |sb|>
        <button onclick={{action sb.open}}>open</button>
      </SelectBox>
    `);

    await click('button');

    assert.strictEqual(
      opened,
      true,
      'sends an action when the select box is opened with the open state'
    );

    this.set('value', 'foo'); // force did receive attrs to fire

    assert
      .dom('.select-box')
      .hasClass(
        'is-open',
        "remains open (did receive attrs didn't wipe out state)"
      );

    this.set('open', false);

    assert
      .dom('.select-box')
      .doesNotHaveClass('is-open', 'can control openness via argument');
  });

  test('close action', async function(assert) {
    assert.expect(1);

    let closed;
    this.set('closed', sb => (closed = !sb.isOpen));

    await render(hbs`
      <SelectBox @onClose={{this.closed}} as |sb|>
        <button onclick={{action sb.close}}>close</button>
      </SelectBox>
    `);

    await click('button');

    assert.strictEqual(
      closed,
      true,
      'sends an action when the select box is opened with the open state'
    );
  });
});
