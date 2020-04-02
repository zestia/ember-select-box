import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (toggling)', function (hooks) {
  setupRenderingTest(hooks);

  test('toggling', async function (assert) {
    assert.expect(13);

    let api;
    let opened = 0;
    let closed = 0;

    this.ready = (sb) => (api = sb);
    this.opened = () => opened++;
    this.closed = () => closed++;

    await render(hbs`
      <SelectBox
        @onReady={{this.ready}}
        @onOpen={{this.opened}}
        @onClose={{this.closed}} />
    `);

    let selectBox = find('.select-box');

    assert.strictEqual(api.isOpen, false);

    assert
      .dom(selectBox)
      .doesNotHaveClass(
        'select-box--open',
        'a select box is closed by default'
      );

    assert
      .dom(selectBox)
      .hasAttribute('aria-expanded', 'false', 'not expanded by default');

    selectBox = find('.select-box');

    api.open();
    api.open();

    await settled();

    assert.dom(selectBox).hasClass('select-box--open', 'can open via the api');

    assert.equal(opened, 1, 'only fires open action if closed');

    assert.strictEqual(api.isOpen, true);

    assert
      .dom(selectBox)
      .hasAttribute(
        'aria-expanded',
        'true',
        'receives an aria-expanded attribute when open'
      );

    api.close();
    api.close();

    await settled();

    assert
      .dom(selectBox)
      .doesNotHaveClass('select-box--open', 'can close via the api');

    assert.equal(closed, 1, 'only fires close action if open');

    assert.strictEqual(api.isOpen, false);

    assert
      .dom(selectBox)
      .hasAttribute(
        'aria-expanded',
        'false',
        'open state is reflected as aria expanded attribute'
      );

    api.toggle();

    await settled();

    assert
      .dom(selectBox)
      .hasClass('select-box--open', 'can toggle via the api');

    assert.strictEqual(api.isOpen, true);
  });
});
