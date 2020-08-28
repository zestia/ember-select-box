import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, findAll, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';

module('select-box (promises)', function (hooks) {
  setupRenderingTest(hooks);

  test('promise value (states)', async function (assert) {
    assert.expect(4);

    const deferred1 = defer();
    const deferred2 = defer();

    this.promise = deferred1.promise;

    await render(hbs`
      <SelectBox @value={{this.promise}} as |sb|>
        isPending: {{sb.isPending}}<br>
        isRejected: {{sb.isRejected}}<br>
        isFulfilled: {{sb.isFulfilled}}<br>
        isSettled: {{sb.isSettled}}<br>
      </SelectBox>
    `);

    assert.dom('.select-box').hasText(`
        isPending: true
        isRejected: false
        isFulfilled: false
        isSettled: false
    `);

    deferred1.resolve('foo');

    await settled();

    assert.dom('.select-box').hasText(`
        isPending: false
        isRejected: false
        isFulfilled: true
        isSettled: true
    `);

    this.set('promise', deferred2.promise);

    assert.dom('.select-box').hasText(`
        isPending: true
        isRejected: false
        isFulfilled: false
        isSettled: false
    `);

    deferred2.reject('bar');

    await settled();

    assert.dom('.select-box').hasText(`
        isPending: false
        isRejected: true
        isFulfilled: false
        isSettled: true
    `);
  });

  test('promise value (aria busy)', async function (assert) {
    assert.expect(2);

    const deferred = defer();

    this.promise = deferred.promise;

    await render(hbs`<SelectBox @value={{this.promise}} />`);

    assert
      .dom('.select-box')
      .hasAttribute(
        'aria-busy',
        'true',
        'select box has busy attribute when resolving promise'
      );

    deferred.resolve();

    await settled();

    assert
      .dom('.select-box')
      .hasAttribute(
        'aria-busy',
        'false',
        'select box no longer has busy attribute when promise has resolved'
      );
  });

  test('promise value (single)', async function (assert) {
    assert.expect(6);

    const deferred1 = defer();
    const deferred2 = defer();

    this.promise1 = deferred1.promise;
    this.promise2 = deferred2.promise;

    await render(hbs`
      <SelectBox @value={{this.promise2}} as |sb|>
        <sb.Option @value={{this.promise1}} />
        <sb.Option @value="bar" />
        <sb.Option @value={{this.promise2}} />
      </SelectBox>
    `);

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-selected', 'false', 'other promise, not selected');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute(
        'aria-selected',
        'false',
        'value is not selected, promise has not yet resolved'
      );

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute(
        'aria-selected',
        'true',
        'value is selected, promises match'
      );

    deferred1.resolve('foo');
    deferred2.resolve('bar');

    await settled();

    assert
      .dom('.select-box__option:nth-child(1)')
      .hasAttribute('aria-selected', 'false', 'wrong promise, not selected');

    assert
      .dom('.select-box__option:nth-child(2)')
      .hasAttribute(
        'aria-selected',
        'true',
        'value is selected now that promise has resolved'
      );

    assert
      .dom('.select-box__option:nth-child(3)')
      .hasAttribute('aria-selected', 'true', 'resolved value is selected');
  });

  test('promise value (multiple)', async function (assert) {
    assert.expect(1);

    const deferred1 = defer();
    const deferred2 = defer();

    this.promises = [deferred1.promise, deferred2.promise];

    this.values = ['foo', 'bar', 'baz'];

    await render(hbs`
      <SelectBox @value={{this.promises}} @multiple={{true}} as |sb|>
        {{#each this.values as |value|}}
          <sb.Option @value={{value}} as |o|>
            {{o.value}}
          </sb.Option>
        {{/each}}
      </SelectBox>
    `);

    deferred1.resolve('foo');
    deferred2.resolve('bar');

    await settled();

    const labels = findAll(
      '.select-box__option[aria-selected="true"]'
    ).map((o) => o.textContent.trim());

    assert.deepEqual(labels, [], 'does not resolve the promises');
  });

  test('promise value (failure)', async function (assert) {
    assert.expect(1);

    const deferred = defer();

    this.promise = deferred.promise;

    await render(hbs`
      <SelectBox @value={{this.promise}} as |sb|>
        <sb.Option @value="foo" />
        <sb.Option @value="bar" />
        <sb.Option @value="baz" />
      </SelectBox>
    `);

    deferred.reject();

    await settled();

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .doesNotExist('does nothing with the value');
  });

  test('promise option value', async function (assert) {
    assert.expect(2);

    const deferred1 = defer();
    const deferred2 = defer();
    const deferred3 = defer();
    const deferred4 = defer();

    this.promise1 = deferred1.promise;
    this.promise2 = deferred2.promise;
    this.promise3 = deferred3.promise;
    this.promise4 = deferred4.promise;

    await render(hbs`
      <SelectBox @value={{this.promise1}} as |sb|>
        <sb.Option @value={{this.promise2}} as |o|>{{o.value}}</sb.Option>
        <sb.Option @value={{this.promise3}} as |o|>{{o.value}}</sb.Option>
        <sb.Option @value={{this.promise4}} as |o|>{{o.value}}</sb.Option>
      </SelectBox>
    `);

    deferred1.resolve('bar');
    deferred2.resolve('foo');
    deferred3.resolve('bar');
    deferred4.resolve('baz');

    await settled();

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .hasText(
        'bar',
        'waits for promise to resolve before computing selected option'
      );

    this.set('promise1', deferred4.promise);

    await settled();

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .hasText('baz', 're-computation works');
  });

  test('promise value order', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox @value={{this.promise}} as |sb|>
        <sb.Option @value="foo">Foo</sb.Option>
        <sb.Option @value="bar">Bar</sb.Option>
        <sb.Option @value="baz">Baz</sb.Option>
      </SelectBox>
    `);

    const deferred1 = defer();
    const deferred2 = defer();

    this.set('promise', deferred1.promise);
    this.set('promise', deferred2.promise);

    deferred2.resolve('bar');
    deferred1.resolve('baz');

    await settled();

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .hasText('Bar', 'earlier promises are ignored');
  });

  test('promise option value order', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <SelectBox @value="bar" as |sb|>
        <sb.Option @value={{this.promise}} as |o|>
          {{o.value}}
        </sb.Option>
      </SelectBox>
    `);

    const deferred1 = defer();
    const deferred2 = defer();

    this.set('promise', deferred1.promise);
    this.set('promise', deferred2.promise);

    deferred2.resolve('bar');
    deferred1.resolve('baz');

    await settled();

    assert
      .dom('.select-box__option[aria-selected="true"]')
      .hasText('bar', 'earlier promises are ignored');
  });

  test('promise option value (failure)', async function (assert) {
    assert.expect(1);

    const deferred = defer();

    this.promise = deferred.promise;

    await render(hbs`
      <SelectBox as |sb|>
        <sb.Option @value={{this.promise}} as |o|>
          {{o.value}}
        </sb.Option>
      </SelectBox>
    `);

    deferred.reject('Soz');

    await settled();

    assert
      .dom('.select-box__option')
      .hasText('Soz', 'the value is the rejection reason');
  });

  test('weird failure', async function (assert) {
    assert.expect(2);

    const deferred = defer();

    this.show = () => deferred.promise.then(() => this.set('showSelect', true));

    this.handleSelect = (value) => this.set('myValue', value);

    await render(hbs`
      {{#if this.showSelect}}
        <SelectBox @onSelect={{this.handleSelect}} as |sb|>
          <sb.Option @value="foo">Foo</sb.Option>
          <sb.Option @value="bar">Bar</sb.Option>
          <sb.Option @value="baz">Baz</sb.Option>
        </SelectBox>
      {{/if}}
      <button type="button" {{on "click" this.show}}></button>
    `);

    await click('button');

    deferred.resolve();

    await settled();

    await click(findAll('.select-box__option')[2]);

    assert.equal(this.myValue, 'baz');

    assert.dom('.select-box__option[aria-selected="true"]').hasText('Baz');
  });
});
