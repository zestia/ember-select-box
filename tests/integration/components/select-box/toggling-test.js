import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (toggling)', function (hooks) {
  setupRenderingTest(hooks);

  test('toggling', async function (assert) {
    assert.expect(16);

    this.handleReady = (sb) => this.set('api', sb);
    this.handleOpen = () => assert.step('opened');
    this.handleClose = () => assert.step('closed');

    await render(hbs`
      {{if this.api.isOpen "open" "closed"}}

      <SelectBox
        @onReady={{this.handleReady}}
        @onOpen={{this.handleOpen}}
        @onClose={{this.handleClose}} />
    `);

    let selectBox = find('.select-box');

    assert.strictEqual(this.api.isOpen, false);

    assert
      .dom(selectBox)
      .hasAttribute(
        'aria-expanded',
        'false',
        'a select box is closed by default'
      );

    selectBox = find('.select-box');

    this.api.open();
    this.api.open();

    await settled();

    assert.strictEqual(this.api.isOpen, true);

    assert.dom(this.element).containsText('open', 'open state is tracked');

    assert
      .dom(selectBox)
      .hasAttribute('aria-expanded', 'true', 'can open via the api');

    assert.verifySteps(['opened'], 'only fires open action if closed');

    this.api.close();
    this.api.close();

    await settled();

    assert.strictEqual(this.api.isOpen, false);

    assert.dom(this.element).containsText('closed', 'closed state is tracked');

    assert
      .dom(selectBox)
      .hasAttribute('aria-expanded', 'false', 'can open via the api');

    assert.verifySteps(['closed'], 'only fires close action if open');

    this.api.toggle();

    await settled();

    assert
      .dom(selectBox)
      .hasAttribute('aria-expanded', 'true', 'can toggle via the api');

    assert.strictEqual(this.api.isOpen, true);

    assert.verifySteps(['opened']);
  });
});
