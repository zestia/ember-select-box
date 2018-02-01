import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { later, next } from '@ember/runloop';
import { defer, reject } from 'rsvp';

module('select-box (searching)', function(hooks) {
  setupRenderingTest(hooks);

  test('autocomplete', async function(assert) {
    assert.expect(1);

    await render(hbs `
      {{#select-box as |sb|}}
        {{sb.input}}
      {{/select-box}}
    `);

    assert.equal(this.$('.select-box-input').attr('autocomplete'), 'off',
      'autocompletion off by default');
  });

  test('searching (promise)', async function(assert) {
    assert.expect(1);

    this.set('findItems', () => {
      this.set('items', ['foo']);
    });

    await render(hbs`
      {{#select-box on-search=(action findItems) as |sb|}}
        {{sb.input}}
        {{#each items as |item|}}
          {{sb.option value=item}}
        {{/each}}
      {{/select-box}}
    `);

    this.$('.select-box-input').val('foo').trigger('input');

    return settled().then(() => {
      assert.equal(this.$(".select-box-option:contains('foo')").length, 1,
        "resolves results even if the on-search action doesn't return a promise");
    });
  });

  test('searching (success)', async function(assert) {
    assert.expect(2);

    const deferred1 = defer();
    const deferred2 = defer();
    const deferred3 = defer();

    this.set('findItems', query => {
      if (query === 'first') {
        return deferred1.promise;
      } else if (query === 'second') {
        return deferred2.promise;
      } else if (query === 'third') {
        return deferred3.promise;
      }
    });

    this.set('foundItems', (items, query) => {
      this.setProperties({ items, query });
    });

    await render(hbs`
      {{#select-box
        on-search=(action findItems)
        on-searched=(action foundItems) as |sb|}}
        {{sb.input}}
        Results for: {{query}}
        {{#each items as |item|}}
          {{sb.option value=item label=item}}
        {{/each}}
      {{/select-box}}
    `);

    this.$('.select-box-input')
      .val('first').trigger('input')
      .val('second').trigger('input')
      .val('third').trigger('input');

    deferred3.resolve(['third']);
    deferred2.resolve(['second']);
    deferred1.resolve(['first']);

    return settled().then(() => {
      assert.ok(this.$('.select-box').text().match('Results for: third'),
        'yields results for the most recent query, ignoring later resolves');

      assert.equal(this.$('.select-box-option').text(), 'third',
        'can render options using the search results');
    });
  });

  test('searching (failure)', async function(assert) {
    assert.expect(5);

    this.set('findItems', () => reject('no results'));

    this.set('failedToFindItems', (error, query, sb) => {
      this.setProperties({ error, query });

      assert.equal(query, 'foo',
        'sends the query that caused the failure');

      assert.equal(error, 'no results',
        'sends the error that was the result of the failure');

      assert.ok(typeof sb === 'object',
        'sends the api');
    });

    await render(hbs`
      {{#select-box
        on-search=(action findItems)
        on-search-error=(action failedToFindItems) as |sb|}}
        {{sb.input}}
        {{#if error}}
          Error: {{error}} for {{query}}
        {{/if}}
      {{/select-box}}
    `);

    assert.ok(!this.$('.select-box').text().match('Error:'),
      'precondition, no error yet');

    this.$('.select-box-input').val('foo').trigger('input');

    return settled().then(() => {
      assert.ok(this.$('.select-box').text().match('Error: no results for foo'),
        'can render the search error and related query');
    });
  });

  test('searching progress', async function(assert) {
    assert.expect(3);

    const deferred = defer();

    const isSearching = () => {
      return !!this.$('.select-box').text().match('Searching: true');
    };

    this.set('findItems', () => deferred.promise);

    this.set('searched', () => {
      next(() => {
        assert.equal(isSearching(), false,
          'after the search, the select box is no longer searching');
      });
    });

    await render(hbs`
      {{#select-box
        on-search=(action findItems)
        on-searched=(action searched)
        search-delay-time=0
        as |sb|}}
        {{sb.input}}
        Searching: {{sb.isSearching}}
      {{/select-box}}
    `);

    assert.equal(isSearching(), false,
      'precondition, not searching yet');

    this.$('.select-box-input').val('a').trigger('input');

    assert.equal(isSearching(), true,
      'during the search, the select-box yields the searching status');

    deferred.resolve();

    return settled();
  });

  test('default search delay', async function(assert) {
    assert.expect(3);

    const deferred = defer();

    this.set('findItems', () => deferred.promise);

    this.set('foundItems', items => {
      this.set('items', items);
    });

    await render(hbs`
      {{#select-box
        on-search=(action findItems)
        on-searched=(action foundItems) as |sb|}}
        {{sb.input}}
        {{items.[0]}}
      {{/select-box}}
    `);

    deferred.resolve(['foo']);

    this.$('.select-box-input').val('foo').trigger('input');

    assert.ok(!this.$('.select-box').text().match('foo'),
      'precondition, the search has not run yet');

    const start = Date.now();

    return settled().then(() => {
      assert.ok(Date.now() - start >= 100,
        "a search won't start until after 100 milliseconds");

      assert.ok(this.$('.select-box').text().match('foo'),
        'the search is run');
    });
  });

  test('custom search delay', async function(assert) {
    assert.expect(2);

    const deferred = defer();

    this.set('findItems', () => deferred.promise);

    this.set('foundItems', items => {
      this.set('items', items);
    });

    await render(hbs`
      {{#select-box
        search-delay-time=200
        on-search=(action findItems)
        on-searched=(action foundItems) as |sb|}}
        {{sb.input}}
        {{items.[0]}}
      {{/select-box}}
    `);

    deferred.resolve(['foo']);

    this.$('.select-box-input').val('foo').trigger('input');

    const start = Date.now();

    return settled().then(() => {
      assert.ok(Date.now() - start >= 200,
        "a search won't run until after the specified delay time");

      assert.ok(this.$('.select-box').text().match('foo'),
        'the search is run');
    });
  });

  test('search slow time', async function(assert) {
    assert.expect(3);

    const deferred = defer();

    const isSlow = () => {
      return this.$('.select-box').text().match('Slow: true');
    };

    this.set('findItems', () => deferred.promise);

    this.set('foundItems', () => {
      next(() => {
        assert.ok(!isSlow(),
          'after the search has finished, it is no longer considered slow');
      });
    });

    await render(hbs`
      {{#select-box
        search-slow-time=100
        search-delay-time=0
        on-search=(action findItems)
        on-searched=(action foundItems) as |sb|}}
        {{sb.input}}
        Slow: {{sb.isSlowSearch}}
      {{/select-box}}
    `);

    this.$('.select-box-input').val('foo').trigger('input');

    assert.ok(!isSlow(),
      'precondition, not considered a slow search yet');

    later(() => {
      assert.ok(isSlow(),
        'search is considered slow after the specified slow time');

      deferred.resolve();
    }, 200);

    return settled();
  });

  test('query is trimmed', async function(assert) {
    assert.expect(1);

    const deferred = defer();

    this.set('findItems', query => {
      assert.equal(query, 'foo',
        'whitespace is trimmed from the query');

      return deferred.promise;
    });

    await render(hbs`
      {{#select-box
        search-delay-time=0
        on-search=(action findItems) as |sb|}}
        {{sb.input}}
      {{/select-box}}
    `);

    deferred.resolve();

    this.$('.select-box-input').val(' foo ').trigger('input');
  });

  test('default min chars', async function(assert) {
    assert.expect(2);

    const deferred = defer();

    let searches = 0;

    this.set('findItems', () => {
      searches++;
      return deferred.promise;
    });

    const input = chars => {
      this.$('.select-box-input').val(chars).trigger('input');
    };

    await render(hbs`
      {{#select-box
        search-delay-time=0
        on-search=(action findItems) as |sb|}}
        {{sb.input}}
      {{/select-box}}
    `);

    deferred.resolve();

    input('');
    assert.equal(searches, 0,
      'a search is not run if there are too few chars');

    await settled();

    input('f');
    assert.equal(searches, 1,
      'at least 1 char is required before a search will be run');
  });

  test('custom min chars', async function(assert) {
    assert.expect(1);

    const deferred = defer();

    this.set('findItems', () => {
      assert.ok(true,
        'can change the amount of min chars before a search will run');

      return deferred.promise;
    });

    await render(hbs`
      {{#select-box
        search-min-chars=0
        search-delay-time=0
        on-search=(action findItems) as |sb|}}
        {{sb.input}}
      {{/select-box}}
    `);

    deferred.resolve();

    this.$('.select-box-input').val('').trigger('input');
  });

  test('manually running a search', async function(assert) {
    assert.expect(1);

    const deferred = defer();

    this.set('findItems', value => {
      assert.strictEqual(value, '',
        'can run a search manually even if min chars is specified');

      return deferred.promise;
    });

    await render(hbs`
      {{#select-box search-min-chars=2 on-search=(action findItems) as |sb|}}
        <button onclick={{action sb.search ""}}></button>
      {{/select-box}}
    `);

    deferred.resolve();

    this.$('button').trigger('click');
  });

  test('destroying mid-search', async function(assert) {
    assert.expect(1);

    const deferred = defer();

    this.set('display', true);

    this.set('findItems', () => deferred.promise);

    await render(hbs`
      {{#if display}}
        {{#select-box on-search=(action findItems) as |sb|}}
          {{sb.input}}
        {{/select-box}}
      {{/if}}
    `);

    this.$('.select-box-input').val('foo').trigger('input');

    later(() => {
      this.set('display', false);
    }, 100);

    return settled().then(() => {
      assert.ok(true,
        'does not blow up when a search resolves, but the component is gone');

      deferred.resolve();
    });
  });

  test('set input value', async function(assert) {
    assert.expect(2);

    this.set('inputted', value => {
      assert.ok(value, true,
        'using the api to update the input does not trigger an input event' +
        '(that is likely to cause recursive searches in most scenarios)');
    });

    await render(hbs`
      {{#select-box as |sb|}}
        {{sb.input value="foo" on-input=(action inputted)}}
        <button onclick={{action sb.setInputValue "bar"}}>Reset</button>
      {{/select-box}}
    `);

    const $input = this.$('.select-box-input');

    assert.equal($input.val(), 'foo',
      'precondition, has a value');

    this.$('button').trigger('click');

    assert.equal($input.val(), 'bar',
      'exposes ability to change the input value');
  });

  test('stopping searching', async function(assert) {
    assert.expect(2);

    const deferred = defer();

    this.set('findItems', () => {
      return deferred.promise;
    });

    this.set('foundItems', () => {
      assert.ok(true,
        'callback should not be fired, searches were cancelled');
    });

    await render(hbs`
      {{#select-box
        search-delay-time=0
        on-search=(action findItems)
        on-searched=(action foundItems) as |sb|}}
        {{sb.input value=myValue on-clear=sb.stopSearching}}
      {{/select-box}}
    `);

    const $selectBox = this.$('.select-box');
    const $input = this.$('.select-box-input');

    $input.val('foo').trigger('input');

    assert.ok($selectBox.hasClass('is-searching'),
      'precondition, select box is in the middle of searching');

    $input.val('').trigger('input');

    assert.ok(!$selectBox.hasClass('is-searching'),
      'select box is no longer searching');

    deferred.resolve();

    return settled();
  });
});
