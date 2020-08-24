import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (toggling)', function (hooks) {
  setupRenderingTest(hooks);

  test('toggling', async function (assert) {
    assert.expect(14);

    let api;
    let opened = 0;
    let closed = 0;

    this.handleReady = (sb) => (api = sb);
    this.handleOpen = () => assert.step('opened');
    this.handleClose = () => assert.step('closed');

    await render(hbs`
      <SelectBox
        @onReady={{this.handleReady}}
        @onOpen={{this.handleOpen}}
        @onClose={{this.handleClose}} />
    `);

    let selectBox = find('.select-box');

    assert.strictEqual(api.isOpen, false);

    assert
      .dom(selectBox)
      .hasAttribute(
        'aria-expanded',
        'false',
        'a select box is closed by default'
      );

    selectBox = find('.select-box');

    api.open();
    api.open();

    await settled();

    assert
      .dom(selectBox)
      .hasAttribute('aria-expanded', 'true', 'can open via the api');

    assert.verifySteps(['opened'], 'only fires open action if closed');

    assert.strictEqual(api.isOpen, true);

    api.close();
    api.close();

    await settled();

    assert
      .dom(selectBox)
      .hasAttribute('aria-expanded', 'false', 'can open via the api');

    assert.verifySteps(['closed'], 'only fires close action if open');

    assert.strictEqual(api.isOpen, false);

    api.toggle();

    await settled();

    assert
      .dom(selectBox)
      .hasAttribute('aria-expanded', 'true', 'can toggle via the api');

    assert.strictEqual(api.isOpen, true);

    assert.verifySteps(['opened']);
  });
});
