import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import { later, next } from '@ember/runloop';
import promise from '../../../helpers/promises';


moduleForComponent('', 'select-box (searching)', {
  integration: true
});


test('autocomplete', function(assert) {
  assert.expect(1);

  this.render(hbs `
    {{#select-box as |sb|}}
      {{sb.input}}
    {{/select-box}}
  `);

  assert.equal(this.$('.select-box-input').attr('autocomplete'), 'off',
    'autocompletion off by default');
});


test('searching (promise)', function(assert) {
  assert.expect(1);

  this.on('findItems', () => {
    this.set('items', ['foo']);
  });

  this.render(hbs`
    {{#select-box on-search=(action "findItems") as |sb|}}
      {{sb.input}}
      {{#each items as |item|}}
        {{sb.option value=item}}
      {{/each}}
    {{/select-box}}
  `);

  this.$('.select-box-input').val('foo').trigger('input');

  return wait().then(() => {
    assert.equal(this.$(".select-box-option:contains('foo')").length, 1,
      "resolves results even if the on-search action doesn't return a promise");
  });
});


test('searching (success)', function(assert) {
  assert.expect(2);

  this.on('findItems', query => {
    if (query === 'first') {
      return promise([query], null, 300);
    } else if (query === 'second') {
      return promise([query], null, 200);
    } else if (query === 'third') {
      return promise([query], null, 100);
    }
  });

  this.on('foundItems', (items, query) => {
    this.setProperties({ items, query });
  });

  this.render(hbs`
    {{#select-box
      on-search=(action "findItems")
      on-searched=(action "foundItems") as |sb|}}
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

  return wait().then(() => {
    assert.ok(this.$('.select-box').text().match('Results for: third'),
      'yields results for the most recent query, ignoring later resolves');

    assert.equal(this.$('.select-box-option').text(), 'third',
      'can render options using the search results');
  });
});


test('searching (failure)', function(assert) {
  assert.expect(5);

  this.on('findItems', () => promise(null, 'no results'));

  this.on('failedToFindItems', (error, query, sb) => {
    this.setProperties({ error, query });

    assert.equal(query, 'foo',
      'sends the query that caused the failure');

    assert.equal(error, 'no results',
      'sends the error that was the result of the failure');

    assert.ok(typeof sb === 'object',
      'sends the api');
  });

  this.render(hbs`
    {{#select-box
      on-search=(action "findItems")
      on-search-error=(action "failedToFindItems") as |sb|}}
      {{sb.input}}
      {{#if error}}
        Error: {{error}} for {{query}}
      {{/if}}
    {{/select-box}}
  `);

  assert.ok(!this.$('.select-box').text().match('Error:'),
    'precondition, no error yet');

  this.$('.select-box-input').val('foo').trigger('input');

  return wait().then(() => {
    assert.ok(this.$('.select-box').text().match('Error: no results for foo'),
      'can render the search error and related query');
  });
});


test('searching progress', function(assert) {
  assert.expect(3);

  const isSearching = () => {
    return !!this.$('.select-box').text().match('Searching: true');
  };

  this.on('findItems', () => promise(true, null, 100));

  this.on('searched', () => {
    next(() => {
      assert.equal(isSearching(), false,
        'after the search, the select box is no longer searching');
    });
  });

  this.render(hbs`
    {{#select-box
      on-search=(action "findItems")
      on-searched=(action "searched")
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

  return wait();
});


test('default search delay', function(assert) {
  assert.expect(3);

  this.on('findItems', () => promise(['foo']));

  this.on('foundItems', items => {
    this.set('items', items);
  });

  this.render(hbs`
    {{#select-box
      on-search=(action "findItems")
      on-searched=(action "foundItems") as |sb|}}
      {{sb.input}}
      {{items.[0]}}
    {{/select-box}}
  `);

  this.$('.select-box-input').val('foo').trigger('input');

  assert.ok(!this.$('.select-box').text().match('foo'),
    'precondition, the search has not run yet');

  const start = Date.now();

  return wait().then(() => {
    assert.ok(Date.now() - start >= 100,
      "a search won't start until after 100 milliseconds");

    assert.ok(this.$('.select-box').text().match('foo'),
      'the search is run');
  });
});


test('custom search delay', function(assert) {
  assert.expect(2);

  this.on('findItems', () => promise(['foo']));

  this.on('foundItems', items => {
    this.set('items', items);
  });

  this.render(hbs`
    {{#select-box
      search-delay-time=200
      on-search=(action "findItems")
      on-searched=(action "foundItems") as |sb|}}
      {{sb.input}}
      {{items.[0]}}
    {{/select-box}}
  `);

  this.$('.select-box-input').val('foo').trigger('input');

  const start = Date.now();

  return wait().then(() => {
    assert.ok(Date.now() - start >= 200,
      "a search won't run until after the specified delay time");

    assert.ok(this.$('.select-box').text().match('foo'),
      'the search is run');
  });
});


test('search slow time', function(assert) {
  assert.expect(3);

  const isSlow = () => {
    return this.$('.select-box').text().match('Slow: true');
  };

  this.on('findItems', () => promise(true, null, 100));

  this.on('foundItems', () => {
    assert.ok(isSlow(),
      'search is considered slow after the specified slow time');

    next(() => {
      assert.ok(!isSlow(),
        'after the search has finished, it is no longer considered slow');
    });
  });

  this.render(hbs`
    {{#select-box
      search-slow-time=100
      search-delay-time=0
      on-search=(action "findItems")
      on-searched=(action "foundItems") as |sb|}}
      {{sb.input}}
      Slow: {{sb.isSlowSearch}}
    {{/select-box}}
  `);

  this.$('.select-box-input').val('foo').trigger('input');

  assert.ok(!isSlow(),
    'precondition, not considered a slow search yet');

  return wait();
});


test('query is trimmed', function(assert) {
  assert.expect(1);

  this.on('findItems', query => {
    assert.equal(query, 'foo',
      'whitespace is trimmed from the query');

    return promise(true);
  });

  this.render(hbs`
    {{#select-box
      search-delay-time=0
      on-search=(action "findItems") as |sb|}}
      {{sb.input}}
    {{/select-box}}
  `);

  this.$('.select-box-input').val(' foo ').trigger('input');
});


test('default min chars', function(assert) {
  assert.expect(2);

  let searches = 0;

  this.on('findItems', () => {
    searches++;
    return promise(true);
  });

  const input = chars => {
    this.$('.select-box-input').val(chars).trigger('input');
  };

  this.render(hbs`
    {{#select-box
      search-delay-time=0
      on-search=(action "findItems") as |sb|}}
      {{sb.input}}
    {{/select-box}}
  `);

  input('');
  assert.equal(searches, 0,
    'a search is not run if there are too few chars');

  next(() => {
    input('f');
    assert.equal(searches, 1,
      'at least 1 char is required before a search will be run');
  });
});


test('custom min chars', function(assert) {
  assert.expect(1);

  this.on('findItems', () => {
    assert.ok(true,
      'can change the amount of min chars before a search will run');

    return promise(true);
  });

  this.render(hbs`
    {{#select-box
      search-min-chars=0
      search-delay-time=0
      on-search=(action "findItems") as |sb|}}
      {{sb.input}}
    {{/select-box}}
  `);

  this.$('.select-box-input').val('').trigger('input');
});


test('manually running a search', function(assert) {
  assert.expect(1);

  this.on('findItems', value => {
    assert.strictEqual(value, '',
      'can run a search manually even if min chars is specified');

    return promise(true);
  });

  this.render(hbs`
    {{#select-box search-min-chars=2 on-search=(action "findItems") as |sb|}}
      <button onclick={{action sb.search ""}}></button>
    {{/select-box}}
  `);

  this.$('button').trigger('click');
});


test('destroying mid-search', function(assert) {
  assert.expect(1);

  this.set('display', true);

  this.on('findItems', () => promise(true, null, 200));

  this.render(hbs`
    {{#if display}}
      {{#select-box on-search=(action "findItems") as |sb|}}
        {{sb.input}}
      {{/select-box}}
    {{/if}}
  `);

  this.$('.select-box-input').val('foo').trigger('input');

  later(() => {
    this.set('display', false);
  }, 100);

  return wait().then(() => {
    assert.ok(true,
      'does not blow up when a search resolves, but the component is gone');
  });
});


test('set input value', function(assert) {
  assert.expect(2);

  this.on('inputted', value => {
    assert.ok(value, true,
      'using the api to update the input does not trigger an input event' +
      '(that is likely to cause recursive searches in most scenarios)');
  });

  this.render(hbs`
    {{#select-box as |sb|}}
      {{sb.input value="foo" on-input=(action "inputted")}}
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


test('stopping searching', function(assert) {
  assert.expect(2);

  this.on('findItems', () => {
    return promise(true, null, 200);
  });

  this.on('foundItems', () => {
    assert.ok(true,
      'callback should not be fired, searches were cancelled');
  });

  this.render(hbs`
    {{#select-box
      search-delay-time=0
      on-search=(action "findItems")
      on-searched=(action "foundItems") as |sb|}}
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

  return wait();
});
