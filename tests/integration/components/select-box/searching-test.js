import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, find, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { later, next } from '@ember/runloop';
import { defer, reject } from 'rsvp';

module('select-box (searching)', function(hooks) {
  setupRenderingTest(hooks);

  test('autocomplete', async function(assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Input />
      </SelectBox>
    `);

    assert
      .dom('.select-box__input')
      .hasAttribute('autocomplete', 'off', 'autocompletion off by default');
  });

  test('aria', async function(assert) {
    assert.expect(7);

    await render(hbs`
      <SelectBox as |sb|>
        {{#if this.showInput}}
          <sb.Input />
        {{/if}}
      </SelectBox>
    `);

    assert.dom('.select-box').doesNotHaveAttribute('role', 'precondition');

    assert
      .dom('.select-box')
      .hasAttribute('tabindex', '0', 'precondition: select box is focusable');

    this.set('showInput', true);

    assert
      .dom('.select-box')
      .hasAttribute(
        'role',
        'combobox',
        'a select box with an input has an appropriate aria role'
      );

    assert
      .dom('.select-box')
      .hasAttribute(
        'tabindex',
        '-1',
        'a select box should not be focusable if it contains an input ' +
          'instead, pressing tab should jump directly to the input'
      );

    assert
      .dom('.select-box__input')
      .hasAttribute(
        'aria-controls',
        find('.select-box').getAttribute('id'),
        'text box knows it controls the combo box'
      );

    this.set('showInput', false);

    assert.dom('.select-box').hasAttribute('role', 'listbox');

    assert
      .dom('.select-box')
      .hasAttribute('tabindex', '0', 'postcondition: select box is focusable');
  });

  test('searching (promise)', async function(assert) {
    assert.expect(1);

    this.set('findItems', () => {
      this.set('items', ['foo']);
    });

    await render(hbs`
      <SelectBox @onSearch={{this.findItems}} as |sb|>
        <sb.Input />
        {{#each this.items as |item|}}
          <sb.Option @value={{item}}>
            {{item}}
          </sb.Option>
        {{/each}}
      </SelectBox>
    `);

    await fillIn('.select-box__input', 'foo');

    assert
      .dom('.select-box__option')
      .hasText(
        'foo',
        "resolves results even if the onSearch action doesn't return a promise"
      );
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
      <SelectBox
        @onSearch={{this.findItems}}
        @onSearched={{this.foundItems}} as |sb|>
        <sb.Input />
        Results for: {{this.query}}
        {{#each this.items as |item|}}
          <sb.Option @value={{item}}>
            {{item}}
          </sb.Option>
        {{/each}}
      </SelectBox>
    `);

    fillIn('.select-box__input', 'first');
    fillIn('.select-box__input', 'second');
    fillIn('.select-box__input', 'third');

    deferred3.resolve(['third']);
    deferred2.resolve(['second']);
    deferred1.resolve(['first']);

    await settled();

    assert.ok(
      find('.select-box').textContent.match('Results for: third'),
      'yields results for the most recent query, ignoring later resolves'
    );

    assert
      .dom('.select-box__option')
      .hasText('third', 'can render options using the search results');
  });

  test('searching (failure)', async function(assert) {
    assert.expect(5);

    this.set('findItems', () => reject('no results'));

    this.set('failedToFindItems', (error, query, sb) => {
      this.setProperties({ error, query });

      assert.equal(query, 'foo', 'sends the query that caused the failure');

      assert.deepEqual(
        error,
        this.error,
        'sends the error that was the result of the failure'
      );

      assert.ok(typeof sb === 'object', 'sends the api');
    });

    await render(hbs`
      <SelectBox
        @onSearch={{this.findItems}}
        @onSearchError={{this.failedToFindItems}} as |sb|>
        <sb.Input />
        {{#if this.error}}
          Error: {{this.error}} for {{this.query}}
        {{/if}}
      </SelectBox>
    `);

    assert.ok(
      !find('.select-box').textContent.match('Error:'),
      'precondition, no error yet'
    );

    await fillIn('.select-box__input', 'foo');

    assert.ok(
      find('.select-box').textContent.match('Error: no results for foo'),
      'can render the search error and related query'
    );
  });

  test('searching progress', async function(assert) {
    assert.expect(3);

    const deferred = defer();

    const isSearching = () => {
      return !!find('.select-box').textContent.match('Searching: true');
    };

    this.set('findItems', () => deferred.promise);

    this.set('searched', () => {
      next(() => {
        assert.equal(
          isSearching(),
          false,
          'after the search, the select box is no longer searching'
        );
      });
    });

    await render(hbs`
      <SelectBox
        @onSearch={{this.findItems}}
        @onSearched={{this.searched}}
        @searchDelayTime={{0}}
        as |sb|>
        <sb.Input />
        Searching: {{sb.isSearching}}
      </SelectBox>
    `);

    assert.equal(isSearching(), false, 'precondition, not searching yet');

    await fillIn('.select-box__input', 'a');

    assert.equal(
      isSearching(),
      true,
      'during the search, the select-box yields the searching status'
    );

    deferred.resolve();
  });

  test('default search delay', async function(assert) {
    assert.expect(3);

    const deferred = defer();

    this.set('findItems', () => deferred.promise);

    this.set('foundItems', items => {
      this.set('items', items);
    });

    await render(hbs`
      <SelectBox
        @onSearch={{this.findItems}}
        @onSearched={{this.foundItems}} as |sb|>
        <sb.Input />
        {{this.items.[0]}}
      </SelectBox>
    `);

    deferred.resolve(['foo']);

    fillIn('.select-box__input', 'foo');

    assert.ok(
      !find('.select-box').textContent.match('foo'),
      'precondition, the search has not run yet'
    );

    const start = Date.now();

    await settled();

    assert.ok(
      Date.now() - start >= 100,
      "a search won't start until after 100 milliseconds"
    );

    assert.ok(
      find('.select-box').textContent.match('foo'),
      'the search is run'
    );
  });

  test('custom search delay', async function(assert) {
    assert.expect(2);

    const deferred = defer();

    this.set('findItems', () => deferred.promise);

    this.set('foundItems', items => {
      this.set('items', items);
    });

    await render(hbs`
      <SelectBox
        @searchDelayTime={{200}}
        @onSearch={{this.findItems}}
        @onSearched={{this.foundItems}} as |sb|>
        <sb.Input />
        {{this.items.[0]}}
      </SelectBox>
    `);

    deferred.resolve(['foo']);

    fillIn('.select-box__input', 'foo');

    const start = Date.now();

    await settled();

    assert.ok(
      Date.now() - start >= 200,
      "a search won't run until after the specified delay time"
    );

    assert.ok(
      find('.select-box').textContent.match('foo'),
      'the search is run'
    );
  });

  test('search slow time', async function(assert) {
    assert.expect(3);

    const deferred = defer();

    const isSlow = () => {
      return find('.select-box').textContent.match('Slow: true');
    };

    this.set('findItems', () => deferred.promise);

    this.set('foundItems', () => {
      next(() => {
        assert.ok(
          !isSlow(),
          'after the search has finished, it is no longer considered slow'
        );
      });
    });

    await render(hbs`
      <SelectBox
        @searchSlowTime={{100}}
        @searchDelayTime={{0}}
        @onSearch={{this.findItems}}
        @onSearched={{this.foundItems}} as |sb|>
        <sb.Input />
        Slow: {{sb.isSlowSearch}}
      </SelectBox>
    `);

    fillIn('.select-box__input', 'foo');

    assert.ok(!isSlow(), 'precondition, not considered a slow search yet');

    later(() => {
      assert.ok(
        isSlow(),
        'search is considered slow after the specified slow time'
      );

      deferred.resolve();
    }, 200);
  });

  test('query is trimmed', async function(assert) {
    assert.expect(1);

    const deferred = defer();

    this.set('findItems', query => {
      assert.equal(query, 'foo', 'whitespace is trimmed from the query');

      return deferred.promise;
    });

    await render(hbs`
      <SelectBox
        @searchDelayTime={{0}}
        @onSearch={{this.findItems}} as |sb|>
        <sb.Input />
      </SelectBox>
    `);

    deferred.resolve();

    await fillIn('.select-box__input', ' foo ');
  });

  test('default min chars', async function(assert) {
    assert.expect(2);

    const deferred = defer();

    let searches = 0;

    this.set('findItems', () => {
      searches++;
      return deferred.promise;
    });

    await render(hbs`
      <SelectBox
        @searchDelayTime={{0}}
        @onSearch={{this.findItems}} as |sb|>
        <sb.Input />
      </SelectBox>
    `);

    deferred.resolve();

    await fillIn('.select-box__input', '');

    assert.equal(searches, 0, 'a search is not run if there are too few chars');

    await settled();

    await fillIn('.select-box__input', 'f');

    assert.equal(
      searches,
      1,
      'at least 1 char is required before a search will be run'
    );
  });

  test('custom min chars', async function(assert) {
    assert.expect(1);

    const deferred = defer();

    this.set('findItems', () => {
      assert.ok(
        true,
        'can change the amount of min chars before a search will run'
      );

      return deferred.promise;
    });

    await render(hbs`
      <SelectBox
        @searchMinChars={{0}}
        @searchDelayTime={{0}}
        @onSearch={{this.findItems}} as |sb|>
        <sb.Input />
      </SelectBox>
    `);

    deferred.resolve();

    await fillIn('.select-box__input', '');
  });

  test('manually running a search', async function(assert) {
    assert.expect(1);

    const deferred = defer();

    this.set('findItems', value => {
      assert.strictEqual(
        value,
        '',
        'can run a search manually even if min chars is specified'
      );

      return deferred.promise;
    });

    await render(hbs`
      <SelectBox @searchMinChars={{2}} @onSearch={{this.findItems}} as |sb|>
        <button onclick={{action sb.search ""}}></button>
      </SelectBox>
    `);

    deferred.resolve();

    await click('button');
  });

  test('destroying mid-search', async function(assert) {
    assert.expect(1);

    const deferred = defer();

    this.set('display', true);

    this.set('findItems', () => deferred.promise);

    await render(hbs`
      {{#if this.display}}
        <SelectBox @onSearch={{this.findItems}} as |sb|>
          <sb.Input />
        </SelectBox>
      {{/if}}
    `);

    fillIn('.select-box__input', 'foo');

    later(() => {
      this.set('display', false);
    }, 100);

    await settled();

    assert.ok(
      true,
      'does not blow up when a search resolves, but the component is gone'
    );

    deferred.resolve();
  });

  test('set input value', async function(assert) {
    assert.expect(2);

    this.set('inputted', value => {
      assert.ok(
        value,
        true,
        'using the api to update the input does not trigger an input event' +
          '(that is likely to cause recursive searches in most scenarios)'
      );
    });

    await render(hbs`
      <SelectBox as |sb|>
        {{! Issue: https://github.com/emberjs/rfcs/issues/497 }}

        <sb.Input @value="foo" @onInput={{this.inputted}} />
        <button onclick={{action sb.setInputValue "bar"}}>Reset</button>
      </SelectBox>
    `);

    const input = find('.select-box__input');

    assert.equal(input.value, 'foo', 'precondition, has a value');

    await click('button');

    assert.equal(
      input.value,
      'bar',
      'exposes ability to change the input value'
    );
  });

  test('set input value if destroyed', async function(assert) {
    assert.expect(2);

    this.set('show', true);

    this.hide = (value, sb) => {
      this.set('show', false);
      sb.setInputValue('bar');
    };

    await render(hbs`
      {{#if this.show}}
        <SelectBox @onSelect={{action this.hide}} as |sb|>
          <sb.Input @value="foo" />
          <sb.Option @value="baz" />
        </SelectBox>
      {{/if}}
    `);

    assert.dom('.select-box__input').hasValue('foo', 'precondition');

    await click('.select-box__option');

    assert
      .dom('.select-box__input')
      .doesNotExist(
        'does not blow up attempting to set value of element that is not present'
      );
  });

  test('searching attributes', async function(assert) {
    assert.expect(4);

    const deferred = defer();

    this.set('findItems', () => {
      return deferred.promise;
    });

    this.set('foundItems', () => {
      assert.ok(true, 'callback should not be fired, searches were cancelled');
    });

    await render(hbs`
      <SelectBox
        @searchDelayTime={{0}}
        @onSearch={{this.findItems}}
        @onSearched={{this.foundItems}} as |sb|>
        {{sb.Input value=this.myValue onClear=sb.cancelSearch}}
      </SelectBox>
    `);

    const selectBox = find('.select-box');
    const input = find('.select-box__input');

    await fillIn(input, 'foo');

    assert
      .dom(selectBox)
      .hasClass(
        'select-box--busy',
        'precondition, select box is in the middle of searching'
      );

    assert
      .dom(selectBox)
      .hasAttribute('aria-busy', 'true', 'is busy whilst searching');

    await fillIn(input, '');

    assert
      .dom(selectBox)
      .doesNotHaveClass(
        'select-box--busy',
        'select box is no longer busy searching'
      );

    assert
      .dom(selectBox)
      .hasAttribute('aria-busy', 'false', 'is no longer busy');

    deferred.resolve();
  });
});
