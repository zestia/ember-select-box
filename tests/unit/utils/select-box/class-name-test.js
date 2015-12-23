import className from 'ember-cli-select-box/utils/select-box/class-name';
import { module, test } from 'qunit';

module('select-box (class name util)');


test('defaults', function(assert) {
  assert.expect(1);

  let name = className();

  assert.equal(name, 'select-box',
    'builds default select-box class name');
});


test('prefix', function(assert) {
  assert.expect(2);

  let name = className('');

  assert.equal(name, 'select-box',
    'does not prefix with a dash');

  name = className('foo');

  assert.equal(name, 'foo-select-box',
    'prefixes the class name with a string, separating with a dash');
});


test('suffix', function(assert) {
  assert.expect(2);

  let name = className('', '');

  assert.equal(name, 'select-box',
    'does not suffix with a dash');

  name = className('', 'foo');

  assert.equal(name, 'select-box-foo',
    'suffixes the class name with a string, separating with a dash');
});


test('prefix and suffix', function(assert) {
  assert.expect(1);

  let name = className('foo', 'bar');

  assert.equal(name, 'foo-select-box-bar',
    'prefixes and suffixes the class name, separating with a dash');
});
