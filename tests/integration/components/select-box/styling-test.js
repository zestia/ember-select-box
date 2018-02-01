import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Component from '@ember/component';
import Styleable from '@zestia/ember-select-box/mixins/general/styleable';

module('select-box (styling)', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('component:foo-select', Component.extend(Styleable));
  });

  test('styling', async function(assert) {
    assert.expect(2);

    await render(hbs `{{foo-select}}`);

    assert.ok(!this.$().html().match('style'),
      'style attribute is not present');

    await render(hbs `{{foo-select style="color:red<script>"}}`);

    assert.ok(this.$().html().match('style="color:red&amp;lt;script&amp;gt;"'),
      'can be styled, value is escaped');
  });
});
