import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('select-box (clicking outside)', function(hooks) {
  setupRenderingTest(hooks);

  test('clicking outside', async function(assert) {
    assert.expect(3);

    let count = 0;

    this.set('clickedOutside', () => {
      count++;
    });

    await render(hbs `
      <div class="outside"></div>
      {{#select-box on-click-outside=(action clickedOutside)}}
        <div class="inside"></div>
      {{/select-box}}
    `);

    this.$('.select-box').trigger('click');

    assert.equal(count, 0,
      'clicking the select box is not outside');

    this.$('.inside').trigger('click');

    assert.equal(count, 0,
      'clicking inside the select box is not outside');

    this.$('.outside').trigger('click');

    assert.equal(count, 1,
      'clicking outside the select box is outside');
  });
});
