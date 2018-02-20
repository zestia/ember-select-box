/* eslint-disable max-len */

import scrollIntoView from '@zestia/ember-select-box/utils/select-box/scroll-into-view';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

let container;
let top;
let bottom;

module('select-box (scroll into view util)', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await render(hbs`
      <div class="container" style="overflow:auto; height:20px; padding:2px; background: red; color: white">
        <div class="top" style="height:20px; padding:1px; background: blue; color: white">Item 1</div>
        <div class="middle" style="height:20px; padding:1px; background: green; color: white">Item 2</div>
        <div class="bottom" style="height:20px; padding:1px; background: yellow; color: initial">Item 3</div>
      </div>
    `);
    container = this.element.querySelector('.container');
    top       = this.element.querySelector('.top');
    bottom    = this.element.querySelector('.bottom');
  });

  test('does not blow up', function(assert) {
    assert.expect(1);
    scrollIntoView();
    assert.ok(true);
  });

  test('scroll up', function(assert) {
    assert.expect(2);

    container.scrollTop = 1000;

    assert.equal(container.scrollTop, 46,
      'precondition, scrolled to the bottom');

    scrollIntoView(top);

    assert.equal(container.scrollTop, 24,
      'scrolls to the element');
  });

  test('scroll down', function(assert) {
    assert.expect(2);

    assert.equal(container.scrollTop, 0,
      'precondition, not scrolled');

    scrollIntoView(bottom);

    assert.equal(container.scrollTop, 21,
      'scrolls to the element');
  });
});
