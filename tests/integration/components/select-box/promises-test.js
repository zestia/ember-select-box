import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, find, findAll, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';

module('select-box (promises)', function(hooks) {
  setupRenderingTest(hooks);

  test('promise value (states)', async function(assert) {
    assert.expect(4);

    const deferred1 = defer();
    const deferred2 = defer();

    this.set('promise', deferred1.promise);

    await render(hbs`
      {{#select-box value=this.promise as |sb|}}
        isPending: {{sb.isPending}}<br>
        isRejected: {{sb.isRejected}}<br>
        isFulfilled: {{sb.isFulfilled}}<br>
        isSettled: {{sb.isSettled}}<br>
      {{/select-box}}
    `);

    assert.equal(this.element.textContent, `
        isPending: true
        isRejected: false
        isFulfilled: false
        isSettled: false
    `);

    deferred1.resolve();
    await settled();

    assert.equal(this.element.textContent, `
        isPending: false
        isRejected: false
        isFulfilled: true
        isSettled: true
    `);

    this.set('promise', deferred2.promise);

    assert.equal(this.element.textContent, `
        isPending: true
        isRejected: false
        isFulfilled: false
        isSettled: false
    `);

    deferred2.reject();
    await settled();

    assert.equal(this.element.textContent, `
        isPending: false
        isRejected: true
        isFulfilled: false
        isSettled: true
    `);
  });

  test('promise value (aria busy)', async function(assert) {
    assert.expect(2);

    const deferred = defer();

    this.set('promise', deferred.promise);

    await render(hbs`{{select-box value=this.promise}}`);

    assert.ok(find('.select-box').hasAttribute('aria-busy'),
      'select box has busy attribute when resolving promise');

    deferred.resolve();

    await settled();

    assert.ok(!find('.select-box').hasAttribute('aria-busy'),
      'select box no longer has busy attribute when promise has resolved');
  });

  test('promise value (single)', async function(assert) {
    assert.expect(6);

    const deferred1 = defer();
    const deferred2 = defer();

    this.set('promise1', deferred1.promise);
    this.set('promise2', deferred2.promise);

    await render(hbs`
      {{#select-box value=this.promise2 as |sb|}}
        {{sb.option value=this.promise1}}
        {{sb.option value="bar"}}
        {{sb.option value=this.promise2}}
      {{/select-box}}
    `);

    assert.ok(!findAll('.select-box-option')[0].classList.contains('is-selected'),
      'other promise, not selected');

    assert.ok(!findAll('.select-box-option')[1].classList.contains('is-selected'),
      'value is not selected, promise has not yet resolved');

    assert.ok(findAll('.select-box-option')[2].classList.contains('is-selected'),
      'value is selected, promises match');

    deferred1.resolve('foo');
    deferred2.resolve('bar');

    await settled();

    assert.ok(!findAll('.select-box-option')[0].classList.contains('is-selected'),
      'wrong promise, not selected');

    assert.ok(findAll('.select-box-option')[1].classList.contains('is-selected'),
      'value is selected now that promise has resolved');

    assert.ok(findAll('.select-box-option')[2].classList.contains('is-selected'),
      'resolved value is selected');
  });

  test('promise value (multiple)', async function(assert) {
    assert.expect(1);

    const deferred1 = defer();
    const deferred2 = defer();

    this.set('promises', [
      deferred1.promise,
      deferred2.promise
    ]);

    this.set('values', ['foo', 'bar', 'baz']);

    await render(hbs`
      {{#select-box value=this.promises multiple=true as |sb|}}
        {{#each this.values as |value|}}
          {{#sb.option value=value as |o|}}
            {{o.value}}
          {{/sb.option}}
        {{/each}}
      {{/select-box}}
    `);

    deferred1.resolve('foo');
    deferred2.resolve('bar');

    await settled();

    const labels = findAll('.select-box-option.is-selected').map(o => o.textContent.trim());

    assert.deepEqual(labels, ['foo', 'bar'],
      'resolves the promises');
  });

  test('promise value (failure)', async function(assert) {
    assert.expect(1);

    const deferred = defer();

    this.set('promise', deferred.promise);

    await render(hbs`
      {{#select-box value=this.promise as |sb|}}
        {{sb.option value="foo"}}
        {{sb.option value="bar"}}
        {{sb.option value="baz"}}
      {{/select-box}}
    `);

    deferred.reject();

    await settled();

    assert.equal(findAll('.select-box-option.is-selected').length, 0,
      'does nothing with the value');
  });

  test('promise option value', async function(assert) {
    assert.expect(2);

    const deferred1 = defer();
    const deferred2 = defer();
    const deferred3 = defer();
    const deferred4 = defer();

    this.set('promise1', deferred1.promise);
    this.set('promise2', deferred2.promise);
    this.set('promise3', deferred3.promise);
    this.set('promise4', deferred4.promise);

    await render(hbs`
      {{#select-box value=this.promise1 as |sb|}}
        {{#sb.option value=this.promise2 as |o|}}{{o.value}}{{/sb.option}}
        {{#sb.option value=this.promise3 as |o|}}{{o.value}}{{/sb.option}}
        {{#sb.option value=this.promise4 as |o|}}{{o.value}}{{/sb.option}}
      {{/select-box}}
    `);


    deferred1.resolve('bar');
    deferred2.resolve('foo');
    deferred3.resolve('bar');
    deferred4.resolve('baz');

    await settled();

    assert.equal(find('.select-box-option.is-selected').textContent, 'bar',
      'waits for promise to resolve before computing selected option');

    this.set('promise1', deferred4.promise);

    await settled();

    assert.equal(find('.select-box-option.is-selected').textContent, 'baz',
      're-computation works');
  });

  test('promise value order', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#select-box value=this.promise as |sb|}}
        {{#sb.option value="foo"}}Foo{{/sb.option}}
        {{#sb.option value="bar"}}Bar{{/sb.option}}
        {{#sb.option value="baz"}}Baz{{/sb.option}}
      {{/select-box}}
    `);

    const deferred1 = defer();
    const deferred2 = defer();

    this.set('promise', deferred1.promise);
    this.set('promise', deferred2.promise);

    deferred2.resolve('bar');
    deferred1.resolve('baz');

    await settled();

    assert.equal(find('.select-box-option.is-selected').textContent, 'Bar',
      'earlier promises are ignored');
  });

  test('promise option value order', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#select-box value="bar" as |sb|}}
        {{#sb.option value=this.promise as |o|}}
          {{~o.value~}}
        {{/sb.option}}
      {{/select-box}}
    `);

    const deferred1 = defer();
    const deferred2 = defer();

    this.set('promise', deferred1.promise);
    this.set('promise', deferred2.promise);

    deferred2.resolve('bar');
    deferred1.resolve('baz');

    await settled();

    assert.equal(find('.select-box-option.is-selected').textContent, 'bar',
      'earlier promises are ignored');
  });

  test('promise option value (failure)', async function(assert) {
    assert.expect(1);

    const deferred = defer();

    this.set('promise', deferred.promise);

    await render(hbs`
      {{#select-box as |sb|}}
        {{#sb.option value=this.promise as |o|}}
          {{~o.value~}}
        {{/sb.option}}
      {{/select-box}}
    `);

    deferred.reject('Soz');

    await settled();

    assert.equal(find('.select-box-option').textContent, 'Soz',
      'the value is the rejection reason');
  });

  test('weird failure', async function(assert) {
    assert.expect(2);

    const deferred = defer();

    this.set('show', () => {
      deferred.promise.then(() => this.set('showSelect', true));
    });

    await render(hbs`
      {{#if showSelect}}
        {{#select-box on-select=(action (mut selectedValue)) as |sb|}}
          {{#sb.option value="foo"}}Foo{{/sb.option}}
          {{#sb.option value="bar"}}Bar{{/sb.option}}
          {{#sb.option value="baz"}}Baz{{/sb.option}}
        {{/select-box}}
      {{/if}}
      <button onclick={{action show}}></button>
    `);

    await click('button');

    deferred.resolve();

    await settled();

    await click(findAll('.select-box-option')[2]);

    assert.equal(this.selectedValue, 'baz');
    assert.equal(find('.select-box-option.is-selected').textContent, 'Baz');
  });
});
