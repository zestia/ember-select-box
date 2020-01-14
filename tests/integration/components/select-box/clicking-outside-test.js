import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { blur, click, triggerEvent, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (clicking outside)', function(hooks) {
  setupRenderingTest(hooks);

  test('clicking outside', async function(assert) {
    assert.expect(4);

    let count = 0;

    this.set('clickedOutside', () => {
      count++;
    });

    await render(hbs`
      <div class="outside"></div>
      <SelectBox @onClickOutside={{this.clickedOutside}}>
        <div class="inside"></div>
      </SelectBox>
    `);

    await click('.select-box');

    assert.equal(count, 0, 'clicking the select box is not outside');

    await click('.inside');

    assert.equal(count, 0, 'clicking inside the select box is not outside');

    await click('.outside');

    assert.equal(
      count,
      1,
      'clicking outside the select box sends the onClickOutside action, when the select box was focused'
    );

    await blur('.select-box');

    await click('.outside');

    assert.equal(
      count,
      2,
      "clicking outside the select box still sends the onClickOutside action, even if it was wasn't in use"
    );
  });

  test('touchstart outside', async function(assert) {
    assert.expect(2);

    this.set('handleClickOutside', () => {
      assert.step('handle click outside');
    });

    this.set('handleExternalClick', () => {
      assert.step('handle external click');
    });

    await render(hbs`
      <button
        type="button"
        class="external-click"
        {{on "click" this.handleExternalClick}}
      ></button>

      <SelectBox @onClickOutside={{this.handleClickOutside}} />
    `);

    await triggerEvent('.external-click', 'touchstart');

    assert.verifySteps(
      ['handle click outside'],
      'touchstart will be treated as a click for detecting whether the ' +
        'select box was clicked-outside-of'
    );
  });

  test('clicking outside to close but programatically opening', async function(assert) {
    assert.expect(7);

    let sb;

    this.set('handleClickOutside', () => {
      sb.close();
      assert.step('handle click outside');
    });

    this.set('handleReady', api => {
      sb = api;
      assert.step('handle ready');
      sb.open();
    });

    this.set('handleExternalOpen', () => {
      assert.step('handle external click');
      sb.open();
    });

    this.set('handleOpen', () => {
      assert.step('handle open');
    });

    this.set('handleClose', () => {
      assert.step('handle close');
    });

    await render(hbs`
      <button
        type="button"
        class="external-open"
        {{on "click" this.handleExternalOpen}}
      ></button>

      <SelectBox
        @onReady={{this.handleReady}}
        @onClickOutside={{this.handleClickOutside}}
        @onOpen={{this.handleOpen}}
        @onClose={{this.handleClose}} />
    `);

    await click('.external-open');

    assert.verifySteps(
      [
        'handle ready',
        'handle open',
        'handle close',
        'handle click outside',
        'handle external click',
        'handle open'
      ],
      'select box will be closed, because something outside of it was ' +
        'clicked. then, it will be opened. This ordering is important!'
    );
  });
});
