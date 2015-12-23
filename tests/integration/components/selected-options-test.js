import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('', 'select-box/selected-options', {
  integration: true
});


test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/selected-options}}`);

  assert.equal(this.$('div.select-box-selected-options').length, 1,
    'renders with correct class name and tag');
});


test('class prefix', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/selected-options class-prefix='foo'}}`);

  assert.equal(this.$('.foo-select-box-selected-options').length, 1,
    'can add a class prefix');
});


test('style', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box/selected-options style='color:red<script>'}}`);

  assert.ok(this.$().html().match('style="color:red&amp;lt;script&amp;gt;"'),
    'selected options container can be styled, value is escaped');
});
