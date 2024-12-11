import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, rerender, settled, fillIn, click } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { array, fn } from '@ember/helper';
import { on } from '@ember/modifier';
import SelectBox from '@zestia/ember-select-box/components/select-box';
import getOptions from 'dummy/tests/helpers/get-options';

module('select-box (searching)', function (hooks) {
  setupRenderingTest(hooks);

  test('busy state whilst searching', async function (assert) {
    assert.expect(9);

    const deferred = Promise.withResolvers();

    const handleSearch = () => deferred.promise;

    await render(<template>
      <SelectBox @onSearch={{handleSearch}} as |sb|>
        <sb.Dropdown>
          <sb.Trigger />
          <sb.Input />
        </sb.Dropdown>
      </SelectBox>
    </template>);

    assert.dom('.select-box').hasAttribute('data-busy', 'false');
    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute('aria-busy', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-busy', 'false');

    await fillIn('.select-box__input', 'x');

    assert.dom('.select-box').hasAttribute('data-busy', 'true');
    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute('aria-busy', 'true');
    assert.dom('.select-box__input').hasAttribute('aria-busy', 'true');

    deferred.resolve();

    await settled();

    assert.dom('.select-box').hasAttribute('data-busy', 'false');
    assert
      .dom('.select-box .dropdown__trigger')
      .hasAttribute('aria-busy', 'false');
    assert.dom('.select-box__input').hasAttribute('aria-busy', 'false');
  });

  test('search task', async function (assert) {
    assert.expect(10);

    const searches = {
      first: Promise.withResolvers(),
      second: Promise.withResolvers(),
      third: Promise.withResolvers(),
      fourth: Promise.withResolvers()
    };

    const handleSearch = (query) => {
      return searches[query].promise.then(() => assert.step(query));
    };

    await render(<template>
      <SelectBox @onSearch={{handleSearch}} as |sb|>
        <sb.Input />
        <span>{{sb.query}}</span>
      </SelectBox>
    </template>);

    await fillIn('.select-box__input', 'first');

    assert.dom('span').hasText('', 'first search, but no results yet');

    await fillIn('.select-box__input', 'second');

    assert.dom('span').hasText('', 'second was dropped');

    await fillIn('.select-box__input', 'third');

    assert.dom('span').hasText('', 'third was dropped');

    await fillIn('.select-box__input', 'fourth');

    assert.dom('span').hasText('', 'fourth search, no results yet');

    searches.fourth.resolve();
    searches.third.resolve();
    searches.second.resolve();
    searches.first.resolve();

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

    const deferred = Promise.withResolvers();

    const handleSearch = async (query, sb) => {
      await deferred.promise;
    };

    await render(<template>
      <SelectBox @onSearch={{handleSearch}} as |sb|>
        <sb.Input />
        {{#unless sb.isBusy}}
          <sb.Options>
            <sb.Option @value="A">a</sb.Option>
            <sb.Option @value="B">b</sb.Option>
          </sb.Options>
        {{/unless}}
      </SelectBox>
    </template>);

    await fillIn('.select-box__input', 'b');

    assert.dom('.select-box__option').doesNotExist('precondition');

    deferred.resolve();

    await settled();

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute(
        'aria-current',
        'false',
        'the first option is not active _when opened_ after a search'
      );
  });

  test('active option after clearing search', async function (assert) {
    assert.expect(6);

    await render(<template>
      <SelectBox @value="c" @options={{array "a" "b" "c"}} as |sb|>
        <sb.Options>
          {{#each sb.options as |value|}}
            <sb.Option @value={{value}}>
              {{value}}
            </sb.Option>
          {{/each}}
        </sb.Options>
        <sb.Input />
      </SelectBox>
    </template>);

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasText('c')
      .hasAttribute('aria-current', 'true');

    await fillIn('.select-box__input', 'b');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasText('b')
      .hasAttribute('aria-current', 'false');

    await fillIn('.select-box__input', '');

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasText('a')
      .hasAttribute('aria-current', 'false');
  });

  test('default search', async function (assert) {
    assert.expect(5);

    const options = [
      'TURKEY', // case
      ' turkey ', // whitespace
      'Türkiye', // diacritics
      'Mauritius', // contains,
      'United Kingdom' // does not contain
    ];

    await render(<template>
      <SelectBox @options={{options}} as |sb|>
        <sb.Input />
        <sb.Options>
          {{#each sb.options as |value|}}
            <sb.Option @value={{value}}>
              {{value}}
            </sb.Option>
          {{/each}}
        </sb.Options>
      </SelectBox>
    </template>);

    assert.dom('.select-box').doesNotHaveAttribute('data-busy');
    assert.dom('.select-box__input').doesNotHaveAttribute('aria-busy');
    assert.dom('.select-box__option').exists({ count: 5 });

    await fillIn('.select-box__input', 'ur');

    assert.dom('.select-box__option').exists({ count: 4 });

    assert.deepEqual(getOptions(), [
      'TURKEY',
      'turkey',
      'Türkiye',
      'Mauritius'
    ]);
  });

  test('changing options after a search', async function (assert) {
    assert.expect(3);

    const state = new (class {
      @tracked options = ['foo', 'bar', 'baz'];
    })();

    await render(<template>
      <SelectBox @options={{state.options}} as |sb|>
        <sb.Input />
        <sb.Options>
          {{#each sb.options as |value|}}
            <sb.Option @value={{value}}>
              {{value}}
            </sb.Option>
          {{/each}}
        </sb.Options>
      </SelectBox>
    </template>);

    assert.deepEqual(getOptions(), ['foo', 'bar', 'baz']);

    await fillIn('.select-box__input', 'b');

    assert.deepEqual(getOptions(), ['bar', 'baz']);

    state.options = ['foo', 'bar', 'baz', 'qux'];

    await rerender();

    assert.deepEqual(
      getOptions(),
      ['foo', 'bar', 'baz', 'qux'],
      'previous search results are forgotten'
    );
  });

  test('initial query', async function (assert) {
    assert.expect(1);

    const handleClickInput = (sb) =>
      assert.strictEqual(
        sb.query,
        null,
        'no input has been collected yet - there has been no search, and so there is no query'
      );

    await render(<template>
      <SelectBox as |sb|>
        <sb.Input value="foo" {{on "click" (fn handleClickInput sb)}} />
      </SelectBox>
    </template>);

    await click('.select-box__input');
  });

  test('default search @query null', async function (assert) {
    assert.expect(1);

    await render(<template>
      <SelectBox @options={{array "foo" "bar" "baz"}} as |sb|>
        <button type="button" {{on "click" (fn sb.search null)}}></button>
        <sb.Options />
      </SelectBox>
    </template>);

    await click('button');

    assert.ok(true, 'does not blow up due default query being null');
  });

  test('custom search query', async function (assert) {
    assert.expect(1);

    const handleSearch = (query) =>
      assert.strictEqual(query, '', 'search action always receives a string');

    await render(<template>
      <SelectBox @onSearch={{handleSearch}} as |sb|>
        <button type="button" {{on "click" (fn sb.search null)}}></button>
        <sb.Options />
      </SelectBox>
    </template>);

    await click('button');
  });

  test('search argument passthrough', async function (assert) {
    assert.expect(1);

    await render(<template>
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
    </template>);

    await fillIn('.select-box__input', 'f');

    assert
      .dom('.select-box__option')
      .exists({ count: 1 }, 'default search still works');
  });

  test('return value is thenable', async function (assert) {
    assert.expect(2);

    const deferred = Promise.withResolvers();

    const handleSearch = (q) => deferred.promise;

    const handleClickInput = (sb) => sb.search('f').then(sb.dropdown.open);

    await render(<template>
      <SelectBox @onSearch={{handleSearch}} as |sb|>
        <sb.Dropdown as |dd|>
          <sb.Input {{on "click" (fn handleClickInput sb)}} />
          {{#if dd.isOpen}}
            <sb.Content>
              <sb.Options>
                {{#each sb.options}}
                  <sb.Option />
                {{/each}}
              </sb.Options>
            </sb.Content>
          {{/if}}
        </sb.Dropdown>
      </SelectBox>
    </template>);

    await click('.select-box__input');

    assert.dom('.select-box__option').doesNotExist();

    deferred.resolve(['foo']);

    await settled();

    assert.dom('.select-box__option').exists();
  });

  test('running a manual search does not set the input value', async function (assert) {
    assert.expect(2);

    await render(<template>
      <SelectBox @options={{array "foo" "bar" "baz"}} as |sb|>
        <sb.Input />
        <sb.Trigger {{on "click" (fn sb.search "bar")}} />
        <sb.Dropdown>
          <sb.Content>
            <sb.Options>
              {{#each sb.options as |value|}}
                <sb.Option @value={{value}} />
              {{/each}}
            </sb.Options>
          </sb.Content>
        </sb.Dropdown>
      </SelectBox>
    </template>);

    await click('.select-box .dropdown__trigger');

    assert.dom('.select-box__input').hasValue('');
    assert.dom('.select-box__options').exists({ count: 1 });
  });
});
