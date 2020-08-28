import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  render,
  click,
  fillIn,
  settled,
  triggerEvent,
  triggerKeyEvent
} from '@ember/test-helpers';
import { defer } from 'rsvp';
import { later } from '@ember/runloop';

module('select-box (destroying)', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.show = true;
    this.hide = () => this.set('show', false);
  });

  test('showing', async function (assert) {
    assert.expect(0);

    await render(hbs`
      {{#if this.show}}
        <SelectBox @onSelect={{this.hide}} as |sb|>
          <sb.Option @value={{1}} />
        </SelectBox>
      {{/if}}
    `);

    await click('.select-box__option');
  });

  test('enter', async function (assert) {
    assert.expect(0);

    await render(hbs`
      {{#if this.show}}
        <SelectBox as |sb|>
          <sb.Option @onSelect={{this.hide}} />
        </SelectBox>
      {{/if}}
    `);

    await triggerEvent('.select-box__option', 'mouseenter');

    await triggerKeyEvent('.select-box', 'keydown', 13);
  });

  test('update', async function (assert) {
    assert.expect(0);

    this.handleReady = async (sb) => {
      this.hide();

      await settled();

      sb.update('foo');
    };

    await render(hbs`
      {{#if this.show}}
        <SelectBox @onReady={{this.handleReady}} />
      {{/if}}
    `);
  });

  test('select', async function (assert) {
    assert.expect(0);

    this.handleReady = async (sb) => {
      this.hide();

      await settled();

      sb.select('foo');
    };

    await render(hbs`
      {{#if this.show}}
        <SelectBox @onReady={{this.handleReady}} />
      {{/if}}
    `);
  });

  test('mid-search', async function (assert) {
    assert.expect(1);

    const deferred = defer();

    this.handleSearch = () => deferred.promise;

    await render(hbs`
      {{#if this.show}}
        <SelectBox @onSearch={{this.handleSearch}} as |sb|>
          <sb.Input />
        </SelectBox>
      {{/if}}
    `);

    fillIn('.select-box__input', 'foo');

    later(() => this.hide(), 100);

    await settled();

    assert.ok(
      true,
      'does not blow up when a search resolves, but the component is gone'
    );

    deferred.resolve();
  });
});
