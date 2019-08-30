import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (toggling)', function(hooks) {
  setupRenderingTest(hooks);

  test('toggling', async function(assert) {
    assert.expect(9);

    let api;
    let opened = 0;
    let closed = 0;

    this.initialised = sb => (api = sb);
    this.opened = () => opened++;
    this.closed = () => closed++;

    await render(hbs`
      <SelectBox
        @onInit={{this.initialised}}
        @onOpen={{this.opened}}
        @onClose={{this.closed}} />
    `);

    let selectBox = find('.select-box');

    assert
      .dom(selectBox)
      .doesNotHaveClass('is-open', 'a select box is closed by default');

    assert
      .dom(selectBox)
      .hasAttribute('aria-expanded', 'false', 'not expanded by default');

    selectBox = find('.select-box');

    api.open();
    api.open();

    await settled();

    assert.dom(selectBox).hasClass('is-open', 'can open via the api');

    assert.equal(opened, 1, 'only fires open action if closed');

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

    assert.dom(selectBox).doesNotHaveClass('is-open', 'can close via the api');

    assert.equal(closed, 1, 'only fires close action if open');

    assert
      .dom(selectBox)
      .hasAttribute(
        'aria-expanded',
        'false',
        'open state is reflected as aria expanded attribute'
      );

    api.toggle();

    await settled();

    assert.dom(selectBox).hasClass('is-open', 'can toggle via the api');
  });
});
