import scrollIntoView from '@zestia/ember-select-box/utils/select-box/scroll-into-view';
import { module, skip, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

let $container;
let $top;
let $bottom;

module('select-box (scroll into view util)', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await render(hbs`
      <div class="container" style="overflow:auto; height:20px; padding: 10px">
        <div class="top" style="height:20px; padding: 1px">Item 1</div>
        <div class="middle" style="height:20px; padding: 1px">Item 2</div>
        <div class="bottom" style="height:20px; padding: 1px">Item 3</div>
      </div>
    `);
    $container = this.$('.container');
    $top       = this.$('.top');
    $bottom    = this.$('.bottom');
  });

  test('does not blow up', function(assert) {
    assert.expect(1);
    scrollIntoView();
    assert.ok(true);
  });

  skip('scroll up', function(assert) {
    assert.expect(2);

    $container.scrollTop(1000);

    assert.equal($container.scrollTop(), 46,
      'precondition, scrolled to the bottom');

    scrollIntoView($top, $container);

    assert.equal($container.scrollTop(), 10,
      'scrolls to the option');
  });

  skip('scroll down', function(assert) {
    assert.expect(2);

    assert.equal($container.scrollTop(), 0,
      'precondition, not scrolled');

    scrollIntoView($bottom, $container);

    assert.equal($container.scrollTop(), 36,
      'scrolls to the option');
  });
});
