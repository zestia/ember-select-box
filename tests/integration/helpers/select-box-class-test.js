import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('', 'select-box (class name helper)', {
  integration: true
});


test('defaults', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box-class}}`);

  assert.equal(this.$().html(), 'select-box',
    'outputs the default select-box class name');
});


test('escaping', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box-class '<script>' '</script>'}}`);

  assert.equal(this.$().html(), '&lt;script&gt;-select-box-&lt;/script&gt;',
    'the values are escaped');
});


test('prefix', function(assert) {
  assert.expect(2);

  this.render(hbs `{{select-box-class ''}}`);

  assert.equal(this.$().html(), 'select-box',
    'does not prefix with a dash');

  this.render(hbs `{{select-box-class 'foo'}}`);

  assert.equal(this.$().html(), 'foo-select-box',
    'prefixes the class name with a string, separating with a dash');
});


test('suffix', function(assert) {
  assert.expect(2);

  this.render(hbs `{{select-box-class '' ''}}`);

  assert.equal(this.$().html(), 'select-box',
    'does not suffix with a dash');

  this.render(hbs `{{select-box-class '' 'foo'}}`);

  assert.equal(this.$().html(), 'select-box-foo',
    'suffixes the class name with a string, separating with a dash');
});


test('prefix and suffix', function(assert) {
  assert.expect(1);

  this.render(hbs `{{select-box-class 'foo' 'bar'}}`);

  assert.equal(this.$().html(), 'foo-select-box-bar',
    'prefixes and suffixes the class name, separating with a dash');
});
