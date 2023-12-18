import { module, test } from 'qunit';
import { filter } from '@zestia/ember-select-box/utils';
import {
  containsString as contains,
  startsWithString as startsWith
} from '@zestia/ember-select-box/-private/utils';
import { setupTest } from 'dummy/tests/helpers';

module('utils', function (hooks) {
  setupTest(hooks);

  test('#containsString', function (assert) {
    assert.expect(12);

    assert.false(contains('foo', 'x'), 'does not contain');
    assert.true(contains(' foo ', 'f'), 'spaces trimmed from input');
    assert.true(contains('foo', ' f '), 'spaces trimmed from query');
    assert.true(contains('FOO', 'f'), 'case insensitive input');
    assert.true(contains('foo', 'F'), 'case insensitive query');
    assert.true(contains('foo  bar', ' '), 'spaces collapsed from input');
    assert.true(contains('foo bar', '  '), 'spaces collapsed from query');
    assert.true(contains('fü', 'fu'), 'diacritics ignored in input');
    assert.true(contains('fu', 'fü'), 'diacritics ignored in query');
    assert.true(contains('foo\\bar', '\\'), 'regex control characters');
    assert.true(contains(123, '2'), 'input cast to a string');
    assert.true(contains('123', 2), 'query cast to a string');
  });

  test('#startsWithString', function (assert) {
    assert.expect(10);

    assert.false(startsWith('foo', 'x'), 'does not start with');
    assert.true(startsWith(' foo ', 'f'), 'spaces trimmed from input');
    assert.false(startsWith('foo', ' f '), 'spaces not trimmed from query');
    assert.true(startsWith('FOO', 'f'), 'case insensitive input');
    assert.true(startsWith('foo', 'F'), 'case insensitive query');
    assert.true(startsWith('fü', 'fu'), 'diacritics ignored in input');
    assert.true(startsWith('fu', 'fü'), 'diacritics ignored in query');
    assert.true(startsWith('\\foo', '\\f'), 'regex control characters');
    assert.true(startsWith(123, '1'), 'input cast to a string');
    assert.true(startsWith('123', 1), 'query cast to a string');
  });

  module('#filter', function () {
    test('filter array', function (assert) {
      assert.expect(1);

      const array = ['foo', 'bar', 'baz'];
      const expecting = ['bar', 'baz'];
      const results = filter(array).query('b').run();

      assert.deepEqual(results, expecting);
    });

    test('filter with spaces in query', function (assert) {
      assert.expect(1);

      const array = ['foo bar', 'bar baz'];
      const expecting = ['foo bar'];
      const results = filter(array).query('o  b').run();

      assert.deepEqual(results, expecting);
    });

    test('filter with spaces in option', function (assert) {
      assert.expect(1);

      const array = ['foo  bar', 'baz  qux'];
      const expecting = ['foo  bar'];
      const results = filter(array).query('o b').run();

      assert.deepEqual(results, expecting);
    });

    test('filter by key', function (assert) {
      assert.expect(1);

      const foo = { name: 'foo' };
      const bar = { name: 'bar' };
      const baz = { name: 'baz' };
      const qux = null;

      const array = [foo, bar, baz, qux];
      const expecting = [bar, baz];
      const results = filter(array).by('name').query('b').run();

      assert.deepEqual(results, expecting);
    });

    test('filter by keys', function (assert) {
      assert.expect(2);

      const foo = { name: 'foo', email: 'fred@foo.com' };
      const bar = { name: 'bar', email: 'bob@bar.com' };
      const baz = { name: 'baz', email: 'bill@baz.com' };
      const qux = null;

      const array = [foo, bar, baz, qux];

      let results = filter(array).by(['name', 'email']).query('b').run();
      let expecting = [bar, baz];

      assert.deepEqual(results, expecting);

      results = filter(array).by(['name', 'email']).query('bo').run();
      expecting = [bar];

      assert.deepEqual(results, expecting);
    });

    test('filter by custom', function (assert) {
      assert.expect(1);

      const foo = { id: 1, name: 'foo' };
      const bar = { id: 2, name: 'bar' };
      const baz = { id: 3, name: 'baz' };

      const array = [foo, bar, baz];
      const expecting = [bar];

      const results = filter(array)
        .by((value) => value.id)
        .query('2')
        .run();

      assert.deepEqual(results, expecting);
    });

    test('filter using custom', function (assert) {
      assert.expect(8);

      const custom = (value, query) => {
        assert.step(value);

        return value.includes(`@${query}`);
      };

      const foo = { name: 'foo', email: 'fred@foo.com' };
      const bar = { name: 'bar', email: 'bob@bar.com' };
      const baz = { name: 'baz', email: 'bill@baz.com' };
      const array = [foo, bar, baz];
      const expecting = [foo];

      const results = filter(array)
        .by(['name', 'email'])
        .using(custom)
        .query('f')
        .run();

      assert.deepEqual(results, expecting);

      assert.verifySteps([
        'foo',
        'fred@foo.com',
        'bar',
        'bob@bar.com',
        'baz',
        'bill@baz.com'
      ]);
    });

    test('filter by and groups', function (assert) {
      assert.expect(1);

      const foo = { name: 'foo' };
      const bar = { name: 'bar' };
      const baz = { name: 'baz' };
      const qux = { name: 'qux' };

      const array = [
        {
          name: 'Group 1',
          items: [foo, bar]
        },
        {
          name: 'Group 2',
          items: [baz, qux]
        }
      ];

      const expecting = [
        {
          name: 'Group 1',
          items: [foo]
        },
        {
          name: 'Group 2',
          items: []
        }
      ];

      const results = filter(array).by('name').groups('items').query('f').run();

      assert.deepEqual(results, expecting);
    });

    test('filter undefined/null', function (assert) {
      assert.expect(1);

      const array = [undefined, 'foo', null];
      const expecting = ['foo'];
      const results = filter(array).query('f').run();

      assert.deepEqual(results, expecting);
    });

    test('filter group', function (assert) {
      assert.expect(1);

      const array = [
        {
          name: 'Group 1',
          items: ['foo', 'bar']
        },
        {
          name: 'Group 2',
          items: ['baz', 'qux']
        }
      ];

      const expecting = [
        {
          name: 'Group 1',
          items: ['bar']
        },
        {
          name: 'Group 2',
          items: ['baz']
        }
      ];

      const results = filter(array).groups('items').query('b').run();

      assert.deepEqual(results, expecting);
    });

    test('filter nested groups', function (assert) {
      assert.expect(1);

      const array = [
        {
          name: 'Group 1',
          items: ['foo', 'bar']
        },
        {
          name: 'Group 2',
          items: [
            {
              name: 'Group 3',
              items: ['baz']
            },
            {
              name: 'Group 4',
              items: ['qux']
            }
          ]
        }
      ];

      const expecting = [
        {
          name: 'Group 1',
          items: ['bar']
        },
        {
          name: 'Group 2',
          items: [
            {
              name: 'Group 3',
              items: ['baz']
            },
            {
              name: 'Group 4',
              items: []
            }
          ]
        }
      ];

      const results = filter(array).groups('items').query('b').run();

      assert.deepEqual(results, expecting);
    });

    test('filter drop empty groups', function (assert) {
      assert.expect(1);

      const array = [
        {
          name: 'Group 1',
          items: ['foo', 'bar']
        },
        {
          name: 'Group 2',
          items: ['baz', 'qux']
        }
      ];

      const expecting = [
        {
          name: 'Group 2',
          items: ['qux']
        }
      ];

      const results = filter(array)
        .groups('items')
        .dropEmptyGroups()
        .query('x')
        .run();

      assert.deepEqual(results, expecting);
    });

    test('filter nested drop empty groups', function (assert) {
      assert.expect(1);

      const array = [
        {
          name: 'Group 1',
          items: ['foo', 'bar']
        },
        {
          name: 'Group 2',
          items: [
            {
              name: 'Group 3',
              items: ['baz']
            },
            {
              name: 'Group 4',
              items: ['qux']
            }
          ]
        }
      ];

      const expecting = [
        {
          name: 'Group 2',
          items: [
            {
              name: 'Group 4',
              items: ['qux']
            }
          ]
        }
      ];

      const results = filter(array)
        .groups('items')
        .dropEmptyGroups()
        .query('x')
        .run();

      assert.deepEqual(results, expecting);
    });

    test('filter object', function (assert) {
      assert.expect(1);

      const object = {
        group1: ['foo', 'bar'],
        group2: ['bar', 'baz']
      };

      assert.throws(() => {
        filter(object).query('b').run();
      }, /Assertion Failed: must be an array/);
    });
  });
});
