import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, fillIn, click, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import sleep from 'dummy/utils/sleep';
import { defer } from 'rsvp';

module('select-box (searching)', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.getOptions = () => {
      return findAll('.select-box__option').map((element) =>
        element.textContent.trim()
      );
    };
  });

  test('busy state whilst searching', async function (assert) {
    assert.expect(9);

    this.deferred = defer();

    this.handleSearch = () => this.deferred.promise;

    await render(hbs`
      <SelectBox @onSearch={{this.handleSearch}} as |sb|>
        <sb.Trigger />
        <sb.Input />
      </SelectBox>
    `);

    assert.dom('.select-box').hasAttribute('data-busy', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-busy', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-busy', 'false');

    await fillIn('.select-box__input', 'x');

    assert.dom('.select-box').hasAttribute('data-busy', 'true');
    assert.dom('.select-box__trigger').hasAttribute('aria-busy', 'true');
    assert.dom('.select-box__input').hasAttribute('aria-busy', 'true');

    this.deferred.resolve();

    await settled();

    assert.dom('.select-box').hasAttribute('data-busy', 'false');
    assert.dom('.select-box__trigger').hasAttribute('aria-busy', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-busy', 'false');
  });

  test('search task', async function (assert) {
    assert.expect(10);

    this.first = defer();
    this.second = defer();
    this.third = defer();
    this.fourth = defer();

    this.handleSearch = (query) => {
      return this[query].promise.then(() => assert.step(query));
    };

    await render(hbs`
      <SelectBox @onSearch={{this.handleSearch}} as |sb|>
        <sb.Input />
        <span>{{sb.query}}</span>
      </SelectBox>
    `);

    await fillIn('.select-box__input', 'first');

    assert.dom('span').hasText('', 'first search, but no results yet');

    await fillIn('.select-box__input', 'second');

    assert.dom('span').hasText('', 'second was dropped');

    await fillIn('.select-box__input', 'third');

    assert.dom('span').hasText('', 'third was dropped');

    await fillIn('.select-box__input', 'fourth');

    assert.dom('span').hasText('', 'fourth search, no results yet');

    this.fourth.resolve();
    this.third.resolve();
    this.second.resolve();
    this.first.resolve();

    await settled();

    assert.verifySteps(['fourth', 'third', 'second', 'first']);

    assert
      .dom('span')
      .hasText(
        'fourth',
        'all searches resolved, but only care about latest results'
      );
  });

  test('active option after a search', async function (assert) {
    assert.expect(2);

    this.deferred = defer();

    this.handleSearch = async (query, sb) => {
      await this.deferred.promise;
      sb.open();
    };

    await render(hbs`
      <SelectBox @onSearch={{this.handleSearch}} as |sb|>
        <sb.Input />
        {{#unless sb.isBusy}}
          <sb.Options>
            <sb.Option />
          </sb.Options>
        {{/unless}}
      </SelectBox>
    `);

    await fillIn('.select-box__input', 'x');

    assert.dom('.select-box__option').doesNotExist('precondition');

    this.deferred.resolve();

    await settled();

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute(
        'aria-current',
        'true',
        'can open the select box after a search and activate the first option'
      );
  });

  test('active option after a search (with selected value)', async function (assert) {
    assert.expect(1);

    this.deferred = defer();

    this.handleSearch = async () => {
      await sleep(250);
      return ['a', 'b', 'c'];
    };

    await render(hbs`
      <SelectBox
        @value="b"
        @onSearch={{this.handleSearch}}
        as |sb|
      >
        <sb.Input />
        <sb.Trigger />
        <sb.Options>
          {{#if sb.isBusy}}
            <sb.Option @disabled={{true}}>
              Please wait...
            </sb.Option>
          {{else}}
            {{#each sb.options as |value|}}
              <sb.Option @value={{value}}>
                {{value}}
              </sb.Option>
            {{/each}}
          {{/if}}
        </sb.Options>
      </SelectBox>
    `);

    await fillIn('.select-box__input', '');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute('aria-current', 'true');
  });

  test('default search', async function (assert) {
    assert.expect(5);

    this.options = [
      'TURKEY', // case
      ' turkey ', // whitespace
      'Türkiye', // diacritics
      'Mauritius', // contains,
      'United Kingdom' // does not contain
    ];

    await render(hbs`
      <SelectBox @options={{this.options}} as |sb|>
        <sb.Input />
        <sb.Options>
          {{#each sb.options as |value|}}
            <sb.Option @value={{value}}>
              {{value}}
            </sb.Option>
          {{/each}}
        </sb.Options>
      </SelectBox>
    `);

    assert.dom('.select-box').doesNotHaveAttribute('data-busy');
    assert.dom('.select-box__input').doesNotHaveAttribute('aria-busy');

    assert.dom('.select-box__option').exists({ count: 5 });

    await fillIn('.select-box__input', 'ur');

    assert.dom('.select-box__option').exists({ count: 4 });

    assert.deepEqual(this.getOptions(), [
      'TURKEY',
      'turkey',
      'Türkiye',
      'Mauritius'
    ]);
  });

  test('changing options after a search', async function (assert) {
    assert.expect(3);

    this.options = ['foo', 'bar', 'baz'];

    await render(hbs`
      <SelectBox @options={{this.options}} as |sb|>
        <sb.Input />
        <sb.Options>
          {{#each sb.options as |value|}}
            <sb.Option @value={{value}}>
              {{value}}
            </sb.Option>
          {{/each}}
        </sb.Options>
      </SelectBox>
    `);

    assert.deepEqual(this.getOptions(), ['foo', 'bar', 'baz']);

    await fillIn('.select-box__input', 'b');

    assert.deepEqual(this.getOptions(), ['bar', 'baz']);

    this.set('options', ['foo', 'bar', 'baz', 'qux']);

    assert.deepEqual(
      this.getOptions(),
      ['foo', 'bar', 'baz', 'qux'],
      'previous search results are forgotten'
    );
  });

  test('initial query', async function (assert) {
    assert.expect(1);

    this.handleClickInput = (sb) =>
      assert.strictEqual(
        sb.query,
        null,
        'no input has been collected yet - there has been no search, and so there is no query'
      );

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Input value="foo" {{on "click" (fn this.handleClickInput sb)}} />
      </SelectBox>
    `);

    await click('.select-box__input');
  });

  test('default search @query null', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox @options={{array "foo" "bar" "baz"}} as |sb|>
        <button type="button" {{on "click" (fn sb.search null)}}></button>
        <sb.Options />
      </SelectBox>
    `);

    await click('button');

    assert.ok(true, 'does not blow up due default query being null');
  });

  test('custom search query', async function (assert) {
    assert.expect(1);

    this.handleSearch = (query) =>
      assert.strictEqual(query, '', 'search action always receives a string');

    await render(hbs`
      <SelectBox @onSearch={{this.handleSearch}} as |sb|>
        <button type="button" {{on "click" (fn sb.search null)}}></button>
        <sb.Options />
      </SelectBox>
    `);

    await click('button');
  });

  test('search argument passthrough', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox
        @options={{array "foo" "bar" "baz"}}
        @onSearch={{@onSearch}}
        as |sb|
      >
        <sb.Input />
        <sb.Options>
          {{#each sb.options as |value|}}
            <sb.Option>{{value}}</sb.Option>
          {{/each}}
        </sb.Options>
      </SelectBox>
    `);

    await fillIn('.select-box__input', 'f');

    assert
      .dom('.select-box__option')
      .exists({ count: 1 }, 'default search still works');
  });

  test('return value is thenable', async function (assert) {
    assert.expect(2);

    this.deferred = defer();

    this.handleSearch = (q) => this.deferred.promise;

    this.handleClickInput = (sb) => {
      sb.search('f').then(sb.open);
    };

    await render(hbs`
      <SelectBox @onSearch={{this.handleSearch}} as |sb|>
        <sb.Input {{on "click" (fn this.handleClickInput sb)}} />
        {{#if sb.isOpen}}
          <sb.Options>
            {{#each sb.options}}
              <sb.Option />
            {{/each}}
          </sb.Options>
        {{/if}}
      </SelectBox>
    `);

    await click('.select-box__input');

    assert.dom('.select-box__option').doesNotExist();

    this.deferred.resolve(['foo']);

    await settled();

    assert.dom('.select-box__option').exists();
  });

  test('running a manual search does not set the input value', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <SelectBox @options={{array "foo" "bar" "baz"}} as |sb|>
        <sb.Input />
        <sb.Trigger {{on "click" (fn sb.search "bar")}} />
        <sb.Options>
          {{#each sb.options as |value|}}
            <sb.Option @value={{value}} />
          {{/each}}
        </sb.Options>
      </SelectBox>
    `);

    await click('.select-box__trigger');

    assert.dom('.select-box__input').hasValue('');
    assert.dom('.select-box__options').exists({ count: 1 });
  });
});
