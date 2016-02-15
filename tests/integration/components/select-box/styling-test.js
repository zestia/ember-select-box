import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Component from 'ember-component';
import Styleable from 'ember-select-box/mixins/select-box/general/styleable';

moduleForComponent('', 'select-box (styling)', {
  integration: true,
  beforeEach() {
    this.register('component:foo-select', Component.extend(Styleable));
  }
});


test('styling', function(assert) {
  assert.expect(2);

  this.render(hbs `{{foo-select}}`);

  assert.ok(!this.$().html().match('style'),
    'style attribute is not present');

  this.render(hbs `{{foo-select style='color:red<script>'}}`);

  assert.ok(this.$().html().match('style="color:red&amp;lt;script&amp;gt;"'),
    'can be styled, value is escaped');
});
