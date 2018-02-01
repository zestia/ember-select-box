import className from '@zestia/ember-select-box/utils/select-box/class-name';
import { module, test } from 'qunit';

module('select-box (class name util)', function() {
  test('defaults', function(assert) {
    assert.expect(1);

    const name = className();

    assert.equal(name, 'select-box',
      'generates the default class name');
  });

  test('prefix', function(assert) {
    assert.expect(2);

    let name = className('');

    assert.equal(name, 'select-box',
      'generates the default class name');

    name = className('foo');

    assert.equal(name, 'foo',
      'uses the specified class name instead');
  });

  test('suffix', function(assert) {
    assert.expect(2);

    let name = className('', '');

    assert.equal(name, 'select-box',
      'generates the default class name, does add extraneous dash');

    name = className('', 'foo');

    assert.equal(name, 'select-box-foo',
      'adds suffix to default class name');
  });

  test('prefix and suffix', function(assert) {
    assert.expect(1);

    const name = className('foo', 'bar');

    assert.equal(name, 'foo-bar',
      'uses custom prefix and suffix, separating with a dash');
  });
});
