import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, find, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { later } from '@ember/runloop';
import { defer, resolve } from 'rsvp';

module('select-box (searching)', function (hooks) {
  setupRenderingTest(hooks);

  test('autocomplete', async function (assert) {
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

  test('aria', async function (assert) {
    assert.expect(11);

    await render(hbs`
      <SelectBox as |sb|>
        {{#if this.showInput}}
          <sb.Input />
        {{/if}}
        <sb.Options />
      </SelectBox>
    `);

    assert.dom('.select-box').hasAttribute('role', 'listbox');

    assert.dom('.select-box').doesNotHaveAttribute('aria-owns');

    assert
      .dom('.select-box')
      .hasAttribute('tabindex', '0', 'precondition: select box is focusable');

    assert
      .dom('.select-box__options')
      .doesNotHaveAttribute('role', 'options container is dumb');

    this.set('showInput', true);

    assert
      .dom('.select-box')
      .hasAttribute(
        'role',
        'combobox',
        'a select box with an input has an appropriate role'
      );

    assert
      .dom('.select-box__options')
      .hasAttribute(
        'role',
        'listbox',
        'now that an input element is present the parent combobox is a _combination_ ' +
          'of a text box and a list box of options'
      );

    assert
      .dom('.select-box')
      .hasAttribute(
        'tabindex',
        '-1',
        'a select box should not be focusable if it contains an input ' +
          'instead, pressing tab should jump directly to the input within'
      );

    assert
      .dom('.select-box__input')
      .hasAttribute(
        'aria-controls',
        find('.select-box__options').getAttribute('id'),
        'text box knows it controls the list box'
      );

    assert
      .dom('.select-box')
      .hasAttribute(
        'aria-owns',
        find('.select-box__options').getAttribute('id'),
        'the combo box knows it owns the list box'
      );

    this.set('showInput', false);

    assert.dom('.select-box').hasAttribute('role', 'listbox');

    assert
      .dom('.select-box')
      .hasAttribute('tabindex', '0', 'postcondition: select box is focusable');
  });

  test('multiselectable combobox', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <SelectBox @multiple={{this.multiple}} as |sb|>
        <sb.Input />
        <sb.Options />
      </SelectBox>
    `);

    assert.dom('[aria-multiselectable="false"]').doesNotExist();

    this.set('multiple', true);

    assert.dom('.select-box').doesNotHaveAttribute('aria-multiselectable');
    assert.dom('.select-box__options').hasAttribute('aria-multiselectable');
  });

  test('searching (promise)', async function (assert) {
    assert.expect(1);

    this.handleSearch = () => this.set('items', ['foo']);

    await render(hbs`
      <SelectBox @onSearch={{this.handleSearch}} as |sb|>
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

  test('searching (success)', async function (assert) {
    assert.expect(2);

    const deferred1 = defer();
    const deferred2 = defer();
    const deferred3 = defer();

    this.handleSearch = (query) => {
      if (query === 'first') {
        return deferred1.promise;
      } else if (query === 'second') {
        return deferred2.promise;
      } else if (query === 'third') {
        return deferred3.promise;
      }
    };

    this.handleSearched = (items, query) => {
      this.setProperties({ items, query });
    };

    await render(hbs`
      <SelectBox
        @onSearch={{this.handleSearch}}
        @onSearched={{this.handleSearched}} as |sb|
      >
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

    assert
      .dom('.select-box')
      .containsText(
        'Results for: third',
        'yields results for the most recent query, ignoring later resolves'
      );

    assert
      .dom('.select-box__option')
      .hasText('third', 'can render options using the search results');
  });

  test('searching (failure)', async function (assert) {
    assert.expect(5);

    this.handleSearch = () => {
      return new Promise((resolve, reject) => {
        reject(new Error('no results'));
      });
    };

    this.handleSearchFailure = (error, query, sb) => {
      this.setProperties({ error, query });

      assert.equal(query, 'foo', 'sends the query that caused the failure');

      assert.deepEqual(
        error,
        this.error,
        'sends the error that was the result of the failure'
      );

      assert.ok(typeof sb === 'object', 'sends the api');
    };

    await render(hbs`
      <SelectBox
        @onSearch={{this.handleSearch}}
        @onSearchError={{this.handleSearchFailure}} as |sb|
      >
        <sb.Input />
        {{#if this.error}}
          Error: {{this.error}} for {{this.query}}
        {{/if}}
      </SelectBox>
    `);

    assert
      .dom('.select-box')
      .doesNotContainText('Error:', 'precondition, no error yet');

    await fillIn('.select-box__input', 'foo');

    assert
      .dom('.select-box')
      .containsText(
        'Error: no results for foo',
        'can render the search error and related query'
      );
  });

  test('searching progress', async function (assert) {
    assert.expect(3);

    const deferred = defer();

    this.handleSearch = () => deferred.promise;

    await render(hbs`
      <SelectBox
        @onSearch={{this.handleSearch}}
        @onSearched={{this.handleSearched}}
        @searchDelayTime={{0}}
        as |sb|
      >
        <sb.Input />
        Searching: {{sb.isSearching}}
      </SelectBox>
    `);

    assert
      .dom('.select-box')
      .doesNotContainText('Searching: true', 'precondition, not searching yet');

    await fillIn('.select-box__input', 'a');

    assert
      .dom('.select-box')
      .containsText(
        'Searching: true',
        'during the search, the select-box yields the searching status'
      );

    deferred.resolve();

    await settled();

    assert
      .dom('.select-box')
      .doesNotContainText(
        'Searching: true',
        'after the search, the select box is no longer searching'
      );
  });

  test('default search delay', async function (assert) {
    assert.expect(3);

    const deferred = defer();

    this.handleSearch = () => deferred.promise;

    this.handleSearched = (items) => this.set('items', items);

    await render(hbs`
      <SelectBox
        @onSearch={{this.handleSearch}}
        @onSearched={{this.handleSearched}} as |sb|
      >
        <sb.Input />
        {{this.items.[0]}}
      </SelectBox>
    `);

    deferred.resolve(['foo']);

    fillIn('.select-box__input', 'foo');

    assert
      .dom('.select-box')
      .doesNotContainText('foo', 'precondition, the search has not run yet');

    const start = Date.now();

    await settled();

    assert.ok(
      Date.now() - start >= 100,
      "a search won't start until after 100 milliseconds"
    );

    assert.dom('.select-box').containsText('foo', 'the search is run');
  });

  test('custom search delay', async function (assert) {
    assert.expect(2);

    const deferred = defer();

    this.handleSearch = () => deferred.promise;

    this.handleSearched = (items) => this.set('items', items);

    await render(hbs`
      <SelectBox
        @searchDelayTime={{200}}
        @onSearch={{this.handleSearch}}
        @onSearched={{this.handleSearched}} as |sb|
      >
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

    assert.dom('.select-box').containsText('foo', 'the search is run');
  });

  test('search slow time', async function (assert) {
    assert.expect(3);

    const deferred = defer();

    this.handleSearch = () => deferred.promise;

    await render(hbs`
      <SelectBox
        @searchSlowTime={{100}}
        @searchDelayTime={{0}}
        @onSearch={{this.handleSearch}} as |sb|
      >
        <sb.Input />
        Slow: {{sb.isSlowSearch}}
      </SelectBox>
    `);

    fillIn('.select-box__input', 'foo');

    assert
      .dom('.select-box')
      .containsText(
        'Slow: false',
        'precondition, not considered a slow search yet'
      );

    later(() => {
      assert
        .dom('.select-box')
        .containsText(
          'Slow: true',
          'search is considered slow after the specified slow time'
        );

      deferred.resolve();
    }, 200);

    await settled();

    assert
      .dom('.select-box')
      .containsText(
        'Slow: false',
        'after the search has finished, it is no longer considered slow'
      );
  });

  test('query is trimmed', async function (assert) {
    assert.expect(1);

    const deferred = defer();

    this.handleSearch = (query) => {
      assert.equal(query, 'foo', 'whitespace is trimmed from the query');

      return deferred.promise;
    };

    await render(hbs`
      <SelectBox
        @searchDelayTime={{0}}
        @onSearch={{this.handleSearch}} as |sb|
      >
        <sb.Input />
      </SelectBox>
    `);

    deferred.resolve();

    await fillIn('.select-box__input', ' foo ');
  });

  test('default min chars', async function (assert) {
    assert.expect(3);

    const deferred = defer();

    this.handleSearch = () => {
      assert.step('search');
      return deferred.promise;
    };

    await render(hbs`
      <SelectBox
        @searchDelayTime={{0}}
        @onSearch={{this.handleSearch}} as |sb|
      >
        <sb.Input />
      </SelectBox>
    `);

    deferred.resolve();

    await fillIn('.select-box__input', '');

    assert.verifySteps([], 'a search is not run if there are too few chars');

    await settled();

    await fillIn('.select-box__input', 'f');

    assert.verifySteps(
      ['search'],
      'at least 1 char is required before a search will be run'
    );
  });

  test('custom min chars', async function (assert) {
    assert.expect(1);

    const deferred = defer();

    this.handleSearch = () => {
      assert.ok(
        true,
        'can change the amount of min chars before a search will run'
      );

      return deferred.promise;
    };

    await render(hbs`
      <SelectBox
        @searchMinChars={{0}}
        @searchDelayTime={{0}}
        @onSearch={{this.handleSearch}} as |sb|
      >
        <sb.Input />
      </SelectBox>
    `);

    deferred.resolve();

    await fillIn('.select-box__input', '');
  });

  test('manually running a search', async function (assert) {
    assert.expect(1);

    const deferred = defer();

    this.handleSearch = (value) => {
      assert.strictEqual(
        value,
        '',
        'can run a search manually even if min chars is specified'
      );

      return deferred.promise;
    };

    await render(hbs`
      <SelectBox @searchMinChars={{2}} @onSearch={{this.handleSearch}} as |sb|>
        <button type="button" {{on "click" (fn sb.search "")}}></button>
      </SelectBox>
    `);

    deferred.resolve();

    await click('button');
  });

  test('set input value', async function (assert) {
    assert.expect(2);

    this.handleInput = (value) => {
      assert.ok(
        value,
        true,
        'using the api to update the input does not trigger an input event' +
          '(that is likely to cause recursive searches in most scenarios)'
      );
    };

    await render(hbs`
      <SelectBox as |sb|>
        {{! Issue: https://github.com/emberjs/rfcs/issues/497 }}

        <sb.Input @value="foo" {{on "input" this.handleInput}} />

        <button
          type="button"
          {{on "click" (fn sb.setInputValue "bar")}}
        >
          Reset
        </button>
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

  test('set input value if destroyed', async function (assert) {
    assert.expect(2);

    this.show = true;

    this.hide = (value, sb) => {
      this.set('show', false);
      sb.setInputValue('bar');
    };

    await render(hbs`
      {{#if this.show}}
        <SelectBox @onSelect={{this.hide}} as |sb|>
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

  test('searching attributes', async function (assert) {
    assert.expect(2);

    const deferred = defer();

    this.handleSearch = () => deferred.promise;

    this.handleSearched = () =>
      assert.ok(true, 'callback should not be fired, searches were cancelled');

    await render(hbs`
      <SelectBox
        @searchDelayTime={{0}}
        @onSearch={{this.handleSearch}}
        @onSearched={{this.handleSearched}} as |sb|
      >
        <sb.Input @value={{this.myValue}} @onClear={{sb.cancelSearch}} />
      </SelectBox>
    `);

    const selectBox = find('.select-box');
    const input = find('.select-box__input');

    await fillIn(input, 'foo');

    assert
      .dom(selectBox)
      .hasAttribute('aria-busy', 'true', 'is busy whilst searching');

    await fillIn(input, '');

    assert
      .dom(selectBox)
      .hasAttribute('aria-busy', 'false', 'is no longer busy');

    deferred.resolve();
  });

  test('searching promise order', async function (assert) {
    assert.expect(1);

    let count = 0;

    this.handleSearch = () => {
      count++;

      if (count === 1) {
        return new Promise((resolve) => {
          later(() => resolve('first'), 200);
        });
      } else if (count === 2) {
        return new Promise((resolve) => {
          later(() => resolve('second'), 100);
        });
      }
    };

    this.handleSearched = (result) => {
      this.set('result', result);
    };

    await render(hbs`
      <SelectBox
        @searchDelayTime={{0}}
        @onSearch={{this.handleSearch}}
        @onSearched={{this.handleSearched}} as |sb|
      >
        <sb.Input @value={{this.myValue}}  />

        {{this.result}}
      </SelectBox>
    `);

    // Intentionally no await
    fillIn('.select-box__input', 'foo');
    fillIn('.select-box__input', 'bar');

    await settled();

    assert.dom('.select-box').containsText('second');
  });

  test('search api', async function (assert) {
    assert.expect(1);

    let api;

    this.handleReady = (sb) => (api = sb);
    this.handleSearch = () => resolve(['foo', 'bar']);

    await render(hbs`
        <SelectBox
          @onReady={{this.handleReady}}
          @onSearch={{this.handleSearch}}
        />
      `);

    api.search('foo').then((results) => {
      assert.strictEqual(
        results,
        undefined,
        'does not resolve the search results. ' +
          '(this is not how the api is intended to be used)'
      );
    });
  });
});
