import scrollIntoView from 'ember-select-box/utils/select-box/scroll-into-view';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

let $container, $top, $middle, $bottom;

moduleForComponent('', 'select-box (scroll into view util)', {
  integration: true,
  beforeEach() {
    this.render(hbs`
      <div class="container" style="overflow:auto; height:20px; padding: 10px">
        <div class="top" style="height:20px; padding: 1px">Item 1</div>
        <div class="middle" style="height:20px; padding: 1px">Item 2</div>
        <div class="bottom" style="height:20px; padding: 1px">Item 3</div>
      </div>
    `);
    $container = this.$('.container');
    $top       = this.$('.top');
    $middle    = this.$('.middle');
    $bottom    = this.$('.bottom');
  }
});


test('does not blow up', function(assert) {
  assert.expect(1);
  scrollIntoView();
  assert.ok(true);
});


test('scroll up', function(assert) {
  assert.expect(2);

  $container.scrollTop(1000);

  assert.equal($container.scrollTop(), 46,
    'precondition, scrolled to the bottom');

  scrollIntoView($top, $container);

  assert.equal($container.scrollTop(), 10,
    'scrolls to the option');
});


test('scroll down', function(assert) {
  assert.expect(2);

  assert.equal($container.scrollTop(), 0,
    'precondition, not scrolled');

  scrollIntoView($bottom, $container);

  assert.equal($container.scrollTop(), 36,
    'scrolls to the option');
});
