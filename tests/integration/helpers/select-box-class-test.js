import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('', 'select-box (class name helper)', {
  integration: true
});


test('defaults', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box-class}}`);

  assert.equal(this.$().html(), 'select-box',
    'outputs the default class name');
});


test('prefix', function(assert) {
  assert.expect(2);

  this.render(hbs `{{select-box-class ""}}`);

  assert.equal(this.$().html(), 'select-box',
    'generates the default class name');

  this.render(hbs `{{select-box-class "foo"}}`);

  assert.equal(this.$().html(), 'foo',
    'uses the specified class name instead');
});


test('suffix', function(assert) {
  assert.expect(2);

  this.render(hbs `{{select-box-class "" ""}}`);

  assert.equal(this.$().html(), 'select-box',
    'generates the default class name, does add extraneous dash');

  this.render(hbs `{{select-box-class "" "foo"}}`);

  assert.equal(this.$().html(), 'select-box-foo',
    'adds suffix to default class name');
});


test('prefix and suffix', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box-class "foo" "bar"}}`);

  assert.equal(this.$().html(), 'foo-bar',
    'uses custom prefix and suffix, separating with a dash');
});


test('escaping', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box-class "<script>" "</script>"}}`);

  assert.equal(this.$().html(), '&lt;script&gt;-&lt;/script&gt;',
    'the values are escaped');
});
